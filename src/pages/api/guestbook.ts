import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { addGuestbookEntry, getGuestbookEntries, deleteGuestbookEntry, GuestbookEntry } from "@/lib/guestbook";

type ResponseData = {
  entries?: GuestbookEntry[];
  entry?: GuestbookEntry;
  error?: string;
  success?: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    const entries = await getGuestbookEntries();
    return res.status(200).json({ entries });
  }

  // Get session using getServerSession
  const session = await getServerSession(req, res, authOptions);

  if (req.method === "POST") {
    if (!session?.user) {
      return res.status(401).json({ error: "You must be signed in to post a message" });
    }

    const { message } = req.body;

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return res.status(400).json({ error: "Message is required" });
    }

    if (message.length > 500) {
      return res.status(400).json({ error: "Message must be 500 characters or less" });
    }

    const entry = await addGuestbookEntry({
      message: message.trim(),
      userName: session.user.name || "Anonymous",
      userImage: session.user.image || "",
      userId: (session.user as { id?: string }).id || session.user.email || "",
    });

    if (!entry) {
      return res.status(500).json({ error: "Failed to save message" });
    }

    return res.status(201).json({ entry });
  }

  if (req.method === "DELETE") {
    if (!session?.user) {
      return res.status(401).json({ error: "You must be signed in to delete a message" });
    }

    const { entryId } = req.body;

    if (!entryId) {
      return res.status(400).json({ error: "Entry ID is required" });
    }

    const success = await deleteGuestbookEntry(
      entryId,
      (session.user as { id?: string }).id || session.user.email || ""
    );

    if (!success) {
      return res.status(403).json({ error: "Could not delete entry" });
    }

    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
}

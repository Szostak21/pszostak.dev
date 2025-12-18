import { openai } from "@ai-sdk/openai";
import { streamText, convertToModelMessages, type CoreMessage } from "ai";
import { portfolioContext } from "@/data/portfolio-context";

export const config = {
  runtime: "edge",
};

interface MessagePart {
  type: string;
  text: string;
}

interface UIMessage {
  role: string;
  parts?: MessagePart[];
}

export default async function handler(req: Request) {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const { messages } = await req.json();

    let modelMessages: CoreMessage[] = [];
    if (messages && messages.length) {
      try {
        modelMessages = convertToModelMessages(messages);
      } catch {
        modelMessages = (messages as UIMessage[]).map((m) => ({
          role: m.role as "user" | "assistant",
          content:
            m.parts?.filter((p) => p.type === "text").map((p) => p.text).join("") || "",
        }));
      }
    }

    const result = streamText({
      model: openai("gpt-4o-mini"),
      system: portfolioContext.systemPrompt,
      messages: modelMessages,
      temperature: 0.7,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response("Internal server error", { status: 500 });
  }
}

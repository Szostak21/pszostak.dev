import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { ElementType } from "react";

export interface Social {
  name: string;
  url: string;
  icon: ElementType;
}

export const socials: Social[] = [
  {
    name: "GitHub",
    url: "https://github.com/Szostak21",
    icon: Github,
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/yourprofile",
    icon: Linkedin,
  },
  {
    name: "Twitter",
    url: "https://twitter.com/yourhandle",
    icon: Twitter,
  },
  {
    name: "Email",
    url: "mailto:pawelszostak21@gmail.com",
    icon: Mail,
  },
];

export const siteConfig = {
  name: "Paweł Szostak",
  title: "Full Stack Developer",
  description: "I help founders turn their ideas into reality",
  email: "pawelszostak21@gmail.com",
  location: "Poland",
  available: true,
  calLink: "https://cal.com/yourname", // Replace with your Cal.com link
};

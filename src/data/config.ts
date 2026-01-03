import { Github, Linkedin, Mail } from "lucide-react";
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
    name: "Email",
    url: "mailto:pszostak.contact@gmail.com",
    icon: Mail,
  },
];

export const siteConfig = {
  name: "Paweł Szostak",
  title: "Full Stack Developer",
  description: "I help founders turn their ideas into reality",
  email: "pszostak.contact@gmail.com",
  location: "Poland",
  available: true,
  calLink: "https://cal.com/yourname",
};

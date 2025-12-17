import { Github, Linkedin, Twitter, Heart } from "lucide-react";
import { siteConfig, socials } from "@/data/config";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-10 sm:py-12 px-4 sm:px-0 border-t border-white/5 bg-black/20 backdrop-blur-sm">
      <div className="section">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-3 text-base text-muted">
            <span className="font-bold text-foreground text-lg">
              <span className="gradient-text">PS</span>
            </span>
            <span>•</span>
            <span>© {currentYear} {siteConfig.name}</span>
          </div>

          <div className="flex items-center gap-2 text-base text-muted font-medium">
            Built with
            <Heart size={16} className="text-red-500 fill-red-500" />
            using Next.js & Tailwind
          </div>

          <div className="flex items-center gap-5">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-accent transition-colors hover:scale-110 transform duration-200"
                aria-label={social.name}
              >
                <social.icon size={22} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

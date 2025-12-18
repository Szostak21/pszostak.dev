"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { FormEvent, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isLoading?: boolean;
  suggestedQuestions?: string[];
  onSuggestedClick?: (question: string) => void;
  showSuggestions?: boolean;
  className?: string;
}

export function ChatInput({
  input,
  setInput,
  onSubmit,
  isLoading,
  suggestedQuestions = [],
  onSuggestedClick,
  showSuggestions = true,
  className,
}: ChatInputProps) {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSuggestedClick = (question: string) => {
    let autofill = question;
    const q = question.trim().toLowerCase();
    if (q === "skills") {
      autofill = "What programming skills do you have?";
    } else if (q === "projects") {
      autofill = "Can you show me your projects?";
    } else if (q === "about me") {
      autofill = "Tell me about yourself.";
    }
    setInput(autofill);
    onSuggestedClick?.(autofill);
    inputRef.current?.focus();
  };

  return (
    <div className={cn("flex flex-col", className)}>
      {showSuggestions && suggestedQuestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-2 justify-center"
          style={{ marginBottom: "1rem", marginTop: "0rem" }}
        >
          {suggestedQuestions.map((question, index) => (
            <motion.button
              key={question}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleSuggestedClick(question)}
              disabled={isLoading}
              className={cn(
                "text-sm rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              )}
              style={{
                padding: "8px 16px",
                background: 'var(--card)',
                border: '1px solid var(--card-border)',
                color: 'var(--muted)',
                cursor: isLoading ? 'not-allowed' : 'pointer'
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--card)'}
            >
              {question}
            </motion.button>
          ))}
        </motion.div>
      )}

      <form onSubmit={onSubmit} className="relative group mt-4 mb-4">
        <div
          className={cn(
            "flex gap-3 items-center justify-center rounded-4xl transition-all duration-300 ease-out",
            "focus-within:shadow-[0_0_30px_-10px_rgba(139,92,246,0.3)]"
          )}
          style={{
            padding: "0.25em 0.75em",
            minHeight: "2.2em",
            background: 'var(--card)',
            border: '1px solid var(--card-border)'
          }}
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (input.trim()) inputRef.current?.form?.requestSubmit();
              }
            }}
            onInput={(e) => {
              const t = e.currentTarget as HTMLTextAreaElement;
              t.style.height = "auto";
              t.style.height = `${Math.min(t.scrollHeight, 320)}px`;
            }}
            rows={1}
            placeholder="Ask me anything about Paweł..."
            disabled={isLoading}
            aria-label="Chat input"
            className={cn(
              "flex-1 bg-transparent text-lg leading-relaxed min-h-0 max-h-80 resize-none outline-none disabled:opacity-50"
            )}
            style={{
              paddingTop: 0,
              paddingBottom: 0,
              lineHeight: 1.8,
              height: "1.8em",
              minHeight: "1.8em",
              maxHeight: "3.2em",
              display: "flex",
              alignItems: "center",
              color: 'var(--foreground)',
              background: 'transparent'}}
          />
          
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={cn(
              "rounded-xl shrink-0 transition-all duration-300 ease-out disabled:opacity-0 disabled:scale-75 disabled:pointer-events-none"
            )}
            style={{
              padding: "12px",
              background: 'var(--accent)',
              color: 'white',
              boxShadow: '0 4px 16px 0 var(--accent-hover, #a78bfa)',
              opacity: !input.trim() || isLoading ? 0 : 1
            }}
            aria-label="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}

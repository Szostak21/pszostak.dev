"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { FormEvent, useRef, useEffect, useState } from "react";
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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    window.requestAnimationFrame(() => setIsMounted(true));
    const timer = setTimeout(() => inputRef.current?.focus(), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSuggestedClick = (question: string) => {
    let autofill = question;
    const q = question.trim().toLowerCase();
    if (q === "skills") autofill = "What programming skills do you have?";
    else if (q === "projects") autofill = "Tell me more about your projects.";
    else if (q === "about me") autofill = "Tell me about yourself.";
    else if (q === "contact") autofill = "How can I contact you?";
    
    setInput(autofill);
    onSuggestedClick?.(autofill);
    inputRef.current?.focus();
  };

  if (!isMounted) return null;

  return (
    <div className={cn("flex flex-col", className)}>
      {/* Sugestie pytań */}
      {showSuggestions && suggestedQuestions.length > 0 && (
        <div className="flex flex-wrap gap-1.5 justify-center mb-3">
          {suggestedQuestions.map((question) => (
            <button
              key={question}
              onClick={() => handleSuggestedClick(question)}
              disabled={isLoading}
              className={cn(
                "text-xs rounded-full border px-3 py-1 transition-all disabled:opacity-50",
                "hover:brightness-125 active:scale-95"
              )}
              style={{
                backgroundColor: 'var(--card)',
                borderColor: 'var(--card-border)',
                color: 'var(--muted)',
              }}
            >
              {question}
            </button>
          ))}
        </div>
      )}

      {/* Główny Input */}
      <form onSubmit={onSubmit} className="relative">
        <div
          className={cn(
            "flex items-center gap-2 rounded-full border transition-all px-4 py-1.5"
            // USUNIĘTO: focus-within:ring oraz focus-within:border-violet-500
          )}
          style={{
            backgroundColor: 'var(--card)',
            borderColor: 'var(--card-border)',
          }}
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (input.trim()) {
                  const form = e.currentTarget.form;
                  if (form) form.requestSubmit();
                }
              }
            }}
            onInput={(e) => {
              const t = e.currentTarget;
              t.style.height = "auto";
              t.style.height = `${Math.min(t.scrollHeight, 120)}px`;
            }}
            rows={1}
            placeholder="Ask anything about Paweł..."
            disabled={isLoading}
            className={cn(
              "flex-1 bg-transparent text-sm outline-none resize-none overflow-hidden py-2 leading-tight"
            )}
            style={{
              color: 'var(--foreground)',
              appearance: 'none',
            }}
          />
          
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={cn(
              "flex items-center justify-center w-8 h-8 rounded-full transition-all shrink-0",
              "bg-violet-600 text-white hover:bg-violet-500 disabled:opacity-0 disabled:scale-90"
            )}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
"use client";

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
    const timer = setTimeout(() => {
      if (window.matchMedia('(hover: hover)').matches) {
        inputRef.current?.focus();
      }
    }, 100);
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

  return (
    <div className={cn("flex flex-col", className)}>
      {showSuggestions && suggestedQuestions.length > 0 && (
        <div className="flex flex-wrap gap-1.5 justify-center mb-3">
          {suggestedQuestions.map((question) => (
            <button
              key={question}
              onClick={() => handleSuggestedClick(question)}
              disabled={isLoading}
              className={cn(
                "text-xs rounded-full border px-3 py-1 transition-transform disabled:opacity-50",
                "hover:border-[var(--accent)] hover:text-[var(--foreground)] active:scale-95"
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

      <form onSubmit={onSubmit} className="relative">
        <div
          className="flex items-center gap-2 rounded-full border px-4 py-1.5"
          style={{
            backgroundColor: 'var(--card)',
            borderColor: 'var(--card-border)',
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)'
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
            className="flex-1 bg-transparent text-sm outline-none resize-none overflow-hidden py-2 leading-tight placeholder:opacity-50"
            style={{
              color: 'var(--foreground)',
              caretColor: 'var(--accent)'
            }}
          />
          
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={cn(
              "flex items-center justify-center w-8 h-8 rounded-full shrink-0 text-white transition-transform",
              "disabled:opacity-0 disabled:scale-90 hover:opacity-90 hover:scale-105"
            )}
            style={{
               backgroundColor: 'var(--accent)'
            }}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
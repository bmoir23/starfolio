"use client";

import { useState } from "react";
import { Bot, MessageCircle, Send, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Chatbot shell — UI placeholder only.
 *
 * The conversational logic is intentionally NOT implemented here. It will be
 * built separately in n8n and connected later (e.g. POST to an n8n webhook /
 * Cloudflare Worker route). For now the input + send button are disabled and
 * the panel shows a "coming soon" state.
 *
 * To wire it up later: replace `handleSend` with a fetch to your n8n webhook,
 * lift `messages` into real state, and remove the `disabled` flags below.
 */
export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);

  // Placeholder — no-op until the n8n backend is connected.
  const handleSend = () => {
    /* TODO: connect to n8n webhook / Worker route */
  };

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3">
      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Chat assistant (coming soon)"
          className="pointer-events-auto w-[min(22rem,calc(100vw-2rem))] origin-bottom-right overflow-hidden rounded-2xl border border-border bg-card/95 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.35)] backdrop-blur-xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-2 border-b border-border bg-muted/40 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground">
                <Bot className="size-4" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-semibold text-foreground">
                  AI Assistant
                </span>
                <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Sparkles className="size-3" />
                  Coming soon
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="grid size-7 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Body — preview bubbles */}
          <div className="flex max-h-72 flex-col gap-3 overflow-y-auto px-4 py-4">
            <div className="flex items-start gap-2">
              <div className="grid size-7 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                <Bot className="size-3.5" />
              </div>
              <div className="rounded-2xl rounded-tl-sm bg-muted px-3 py-2 text-sm text-foreground">
                Hi! I'm Brian's AI assistant. I'm still being trained — check
                back soon to ask me about his work, projects, and experience.
              </div>
            </div>
            <div className="rounded-xl border border-dashed border-border bg-background/60 px-3 py-2 text-center text-[11px] text-muted-foreground">
              This assistant is under construction. Conversational logic is built
              in n8n and will be connected here shortly.
            </div>
          </div>

          {/* Composer — disabled placeholder */}
          <div className="flex items-center gap-2 border-t border-border px-3 py-3">
            <input
              type="text"
              disabled
              aria-label="Message (coming soon)"
              placeholder="Coming soon…"
              className="h-9 flex-1 cursor-not-allowed rounded-full border border-input bg-muted/40 px-4 text-sm text-muted-foreground placeholder:text-muted-foreground/70 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleSend}
              disabled
              aria-label="Send message (coming soon)"
              className="grid size-9 shrink-0 cursor-not-allowed place-items-center rounded-full bg-primary/50 text-primary-foreground"
            >
              <Send className="size-4" />
            </button>
          </div>
        </div>
      )}

      {/* Floating toggle button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
        className={cn(
          "pointer-events-auto group relative grid size-14 place-items-center rounded-full border border-border bg-card text-foreground shadow-[0_10px_30px_-5px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all duration-200 hover:scale-105 hover:bg-primary hover:text-primary-foreground",
        )}
      >
        {/* Tiny "soon" indicator dot */}
        <span className="absolute -right-0.5 -top-0.5 flex size-3.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex size-3.5 rounded-full border-2 border-card bg-emerald-500" />
        </span>
        {open ? (
          <X className="size-6" />
        ) : (
          <MessageCircle className="size-6" />
        )}
      </button>
    </div>
  );
}

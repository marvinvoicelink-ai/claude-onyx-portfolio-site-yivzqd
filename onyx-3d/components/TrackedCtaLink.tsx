"use client";

import type { CSSProperties, ReactNode } from "react";
import { openContactForm, type ContactTopic } from "@/lib/contactModal";

/**
 * CTA-Button, der das Kontakt-Formular-Overlay öffnet (kein Lead beim Klick,
 * nur ContactClick + gemerkte Quelle, siehe lib/trackLead.ts). `href` bleibt
 * als Ausweichziel ohne JavaScript. Existiert, damit auch Server-Components
 * einen CTA einbauen können, ohne selbst Client-Component zu werden.
 */
export default function TrackedCtaLink({
  href,
  source,
  topic = "general",
  children,
  className,
  style,
}: {
  href: string;
  source: string;
  topic?: ContactTopic;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        openContactForm(source, topic);
      }}
      className={className}
      style={style}
    >
      {children}
    </a>
  );
}

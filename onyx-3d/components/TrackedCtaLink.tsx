"use client";

import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { trackLead } from "@/lib/trackLead";

/**
 * Amber CTA button that links to the contact page and fires the Lead event
 * on click, same as every other primary CTA on the site. Exists so
 * Server-Component pages (which can't hold an onClick themselves) can still
 * place a tracked contact CTA inline without turning the whole section into
 * a Client Component.
 */
export default function TrackedCtaLink({
  href = "/kontakt",
  children,
  className,
  style,
}: {
  href?: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <Link href={href} onClick={trackLead} className={className} style={style}>
      {children}
    </Link>
  );
}

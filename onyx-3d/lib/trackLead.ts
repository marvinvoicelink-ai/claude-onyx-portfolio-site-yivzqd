declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/** Fires the Meta Pixel Lead event. Called on click for every CTA that is or leads to the contact form. */
export function trackLead() {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", "Lead");
  }
}

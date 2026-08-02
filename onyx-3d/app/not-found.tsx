import Link from "next/link";

export const metadata = {
  title: "Seite nicht gefunden — Onyx.AI",
};

export default function NotFound() {
  return (
    <main className="flex items-center justify-center" style={{ minHeight: "70vh" }}>
      <div className="mx-auto px-7 text-center" style={{ maxWidth: 480 }}>
        <span
          className="mono block mb-4"
          style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
        >
          404
        </span>
        <h1 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", marginBottom: 14 }}>
          Diese Seite gibt es nicht.
        </h1>
        <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", lineHeight: 1.7, marginBottom: 32 }}>
          Der Link ist entweder veraltet oder falsch getippt. Von der
          Startseite aus findest du alles wieder.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-[10px] px-6 py-4 font-semibold btn-amber"
          style={{ background: "var(--amber)", color: "#161104", fontSize: "15.5px" }}
        >
          Zur Startseite
        </Link>
      </div>
    </main>
  );
}

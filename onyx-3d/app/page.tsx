import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <SmoothScroll>
      <main>
        <Hero />
        <section
          className="py-24"
          style={{ borderTop: "1px solid var(--hairline)" }}
        >
          <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
            <p style={{ color: "var(--warm-grey-dim)" }}>
              Weitere Sektionen folgen hier.
            </p>
          </div>
        </section>
      </main>
    </SmoothScroll>
  );
}

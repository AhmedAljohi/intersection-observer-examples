// src/App.tsx
import React, { useState, useEffect } from "react";
import { useInView, LazyRender } from "@intersection-observer/react";

function LazyImage({ src, alt }: { src: string; alt?: string }) {
  const { ref, inView } = useInView();
  console.log('inView image', inView)
  return (
    <div ref={ref} style={{ minHeight: 600 }}>
      {inView && <img src={src} alt={alt} width="100%" />}
    </div>
  );
}

function InfiniteList({ loadMore }: { loadMore: () => void }) {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  React.useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView]);

  return <div ref={ref} style={{ height: 1 }} />;
}

function AnimatedSection({ children }: { children: React.ReactNode }) {
  const { ref, inView } = useInView({ threshold: 0.2 });
  return (
    <div
      ref={ref}
      style={{ opacity: inView ? 1 : 0, transition: "opacity 0.6s" }}
    >
      {children}
    </div>
  );
}

function App() {
  const [items, setItems] = useState<string[]>([]);
  console.log("3333", 3333);
  const loadMore = () =>
    setItems((prev) => [
      ...prev,
      ...Array(10).fill("Item " + (prev.length + 1)),
    ]);

  useEffect(() => loadMore(), []);

  return (
    <div>
      <h1>React Intersection Observer Sandbox</h1>
      <section>
        <h2>1. Lazy Loading Images</h2>
        <LazyImage src="https://picsum.photos/300/200?random=1" />
        <LazyImage src="https://picsum.photos/300/200?random=2" />
        <LazyImage src="https://picsum.photos/300/200?random=3" />
        <LazyImage src="https://picsum.photos/300/200?random=4" />
      </section>

      {/* <section>
        <h2>2. Infinite Scroll</h2>
        {items.map((item, i) => (
          <div key={i}>{item}</div>
        ))}
        <InfiniteList loadMore={() => loadMore()} />
      </section> */}

      <section>
        <h2>3. Scroll-Based Animations</h2>
        {[...Array(5)].map((_, i) => (
          <AnimatedSection key={i}>
            <div style={{ height: 150, margin: "20px 0", background: "#ccc" }}>
              Animation section {i + 1}
            </div>
          </AnimatedSection>
        ))}
      </section>

      <section>
        <h2>4. Analytics Tracking</h2>
        <LazyRender
          onChange={(inView: boolean) => {
            if (inView) console.log("Tracking element visible:");
          }}
        >
          <div style={{ height: 200, background: "#88c" }}>Track me</div>
        </LazyRender>
      </section>

      <section>
        <h2>5. Conditional Rendering with Render Props</h2>
        <LazyRender>
          {({ inView, ref }) => (
            <div
              ref={ref}
              style={{ height: 150, margin: 10, background: "#faa" }}
            >
              {inView ? "In view → Render content" : "Not in view"}
            </div>
          )}
        </LazyRender>
      </section>

      <section>
        <h2>6. Performance Monitoring</h2>
        <LazyRender
          onChange={(visible) => console.log("Performance inView:", visible)}
        >
          {({ ref }) => (
            <div
              ref={ref}
              style={{ height: 150, margin: 10, background: "#aaf" }}
            >
              Check console for perf logs
            </div>
          )}
        </LazyRender>
      </section>
    </div>
  );
}

export default App;

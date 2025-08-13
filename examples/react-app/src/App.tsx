// src/App.tsx
import React, { useState, useEffect } from "react";
import { LazyRender } from "@intersection-observer/react";
import ProductCard from "./ProductCard";
// import { useInView, LazyRender } from "@intersection-observer/react";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
  ref?: React.Ref<HTMLDivElement>;
}
// function LazyImage({ src, alt }: { src: string; alt?: string }) {
//   const { ref, inView } = useInView();
//   console.log("inView image", inView);
//   return (
//     <div ref={ref} style={{ minHeight: 600 }}>
//       {inView && <img src={src} alt={alt} width="100%" />}
//     </div>
//   );
// }

// function InfiniteList({ loadMore }: { loadMore: () => void }) {
//   const { ref, inView } = useInView({
//     threshold: 0.5,
//   });

// React.useEffect(() => {
//   if (inView) {
//     loadMore();
//   }
// }, [inView]);

//   return (
//     <div
//       ref={ref as React.RefObject<HTMLDivElement | null>}
//       style={{ height: 1 }}
//     />
//   );
// }

// function AnimatedSection({ children }: { children: React.ReactNode }) {
//   const { ref, inView } = useInView({ threshold: 0.2 });
//   return (
//     <div
//       ref={ref as React.RefObject<HTMLDivElement | null>}
//       style={{ opacity: inView ? 1 : 0, transition: "opacity 0.6s" }}
//     >
//       {children}
//     </div>
//   );
// }

function App() {
  // const [items, setItems] = useState<string[]>([]);
  // const loadMore = () =>
  //   setItems((prev) => [
  //     ...prev,
  //     ...Array(10).fill("Item " + (prev.length + 1)),
  //   ]);

  // useEffect(() => loadMore(), []);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch("https://dummyjson.com/products?limit=1000")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch products");
        setLoading(false);
      });
  }, []);

  return (
    // <>
    <div style={{ padding: 24 }}>
      <h1>Product List</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 24,
        }}
      >
        {products.map((product) => (
          <LazyRender key={product.id}>
            {({ inView, ref }) => (
              <div ref={ref}>
                {inView && (
                  <ProductCard
                    title={product.title}
                    price={product.price}
                    description={product.description}
                    thumbnail={product.thumbnail}
                  />
                )}
              </div>
            )}
          </LazyRender>
        ))}
      </div>
    </div>
    // <div>
    //   <h1>React Intersection Observer Sandbox</h1>
    //   {/* Lazy-load images */}
    //   {/* <section>
    //   <h2>1. Lazy Loading Images</h2>
    //   <LazyImage src="https://picsum.photos/300/200?random=1" />
    //   <LazyImage src="https://picsum.photos/300/200?random=2" />
    //   <LazyImage src="https://picsum.photos/300/200?random=3" />
    //   <LazyImage src="https://picsum.photos/300/200?random=4" />
    // </section> */}

    //   {/* Infinite scrolling */}
    //   {/* <section>
    //   <h2>2. Infinite Scroll</h2>
    //   {items.map((item, i) => (
    //     <div key={i}>{item}</div>
    //   ))}
    //   <InfiniteList loadMore={() => loadMore()} />
    // </section> */}

    //   {/*  Trigger animations at the right time */}
    //   {/* <section>
    //   <h2>3. Scroll-Based Animations</h2>
    //   {[...Array(5)].map((_, i) => (
    //     <AnimatedSection key={i}>
    //       <div style={{ height: 150, margin: "20px 0", background: "#ccc" }}>
    //         Animation section {i + 1}
    //       </div>
    //     </AnimatedSection>
    //   ))}
    // </section> */}
    //   {/*  Trigger animations at the right time */}
    //   {/*
    // <section>
    //   <h2>4. Analytics Tracking</h2>
    //   <LazyRender
    //     onChange={(inView: boolean) => {
    //       if (inView) console.log("Tracking element visible:");
    //     }}
    //   >
    //     <div style={{ height: 200, background: "#88c" }}>Track me</div>
    //   </LazyRender>
    // </section> */}

    //   {/*  Analytics & performance tracking */}
    //   {/* <section>
    //   <h2>6. Performance Monitoring</h2>
    //   <LazyRender
    //     onChange={(visible: boolean) =>
    //       console.log("Performance inView:", visible)
    //     }
    //   >
    //     {({ ref }) => (
    //       <div
    //         ref={ref}
    //         style={{ height: 150, margin: 10, background: "#aaf" }}
    //       >
    //         Check console for perf logs
    //       </div>
    //     )}
    //   </LazyRender>
    // </section> */}
    // </div>
    // </>
  );
}

export default App;

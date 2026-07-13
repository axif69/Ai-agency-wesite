"use client";

import React, { useEffect, useRef, useState } from "react";

type LazySectionProps = {
  children: React.ReactNode;
  className?: string;
  placeholderClassName?: string;
  rootMargin?: string;
};

export default function LazySection({
  children,
  className = "",
  placeholderClassName = "",
  rootMargin = "200px",
}: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className}>
      {isVisible ? children : <div className={placeholderClassName} aria-hidden="true" />}
    </div>
  );
}

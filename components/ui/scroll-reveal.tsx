"use client";

import { useInView } from "@/hooks/use-in-view";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section";
}

export function ScrollReveal({ children, className = "", as: Tag = "div" }: ScrollRevealProps) {
  const { ref, isInView } = useInView();
  return (
    <Tag ref={ref} data-in-view={isInView} className={className}>
      {children}
    </Tag>
  );
}

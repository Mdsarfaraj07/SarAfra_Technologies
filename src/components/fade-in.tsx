'use client';

import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

type FadeInProps = {
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
};

export function FadeIn({ children, className, as: Tag = 'div' }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn('fade-in', { 'is-visible': isVisible }, className)}
    >
      {children}
    </Tag>
  );
}

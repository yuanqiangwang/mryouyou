'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useInView } from 'motion/react';

/**
 * 滚动入场：位移 + 透明度 + 模糊三者同时收敛。
 * inView=false 时改为「挂载即播放」，适合首屏元素。
 */
export function BlurFade({
  children,
  className,
  delay = 0,
  duration = 0.6,
  yOffset = 16,
  blur = '8px',
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  blur?: string;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount: 0.2 });
  const active = once ? inView : true;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: yOffset, filter: `blur(${blur})` }}
      animate={
        active
          ? { opacity: 1, y: 0, filter: 'blur(0px)' }
          : { opacity: 0, y: yOffset, filter: `blur(${blur})` }
      }
      transition={{ duration, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

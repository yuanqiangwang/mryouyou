'use client';

import type { ReactNode } from 'react';
import { motion } from 'motion/react';

import { cn } from '@/lib/utils';

/**
 * 流光盘旋文字。
 *
 * 结构：底层是静态的品牌渐变文字，上层是同一段文字用「白色斜向高光」做
 * background-clip: text 裁剪，由 motion 平移其 background-position，
 * 于是高光像一道光带反复扫过字面。
 */
export function AnimatedGradientText({
  children,
  className,
  duration = 2.6,
  repeatDelay = 2.4,
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
  repeatDelay?: number;
}) {
  return (
    <span className={cn('relative inline-block', className)}>
      <span className="text-brand-gradient bg-[length:200%_auto] animate-shimmer">
        {children}
      </span>

      <motion.span
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0 select-none',
          'bg-[linear-gradient(100deg,transparent_28%,oklch(1_0_0/0.85)_50%,transparent_72%)] bg-[length:250%_auto]',
          'bg-clip-text text-transparent',
        )}
        animate={{ backgroundPosition: ['160% 0%', '-160% 0%'] }}
        transition={{
          duration,
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay,
          ease: 'easeInOut',
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}

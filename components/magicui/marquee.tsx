import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

/**
 * 无缝跑马灯：把同一份 children 复制 repeat 份首尾相接，
 * 动画位移恰好等于「一份宽度 + 一个 gap」，因此循环点不可见。
 * gap 必须与 globals.css 中 `--marquee-gap` 的默认值 (2rem) 一致 —— 即 gap-8。
 */
export function Marquee({
  children,
  className,
  repeat = 4,
  reverse = false,
  pauseOnHover = true,
}: {
  children: ReactNode;
  className?: string;
  repeat?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
}) {
  return (
    <div
      className={cn(
        'group flex gap-8 overflow-hidden [--marquee-gap:2rem]',
        className,
      )}
    >
      {Array.from({ length: repeat }).map((_, index) => (
        <div
          key={index}
          aria-hidden={index > 0}
          className={cn(
            'animate-marquee flex shrink-0 items-center gap-8',
            reverse && '[animation-direction:reverse]',
            pauseOnHover && 'group-hover:[animation-play-state:paused]',
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}

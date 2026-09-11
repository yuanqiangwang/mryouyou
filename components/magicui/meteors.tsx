'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

type MeteorSpec = {
  left: string;
  delay: string;
  duration: string;
};

/**
 * 流星背景层。
 *
 * 每个流星的横向起点、延迟、时长都是运行时随机值，静态类名无法表达，
 * 因此这部分通过内联 CSS 变量下发（属于「数据」而非「样式」，
 * 视觉规则本身仍全部由 Tailwind 类名 + globals.css 关键帧定义）。
 *
 * 随机值在挂载后才生成，保证服务端与客户端首次渲染一致，避免 hydration 不匹配。
 */
export function Meteors({
  number = 18,
  className,
}: {
  number?: number;
  className?: string;
}) {
  const [meteors, setMeteors] = React.useState<MeteorSpec[]>([]);

  React.useEffect(() => {
    setMeteors(
      Array.from({ length: number }, () => ({
        left: `${Math.round(Math.random() * 130 - 15)}%`,
        delay: `${(Math.random() * 6).toFixed(2)}s`,
        duration: `${(Math.random() * 6 + 4).toFixed(2)}s`,
      })),
    );
  }, [number]);

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        className,
      )}
    >
      {meteors.map((meteor, index) => (
        <span
          key={index}
          className={cn(
            'animate-meteor absolute -top-4 size-0.5 rounded-full bg-primary/80',
            'shadow-[0_0_0_1px_oklch(1_0_0/0.12)]',
            "before:absolute before:top-1/2 before:h-px before:w-14 before:-translate-y-1/2 before:bg-gradient-to-r before:from-primary/70 before:to-transparent before:content-['']",
          )}
          style={{
            left: meteor.left,
            animationDelay: meteor.delay,
            animationDuration: meteor.duration,
          }}
        />
      ))}
    </div>
  );
}

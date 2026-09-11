'use client';

import { useEffect, useRef } from 'react';

import { cn } from '@/lib/utils';

/**
 * 鼠标跟随的网格辉光。
 *
 * 性能要点：指针位置只写入 DOM 上的 CSS 变量 `--mx/--my`，
 * 由 CSS 的 radial-gradient 消费，不触发任何 React 重渲染。
 *
 * 辉光层套了 grid-line-mask，因此光只在 1px 网格线上显形，
 * 看上去是「网格被点亮」而不是「贴了一块圆形光斑」。
 * 网格尺寸 (44px) 需与 globals.css 中 grid-line-mask 的 mask-size 一致。
 */
export function InteractiveGrid({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handlePointerMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      el.style.setProperty('--my', `${event.clientY - rect.top}px`);
    };

    window.addEventListener('pointermove', handlePointerMove, {
      passive: true,
    });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0', className)}
    >
      {/* 静态网格底纹 */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(1_0_0/0.035)_1px,transparent_0),linear-gradient(to_bottom,oklch(1_0_0/0.035)_1px,transparent_0)] bg-[size:44px_44px]" />

      {/* 跟随指针的辉光，经遮罩后只落在网格线上 */}
      <div className="grid-line-mask absolute inset-0 bg-[radial-gradient(200px_circle_at_var(--mx,50%)_var(--my,50%),oklch(0.82_0.14_200/0.55),transparent_72%)]" />
    </div>
  );
}

import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

/**
 * 环绕描边高光：外层容器 p-px 留出 1px 边框位，
 * 内部放一个超出边界的 conic-gradient 光带并持续旋转，被 overflow-hidden 裁成描边。
 * 纯 CSS，无需客户端声明。
 */
export function ShineBorder({
  children,
  className,
  contentClassName,
  duration = 8,
}: {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  duration?: number;
}) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl p-px',
        'border border-white/10',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute -inset-full animate-orbit',
          'bg-[conic-gradient(from_0deg,transparent_0%,var(--brand-from)_12%,var(--brand-via)_22%,var(--brand-to)_30%,transparent_45%)]',
        )}
        style={{ animationDuration: `${duration}s` }}
      />

      <div
        className={cn(
          'relative rounded-[calc(1rem-1px)] bg-card/80 backdrop-blur-xl',
          contentClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}

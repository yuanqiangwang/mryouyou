import type { ComponentType, ReactNode } from 'react';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

/**
 * Bento 栅格容器。lg 断点下为 6 列，卡片通过 className 传入
 * `lg:col-span-*` / `lg:row-span-*` 来编排疏密节奏。
 */
export function BentoGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'grid auto-rows-[minmax(12rem,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function BentoCard({
  title,
  description,
  icon: Icon,
  badge,
  className,
  children,
}: {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  badge?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-card/40 p-6 backdrop-blur-sm',
        'transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-primary/40',
        className,
      )}
    >
      {/* 悬停时浮现的角落光晕 */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -right-16 size-44 rounded-full bg-primary/15 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
      />
      {/* 悬停时点亮的顶边渐变 */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative flex items-center gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-background/60 text-primary">
          <Icon className="size-4" />
        </span>
        {badge ? (
          <Badge
            variant="outline"
            className="ml-auto border-white/10 text-[10px] tracking-wider text-muted-foreground uppercase"
          >
            {badge}
          </Badge>
        ) : null}
      </div>

      <h3 className="relative mt-4 text-base font-semibold tracking-tight">
        {title}
      </h3>
      <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>

      {children ? <div className="relative mt-auto pt-5">{children}</div> : null}
    </article>
  );
}

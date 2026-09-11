import { cn } from '@/lib/utils';

/**
 * 透视网格背景（Retro Grid）。
 * 纯 CSS 实现，无状态、无副作用，因此保持为服务端组件。
 */
export function RetroGrid({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden [perspective:200px]',
        className,
      )}
    >
      <div className="absolute inset-0 [transform:rotateX(62deg)]">
        <div
          className={cn(
            'animate-retro-grid absolute top-0 left-0 h-[300vh] w-[600vw] [margin-left:-200%] [transform-origin:100%_0_0]',
            '[background-image:linear-gradient(to_right,oklch(0.82_0.14_200/0.22)_1px,transparent_0),linear-gradient(to_bottom,oklch(0.82_0.14_200/0.22)_1px,transparent_0)]',
            '[background-repeat:repeat] [background-size:60px_60px]',
          )}
        />
      </div>

      {/* 让网格向远处自然淡出 */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
    </div>
  );
}

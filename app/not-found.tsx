import type { Metadata } from 'next';
import Link from 'next/link';

import { RetroGrid } from '@/components/magicui/retro-grid';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: '404 · 页面不存在',
};

/**
 * 静态导出时 Next.js 会把它渲染成 out/404.html，
 * Cloudflare Pages 会自动用该文件兜底所有未命中的路径。
 */
export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <RetroGrid className="mask-fade-y" />

      <div className="relative z-10 flex flex-col items-center">
        <p className="font-mono text-xs tracking-[0.4em] text-primary uppercase">
          Error 404
        </p>

        <h1 className="mt-6 text-7xl font-bold tracking-tighter sm:text-9xl">
          <span className="text-brand-gradient animate-shimmer bg-[length:200%_auto]">
            404
          </span>
        </h1>

        <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
          这条路径没有被编译出来 —— 页面可能已经移动，或者从未存在过。
        </p>

        <Button asChild variant="gradient" size="lg" className="mt-10">
          <Link href="/">返回首页</Link>
        </Button>
      </div>
    </main>
  );
}

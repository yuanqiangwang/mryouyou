'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { GithubIcon } from '@/components/icons/github';
import { Button } from '@/components/ui/button';
import { navItems, siteConfig } from '@/lib/site';
import { cn } from '@/lib/utils';

/**
 * 顶部导航。滚动超过阈值后由透明切换为毛玻璃 + 描边。
 * 用 scroll 事件而非 IntersectionObserver：这里只有一次布尔翻转，
 * 监听成本极低，逻辑也最直白。
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300',
        scrolled
          ? 'border-white/10 bg-background/70 backdrop-blur-xl'
          : 'border-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-lg border border-white/10 bg-white/5 font-mono text-sm font-bold text-primary">
            M
          </span>
          <span className="text-sm font-semibold tracking-tight">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 sm:flex">
          {navItems.map((navItem) => (
            <a
              key={navItem.href}
              href={navItem.href}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
            >
              {navItem.label}
            </a>
          ))}
        </nav>

        <Button
          asChild
          variant="outline"
          size="sm"
          className="ml-auto sm:ml-0"
        >
          <a href={siteConfig.github} target="_blank" rel="noreferrer noopener">
            <GithubIcon className="size-3.5" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </Button>
      </div>
    </header>
  );
}

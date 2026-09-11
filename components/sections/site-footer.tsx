import { GithubIcon } from '@/components/icons/github';
import { navItems, siteConfig } from '@/lib/site';

export function SiteFooter() {
  return (
    <footer className="relative border-t border-white/5 px-6 py-14">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 sm:flex-row sm:justify-between">
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <span className="font-mono text-sm font-semibold tracking-tight">
            {siteConfig.name}
          </span>
          <span className="text-xs text-muted-foreground">
            用 AI 构建，用好奇心驱动。
          </span>
        </div>

        <nav className="flex items-center gap-1">
          {navItems.map((navItem) => (
            <a
              key={navItem.href}
              href={navItem.href}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
            >
              {navItem.label}
            </a>
          ))}
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub"
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
          >
            <GithubIcon className="size-4" />
          </a>
        </nav>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-white/5 pt-6">
        <p className="text-center text-xs text-muted-foreground sm:text-left">
          © {new Date().getFullYear()} {siteConfig.name} · Built with Next.js ·
          Deployed on Cloudflare Pages
        </p>
      </div>
    </footer>
  );
}

import { Download } from 'lucide-react';

import { CountUp } from '@/components/effects/count-up';
import { TextDecode } from '@/components/effects/text-decode';
import { GithubIcon } from '@/components/icons/github';
import { BentoCard, BentoGrid } from '@/components/magicui/bento-grid';
import { BlurFade } from '@/components/magicui/blur-fade';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  featuredProduct,
  productFeatures,
  productHotkeys,
  productMetrics,
  productQuickstart,
} from '@/lib/products';

/**
 * 产品陈列 —— 主产品深度介绍 + 特性栅格 + 快捷键 / 快速开始。
 *
 * 本组件保持为服务端组件：动效与交互均由
 * BlurFade / TextDecode / CountUp 三个客户端组件承担。
 */
export function ProductShowcase() {
  const product = featuredProduct;

  return (
    <section
      id="products"
      className="relative border-t border-white/5 px-6 py-28"
    >
      <div className="mx-auto max-w-6xl">
        {/* ---------- 区块头 ---------- */}
        <BlurFade>
          <p className="font-mono text-xs tracking-[0.3em] text-primary uppercase">
            <TextDecode text="// OPEN SOURCE" />
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            产品陈列
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
            目前只发布了一个 —— 但它足够认真。xon
            把「打开一个程序」这件事拆开重做了一遍，为中文用户的输入习惯重新设计了整套匹配逻辑。
          </p>
        </BlurFade>

        {/* ---------- 主产品 ---------- */}
        <BlurFade delay={0.08} className="mt-14">
          <article className="glass-panel relative overflow-hidden rounded-3xl">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
            />

            <div className="grid gap-10 p-8 lg:grid-cols-[1.3fr_1fr] lg:p-10">
              {/* 定位、示例与入口 */}
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="pill" className="text-primary">
                    开源 · {product.license}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-white/10 font-mono text-[10px] tracking-wider text-muted-foreground"
                  >
                    {product.version}
                  </Badge>
                </div>

                <h3 className="mt-6 font-mono text-3xl font-bold tracking-tight sm:text-4xl">
                  {product.title}
                </h3>
                <p className="mt-3 text-lg leading-relaxed text-pretty">
                  {product.tagline}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {product.description}
                </p>

                {/* 输入示例：把匹配能力具象成「敲什么 → 出什么」 */}
                <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
                  {product.examples.map((example) => (
                    <li
                      key={example.input}
                      className="rounded-xl border border-white/10 bg-background/60 px-3.5 py-2.5"
                    >
                      <p className="flex items-center gap-2 font-mono text-xs">
                        <span className="font-semibold text-primary">
                          {example.input}
                        </span>
                        <span className="text-muted-foreground/50">→</span>
                        <span>{example.target}</span>
                      </p>
                      <p className="mt-1 text-[11px] text-muted-foreground/70">
                        {example.hint}
                      </p>
                    </li>
                  ))}
                </ul>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {product.stack.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-white/10 px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button
                    asChild
                    variant="gradient"
                    size="lg"
                    className="group w-full sm:w-auto"
                  >
                    <a
                      href={product.releases}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <Download className="transition-transform duration-300 group-hover:translate-y-0.5" />
                      下载最新版
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    <a
                      href={product.repo}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <GithubIcon className="size-4" />
                      查看源码
                    </a>
                  </Button>
                </div>
              </div>

              {/* 实测指标：gap-px + 半透明底 = 发丝级分隔线 */}
              <dl className="grid grid-cols-2 gap-px self-start overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                {productMetrics.map((metric) => (
                  <div key={metric.label} className="bg-background/50 px-5 py-5">
                    <dt className="text-xs tracking-wider text-muted-foreground">
                      {metric.label}
                    </dt>
                    <dd className="mt-1.5">
                      <span className="block text-2xl font-semibold tracking-tight">
                        <CountUp
                          to={metric.value}
                          decimals={metric.decimals}
                          suffix={metric.suffix}
                        />
                      </span>
                      <span className="mt-1 block text-[11px] leading-snug text-muted-foreground/70">
                        {metric.note}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </article>
        </BlurFade>

        {/* ---------- 核心特性 ---------- */}
        <BentoGrid className="mt-6">
          {productFeatures.map((feature, index) => (
            <BlurFade
              key={feature.id}
              delay={index * 0.06}
              className={feature.span}
            >
              <BentoCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                badge={feature.badge}
                className="h-full"
              />
            </BlurFade>
          ))}
        </BentoGrid>

        {/* ---------- 快捷键 / 快速开始 ---------- */}
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <BlurFade className="h-full">
            <div className="glass-panel flex h-full flex-col rounded-2xl p-6">
              <h3 className="text-base font-semibold tracking-tight">快捷键</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                全程键盘操作，手不用离开主键区。
              </p>
              <dl className="mt-5 flex flex-col divide-y divide-white/5">
                {productHotkeys.map((hotkey) => (
                  <div
                    key={hotkey.keys}
                    className="flex flex-wrap items-center gap-x-4 gap-y-1 py-2.5"
                  >
                    <dt className="shrink-0">
                      <kbd className="rounded-md border border-white/10 bg-background/60 px-2 py-1 font-mono text-[11px] text-primary">
                        {hotkey.keys}
                      </kbd>
                    </dt>
                    <dd className="text-sm text-muted-foreground">
                      {hotkey.action}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </BlurFade>

          <BlurFade delay={0.08} className="h-full">
            <div className="glass-panel flex h-full flex-col rounded-2xl p-6">
              <h3 className="text-base font-semibold tracking-tight">
                快速开始
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                直接下载 Release 里的 NSIS 安装包即可使用；想从源码构建，需要：
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {productQuickstart.requirements.map((requirement) => (
                  <li
                    key={requirement}
                    className="rounded-full border border-white/10 px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground"
                  >
                    {requirement}
                  </li>
                ))}
              </ul>
              <pre className="mt-4 overflow-x-auto rounded-xl border border-white/10 bg-background/60 p-4 font-mono text-xs leading-relaxed text-muted-foreground">
                {productQuickstart.commands}
              </pre>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground/70">
                {productQuickstart.buildNote}
              </p>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}

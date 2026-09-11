import { ArrowUpRight } from 'lucide-react';

import { TextDecode } from '@/components/effects/text-decode';
import { BentoCard, BentoGrid } from '@/components/magicui/bento-grid';
import { BlurFade } from '@/components/magicui/blur-fade';
import { products } from '@/lib/products';

/**
 * 产品陈列（Bento 栅格）。
 *
 * 本组件本身是服务端组件；需要动效与指针交互的部分
 * （BlurFade / TextDecode）已各自封装为客户端组件。
 */
export function ProductShowcase() {
  return (
    <section
      id="products"
      className="relative border-t border-white/5 px-6 py-28"
    >
      <div className="mx-auto max-w-6xl">
        <BlurFade>
          <p className="font-mono text-xs tracking-[0.3em] text-primary uppercase">
            <TextDecode text="// FEATURED PRODUCTS" />
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            产品陈列
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
            每一个都始于一个模糊的念头，在与 AI
            的反复对话中长成可用形态。下面是其中一部分。
          </p>
        </BlurFade>

        <BentoGrid className="mt-14">
          {products.map((product, index) => (
            <BlurFade
              key={product.id}
              delay={index * 0.06}
              className={product.span}
            >
              <BentoCard
                title={product.title}
                description={product.description}
                icon={product.icon}
                badge={product.badge}
                className="h-full"
              >
                <a
                  href={product.href}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-foreground"
                >
                  查看详情
                  <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </BentoCard>
            </BlurFade>
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}

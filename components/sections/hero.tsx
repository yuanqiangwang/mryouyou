'use client';

import { motion, type Variants } from 'motion/react';
import { ArrowRight } from 'lucide-react';

import { CountUp } from '@/components/effects/count-up';
import { InteractiveGrid } from '@/components/effects/interactive-grid';
import { Spotlight } from '@/components/effects/spotlight';
import { TextDecode } from '@/components/effects/text-decode';
import { AnimatedGradientText } from '@/components/magicui/animated-gradient-text';
import { Marquee } from '@/components/magicui/marquee';
import { Meteors } from '@/components/magicui/meteors';
import { RetroGrid } from '@/components/magicui/retro-grid';
import { GithubIcon } from '@/components/icons/github';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { heroStats, siteConfig, stackTags } from '@/lib/site';

/** 父容器只负责编排节奏，具体位移交给子项 */
const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

export function Hero() {
  return (
    <section className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-24">
      {/* ---------- 背景特效层（自下而上叠加） ---------- */}
      <RetroGrid className="mask-fade-y" />
      <InteractiveGrid />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 size-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-via/10 blur-[130px]"
      />
      <Meteors number={22} />
      <Spotlight className="-top-40 left-0 md:-top-24 md:left-56" />

      {/* ---------- 内容层 ---------- */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center"
      >
        <motion.div variants={item}>
          <Badge variant="pill">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
            </span>
            <TextDecode
              text="Vibe Coding · AI 工具生态"
              className="font-mono tracking-wider"
            />
          </Badge>
        </motion.div>

        <motion.h1
          variants={item}
          className="mt-8 text-5xl leading-[1.08] font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl"
        >
          <span className="block">把灵感</span>
          <span className="mt-2 block">
            <AnimatedGradientText>直接编译成产品</AnimatedGradientText>
          </span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-7 max-w-2xl text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg"
        >
          我是 {siteConfig.name}，一名 Vibe Coder。这里陈列我用 AI
          构建的工具与产品 —— 从一句自然语言描述的念头，到一个真实跑在浏览器里的界面。
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
        >
          <Button
            asChild
            variant="gradient"
            size="xl"
            className="group w-full sm:w-auto"
          >
            <a href="#products">
              浏览产品
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Button>

          <Button
            asChild
            variant="outline"
            size="xl"
            className="w-full sm:w-auto"
          >
            <a href={siteConfig.github} target="_blank" rel="noreferrer noopener">
              <GithubIcon className="size-4" />
              GitHub 仓库
            </a>
          </Button>
        </motion.div>

        {/* 数据指标：gap-px + 半透明底 = 发丝级分隔线 */}
        <motion.dl
          variants={item}
          className="mt-16 grid w-full max-w-2xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm sm:grid-cols-3"
        >
          {heroStats.map((stat) => (
            <div key={stat.label} className="bg-background/50 px-5 py-5">
              <dt className="text-xs tracking-wider text-muted-foreground">
                {stat.label}
              </dt>
              <dd className="mt-1.5 text-2xl font-semibold tracking-tight">
                <CountUp to={stat.value} suffix={stat.suffix} />
              </dd>
            </div>
          ))}
        </motion.dl>

        {/* 技术栈跑马灯 */}
        <motion.div variants={item} className="mt-16 w-full max-w-4xl">
          <Marquee
            pauseOnHover
            className="[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
          >
            {stackTags.map((tag) => (
              <span
                key={tag}
                className="border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-xs whitespace-nowrap text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </Marquee>
        </motion.div>
      </motion.div>
    </section>
  );
}

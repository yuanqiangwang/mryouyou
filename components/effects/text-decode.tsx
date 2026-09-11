'use client';

import { useEffect, useRef } from 'react';
import { animate, random } from 'animejs';

import { cn } from '@/lib/utils';

/** 解码过程中用来「占位」的噪点字符 */
const NOISE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>*#@$%&';

/**
 * 字符解码入场（anime.js）。
 *
 * anime.js 补间一个 0→1 的进度对象，进度决定「已定格字符」与「噪点字符」的
 * 分界线；分界点之后才逐字还原。同样直接改写 textContent，避免逐帧重渲染。
 *
 * 服务端首帧渲染的是真实文案（利于 SEO 与无 JS 场景），水合后再开始解码。
 */
export function TextDecode({
  text,
  className,
  duration = 1400,
  delay = 0,
  noise = 0.35,
}: {
  text: string;
  className?: string;
  duration?: number;
  delay?: number;
  /** 0~1：解码初期「未定格」区域的占比上限 */
  noise?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const playedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || playedRef.current) return;
        playedRef.current = true;

        const progress = { value: 0 };
        animate(progress, {
          value: 1,
          duration,
          delay,
          ease: 'inOutQuad',
          onUpdate: () => {
            const settled = Math.floor(progress.value * text.length);
            let output = '';

            for (let i = 0; i < text.length; i += 1) {
              const char = text[i]!;
              if (char === ' ') {
                output += ' ';
              } else if (i < settled) {
                output += char;
              } else {
                output += NOISE[random(0, NOISE.length - 1)] ?? char;
              }
            }

            el.textContent = output;
          },
          onComplete: () => {
            el.textContent = text;
          },
        });
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [text, duration, delay, noise]);

  return (
    <span ref={ref} className={cn(className)}>
      {text}
    </span>
  );
}

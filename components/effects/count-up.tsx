'use client';

import { useEffect, useRef } from 'react';
import { animate } from 'animejs';

import { cn } from '@/lib/utils';

/**
 * 按指定小数位格式化，整数位带千分位分隔符。
 * 放在模块作用域是为了让首帧与动画结束帧用同一套规则，
 * 避免服务端与客户端渲染出不同文本。
 */
function formatNumber(value: number, decimals: number) {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * 数字滚动（anime.js）。
 *
 * 直接改写 DOM 文本而不走 setState —— 逐帧 setState 会让整棵子树重渲染，
 * 而这里唯一变化的只有一段文本。
 * 用 IntersectionObserver 保证进入视口才播放，并且只播放一次。
 */
export function CountUp({
  to,
  suffix = '',
  duration = 1800,
  delay = 0,
  decimals = 0,
  className,
}: {
  to: number;
  suffix?: string;
  duration?: number;
  delay?: number;
  /** 小数位。渲染与补间都遵循它，例如 8.9 需传 1。 */
  decimals?: number;
  className?: string;
}) {
  const numberRef = useRef<HTMLSpanElement>(null);
  const playedRef = useRef(false);

  useEffect(() => {
    const el = numberRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || playedRef.current) return;
        playedRef.current = true;

        // anime.js 可以补间任意普通对象，这里借它生成 0 -> to 的进度值
        const counter = { value: 0 };
        animate(counter, {
          value: to,
          duration,
          delay,
          ease: 'outExpo',
          onUpdate: () => {
            el.textContent = formatNumber(counter.value, decimals);
          },
          onComplete: () => {
            el.textContent = formatNumber(to, decimals);
          },
        });
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [to, duration, delay, decimals]);

  return (
    <span className={cn('tabular-nums', className)}>
      <span ref={numberRef}>{formatNumber(0, decimals)}</span>
      {suffix}
    </span>
  );
}

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 合并 Tailwind 类名：clsx 处理条件类名，tailwind-merge 消解冲突
 * （后写的同类工具类覆盖先写的，例如 `p-2 p-4` -> `p-4`）
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

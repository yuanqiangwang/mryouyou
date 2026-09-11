@AGENTS.md

# 项目开发与规约指南 (CLAUDE.md)

## 1. 部署与架构约束 (Cloudflare Pages SSG)

- **部署目标**：Cloudflare Pages (Static Packaging)
- **打包模式**：必须保持 `next.config.mjs` 中的 `output: 'export'`。
- **服务端特性限制**：禁止使用 Next.js 服务端渲染 API（如 SSR/ISR/Server Actions、API Routes、`next/headers` 或 `cookies()`）。
- **图片处理**：禁止使用 Next.js 默认的 Node 图片动态优化服务，统一在 `next.config` 中保留 `images: { unoptimized: true }`。

## 2. UI & 特效开发规范

- **客户端组件**：任何使用了 `animejs`、`framer-motion`、Canvas、React Hook 或 DOM 监听的组件，**文件首行必须显式声明 `'use client';`**。
- **组件库融合**：
  - 基础标准交互（Button, Dialog, Input）优先使用/扩展 `components/ui/` 中的 shadcn/ui 组件。
  - 高阶视觉特效（Aceternity UI / Magic UI）源码统一放置在 `components/magicui/` 或 `components/effects/`。
  - 复杂路径/矢量时间轴动画优先调用 `animejs`。
- **样式与主题**：全局保持 Dark Mode 科技感风格，统一使用 Tailwind CSS 类名与 `cn()` 函数，不写内联 `style` 或纯 CSS 声明。

## 3. Git 与 Cloudflare 部署配置指示

- **Build Command**: `npm run build`
- **Build Output Directory**: `out`
- **Node.js Environment**: 确保 Cloudflare Pages 环境变量 `NODE_VERSION` 设置为 `20.x` 或以上。
- **404 路由**：必须维护 `app/not-found.tsx` 以确保 Cloudflare Pages 静态路由正常拦截错误。

---

## 4. 版本相关的硬性约定（最容易写错的部分）

本项目跑在 Next.js 16 / React 19 / Tailwind CSS v4 上，以下 API 与常见训练数据存在差异，**必须先查 `node_modules/next/dist/docs/` 再动手**：

| 主题 | 本项目写法 | 不要写成 |
| --- | --- | --- |
| 动画库入口 | `import { animate, createTimeline, stagger, eases } from 'animejs'` | v3 的默认导出 `anime({...})`、`anime.timeline()` |
| 动效库包名 | `import { motion, useInView } from 'motion/react'` | `'framer-motion'`（包名已迁移，本项目只装了 `motion`） |
| Tailwind 配置 | 设计令牌写在 `app/globals.css` 的 `@theme inline` 中 | 新建 `tailwind.config.js/ts`（v4 已不再需要） |
| 自定义工具类 | `@utility name { ... }` | `@layer utilities { .name {} }` |
| 主题暗色变体 | `@custom-variant dark (&:is(.dark *))` | `darkMode: 'class'` 配置项 |
| 图标 | `lucide-react` 的线性图标 + `components/icons/` 下的自绘品牌图标 | `lucide-react` 的 `Github`/`Twitter`（v1 已移除全部品牌图标） |
| React 组件 ref | 直接作为 props 传递（React 19） | `React.forwardRef` 包装 |

## 5. 目录结构

```
app/
  layout.tsx          # 根布局，<html class="dark"> 在此写死（静态导出，无主题闪烁）
  page.tsx            # 首页（服务端组件，仅做区块拼装）
  not-found.tsx       # 404 页，静态导出为 out/404.html
  globals.css         # 设计令牌 + 关键帧 + @utility 自定义工具类
components/
  ui/                 # shadcn/ui 基础组件（尽量贴近上游，便于后续 shadcn add 覆盖）
  magicui/            # Magic UI 风格特效：meteors / retro-grid / marquee / bento-grid …
  effects/            # 项目自研特效：spotlight / interactive-grid / count-up / text-decode
  sections/           # 页面区块：hero / product-showcase / site-header / site-footer
  icons/              # 自绘品牌图标（lucide v1 已无品牌图标）
lib/
  utils.ts            # cn() 样式合并
  site.ts             # 站点常量（名称、导航、指标、技术栈标签）
  products.tsx        # 产品陈列数据
```

## 6. 关于「不写内联 style」

第 2 节的约束针对的是**样式**，即不要用 `style={{ color: ... }}` 代替 Tailwind 类名。以下两种情况除外，且应就近加注释说明：

1. **运行时随机值**，静态类名无法表达。例如 `components/magicui/meteors.tsx` 中每个流星的横向起点、延迟、时长。
2. **高频更新、不能触发 React 重渲染的值**。例如 `components/effects/interactive-grid.tsx` 把指针坐标写入 CSS 变量 `--mx/--my`，由 CSS 消费。

## 7. 特效开发注意事项

- **随机值必须挂载后生成**：在 `useState` 初始值或渲染期调用 `Math.random()` 会导致服务端与客户端首帧不一致，触发 hydration 报错。参考 `meteors.tsx` 的 `useEffect` 写法。
- **逐帧动画不要走 setState**：会引发整棵子树重渲染。`effects/count-up.tsx` 与 `effects/text-decode.tsx` 都是直接改写 `textContent`。
- **入场动效需可降级**：使用 `motion` 的 `whileInView` / `useInView` 时，元素初始为 `opacity: 0`；请确保关键内容有 `once: true` 兜底，`globals.css` 已统一处理 `prefers-reduced-motion`。
- **新增关键帧**：在 `globals.css` 顶层定义 `@keyframes`，并在 `@theme inline` 中加一条 `--animate-xxx`，即可获得 `animate-xxx` 工具类。
- **服务端组件优先**：只有真正需要 Hook / 事件 / 动效的组件才加 `'use client'`。纯 CSS 特效（如 `retro-grid.tsx`、`shine-border.tsx`、`marquee.tsx`）应保持为服务端组件。

## 8. 关于 AGENTS.md

`AGENTS.md` 顶部的 `nextjs-agent-rules` 区块由 `next dev` 自动写入与维护。**不要把它挪进本文件**：只要 `AGENTS.md` 继续托管该区块，`next dev` 就会跳过 `CLAUDE.md`，本文件的规约因此不会被覆盖（判定逻辑见 `node_modules/next/dist/server/lib/generate-agent-files.js`）。

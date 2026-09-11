# Mryouyou

个人 Vibe Coding 工具与产品展示站。Next.js App Router 全静态导出，部署于 Cloudflare Pages。

## 技术栈

| 层 | 选型 |
| --- | --- |
| 框架 | Next.js 16 (App Router) + React 19 + TypeScript |
| 样式 | Tailwind CSS v4 + shadcn/ui 架构（Dark Mode 为默认主题） |
| 动效 | anime.js v4（时间轴 / 数值补间）+ Motion（滚动入场 / 布局动画） |
| 图标 | lucide-react + `components/icons/` 自绘品牌图标 |
| 部署 | Cloudflare Pages 静态托管（`output: 'export'`） |

## 本地开发

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 产出静态站点到 out/
npm run preview  # 本地预览 out/ 产物
```

## 部署到 Cloudflare Pages

在 Cloudflare Dashboard → Workers & Pages → Create → Pages 中连接仓库，填写：

| 配置项 | 值 |
| --- | --- |
| Framework preset | `Next.js (Static HTML Export)` |
| Build command | `npm run build` |
| Build output directory | `out` |
| 环境变量 | `NODE_VERSION` = `20`（或更高） |

也可以用 Wrangler 直接发布：

```bash
npm run build
npx wrangler pages deploy out --project-name=mryouyou
```

`app/not-found.tsx` 会被导出为 `out/404.html`，Cloudflare Pages 自动用它兜底未命中的路径。

## 内容维护

绝大部分文案集中在少数几个文件里，改这些就够了：

- `lib/site.ts` —— 站点名称、URL、GitHub 地址、导航项、Hero 指标数字、技术栈标签
- `lib/products.tsx` —— 产品陈列数据（含 Bento 栅格占位 `span`）
- `app/layout.tsx` —— SEO metadata
- `app/globals.css` —— 配色令牌、关键帧、自定义工具类

## 目录结构

```
app/                  页面与路由
components/ui/        shadcn/ui 基础组件
components/magicui/   Magic UI 风格特效组件
components/effects/   项目自研特效组件（anime.js / 指针交互）
components/sections/  页面区块
components/icons/     自绘品牌图标
lib/                  工具函数与站点数据
```

开发规范详见 [CLAUDE.md](./CLAUDE.md)。

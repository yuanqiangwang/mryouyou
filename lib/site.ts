/**
 * 站点级常量：单一数据源，供 metadata / Header / Footer / Hero 共用。
 * 修改个人信息只需要改这里。
 */
export const siteConfig = {
  name: 'MrYou²',
  title: 'MrYou² · Vibe Coding 工具与产品',
  description:
    '一名 Vibe Coder 的工具箱与产品陈列室 —— 用自然语言构建软件，记录从一句话想法到可运行产品的全过程。',
  url: 'https://mryouyou.pages.dev',
  github: 'https://github.com/yuanqiangwang',
  email: 'yqcolin@gmail.com',
  locale: 'zh-CN',
} as const;

/** 顶部导航 */
export const navItems = [
  { label: '产品', href: '#products' },
  { label: '工具链', href: '#stack' },
  { label: '关于', href: '#about' },
] as const;

/** Hero 数据指标 */
export const heroStats = [
  { label: '已发布产品', value: 12, suffix: '+' },
  { label: '开源仓库', value: 28, suffix: '' },
  { label: '累计 Star', value: 1400, suffix: '+' },
] as const;

/** 技术栈标签（Hero 下方滚动跑马灯） */
export const stackTags = [
  'Next.js',
  'React 19',
  'TypeScript',
  'Tailwind CSS',
  'shadcn/ui',
  'Framer Motion',
  'Anime.js',
  'Cloudflare Pages',
  'Claude Code',
  'Cursor',
  'MCP',
  'Vercel AI SDK',
] as const;

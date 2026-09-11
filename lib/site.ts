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

/**
 * Hero 数据指标。
 *
 * 只填能核对到出处的数字 —— 这三项分别对应：开源项目数量、
 * x-on 的安装包体积与热键唤出延迟（后者见 lib/products.tsx 的注释）。
 * 新增产品后请同步更新，不要回填估算值。
 */
export type HeroStat = {
  label: string;
  value: number;
  suffix: string;
  /** 小数位，需与 CountUp 的入参一致；整数指标可省略 */
  decimals?: number;
};

export const heroStats: readonly HeroStat[] = [
  { label: '开源项目', value: 1, suffix: ' 个' },
  { label: 'xon 安装包', value: 1.58, decimals: 2, suffix: ' MB' },
  { label: 'xon 热键唤出', value: 8.9, decimals: 1, suffix: ' ms' },
];

/** 技术栈标签（Hero 下方滚动跑马灯） */
export const stackTags = [
  'Next.js',
  'React 19',
  'TypeScript',
  'Tailwind CSS',
  'shadcn/ui',
  'Motion',
  'Anime.js',
  'Tauri v2',
  'Rust',
  'Cloudflare Pages',
  'Claude Code',
  'MCP',
] as const;

import type { ComponentType } from 'react';
import {
  Filter,
  Languages,
  Layers,
  MonitorCog,
  Palette,
  Ruler,
} from 'lucide-react';

/**
 * 产品陈列数据 —— 只改这里，展示区块会自动重排。
 *
 * 目前仅有一个真实产品（xon）。新增产品时：
 * 1. 在下方追加一条 `Product`；
 * 2. `product-showcase.tsx` 的「主产品」区会渲染 `featuredProduct`，
 *    其余条目按 `span` 落进 Bento 栅格。
 *
 * 约束：这里只写可核对的事实。数据来源为仓库 README 与 GitHub Releases，
 * 更新 x-on 后请同步 `version` 与 `productMetrics`。
 */

export type Product = {
  id: string;
  /** 仓库名，全小写，作为等宽字体展示的产品标识 */
  title: string;
  /** 一句话定位，出现在标题下方 */
  tagline: string;
  description: string;
  badge: string;
  version: string;
  icon: ComponentType<{ className?: string }>;
  repo: string;
  releases: string;
  license: string;
  /** 技术栈标签 */
  stack: readonly string[];
  /** 「输入 → 命中」示例，用来具象化匹配引擎的能力 */
  examples: readonly { input: string; target: string; hint: string }[];
};

/** 性能与规模指标。`decimals` 决定 CountUp 的小数位，务必与真实精度一致。 */
export type Metric = {
  label: string;
  value: number;
  decimals?: number;
  suffix: string;
  note: string;
};

export const featuredProduct: Product = {
  id: 'xon',
  title: 'xon',
  tagline: '面向中文环境的 Windows 应用启动器 —— 专注拼音搜索，按键即达。',
  description:
    '按下 Alt + Space 唤出面板，输入几个字母或拼音，回车即可启动 —— 开始菜单程序、便携应用、系统设置、命令行工具，都在同一个入口里。它的目标只有一个：把「打开一个程序」这件事做到最快。为此它没有扩展系统、没有账号、没有联网，也不依赖任何前端框架。',
  badge: 'Open Source',
  version: 'v0.7.1',
  icon: Languages,
  repo: 'https://github.com/yuanqiangwang/x-on',
  releases: 'https://github.com/yuanqiangwang/x-on/releases/latest',
  license: 'MIT',
  stack: ['Tauri v2', 'Rust', 'TypeScript', '无框架', '无 UI 库', '无 CSS 框架'],
  examples: [
    { input: 'jsq', target: '计算器', hint: '拼音首字母' },
    { input: 'wx', target: '微信', hint: '拼音首字母' },
    { input: 'dingding', target: '钉钉', hint: '全拼前缀' },
    { input: 'control panel', target: '控制面板', hint: '自动补的英文别名' },
  ],
};

/**
 * 真实测量值，摘自 x-on 仓库 README 的 `pnpm bench` 结果
 * （release 0.6.0，Windows 11 家庭版 / Intel Core Ultra 7 255H / 32 GB）。
 * 黑盒测量，应用内部无埋点。
 */
export const productMetrics: readonly Metric[] = [
  {
    label: '热键 → 窗口可见',
    value: 8.9,
    decimals: 1,
    suffix: ' ms',
    note: 'p50 · p95 为 14.6 ms',
  },
  {
    label: '安装包体积',
    value: 1.58,
    decimals: 2,
    suffix: ' MB',
    note: 'NSIS 安装包',
  },
  {
    label: '闲置 CPU 占用',
    value: 0.1,
    decimals: 2,
    suffix: ' %',
    note: '空闲状态实测',
  },
  {
    label: '内置系统命令',
    value: 37,
    suffix: ' 条',
    note: '设备管理器、磁盘管理等',
  },
];

/** 核心特性，驱动 Bento 栅格。lg 断点为 6 列，span 合计需为 6 的倍数。 */
export const productFeatures: readonly {
  id: string;
  title: string;
  description: string;
  badge: string;
  icon: ComponentType<{ className?: string }>;
  span: string;
}[] = [
  {
    id: 'pinyin',
    title: '中文拼音搜索',
    description:
      '「微信」用 wx 命中、「计算器」用 jsq 命中。全拼、拼音首字母、词首字母三路并行，搜索框里不必先想起应用的中文全名。',
    badge: '中文优先',
    icon: Languages,
    span: 'lg:col-span-2',
  },
  {
    id: 'homophone',
    title: '同音词抑制',
    description:
      '输入确切汉字时优先字面命中，自动剔除「丁丁」这类同音候选 —— 结果列表不再被无关词污染。',
    badge: '中文优先',
    icon: Filter,
    span: 'lg:col-span-2',
  },
  {
    id: 'matcher',
    title: '七级匹配引擎',
    description:
      '从名称精确匹配到模糊子序列共 7 级评分，显示名与系统别名在一次遍历中同时打分。逻辑集中在 src/matcher.ts，可独立、确定性地单测。',
    badge: 'Matcher',
    icon: Layers,
    span: 'lg:col-span-2',
  },
  {
    id: 'native',
    title: '原生 Windows 集成',
    description:
      '右键「以管理员身份运行」「打开文件所在的位置」，失焦自动隐藏，单实例唤出，不会重复驻留。',
    badge: 'Shell',
    icon: MonitorCog,
    span: 'lg:col-span-2',
  },
  {
    id: 'window',
    title: '自适应窗口',
    description:
      '无边框、无多余装饰，窗口高度按结果行数逐像素调整 —— 结果几条，窗口就长几行。',
    badge: 'UI',
    icon: Ruler,
    span: 'lg:col-span-2',
  },
  {
    id: 'theme',
    title: '主题与配色可配',
    description:
      '默认跟随 Windows 浅色 / 深色实时切换；也可只覆盖 6 个基础色自定义整套配色，其余派生色自动跟着算，不会出现半截配色。',
    badge: 'Theme',
    icon: Palette,
    span: 'lg:col-span-2',
  },
];

/** 快捷键表 */
export const productHotkeys: readonly { keys: string; action: string }[] = [
  { keys: 'Alt + Space', action: '唤出启动器（全局快捷键，可配置）' },
  { keys: '↑ / ↓', action: '在候选中上下移动' },
  { keys: 'Enter', action: '启动选中的应用或系统 URI' },
  { keys: 'Ctrl + Enter', action: '以管理员身份运行' },
  { keys: 'Alt + 1..9, 0', action: '直接启动第 1 至第 10 项结果' },
  { keys: 'Esc', action: '关闭右键菜单，或隐藏启动器' },
];

/** 源码构建步骤（首行为空行时会被渲染层裁掉） */
export const productQuickstart = {
  requirements: [
    'Node.js v18+',
    'Rust（Tauri v2 所需）',
    'WebView2 运行时（Windows 10 / 11 已预装）',
  ],
  commands: `git clone https://github.com/yuanqiangwang/x-on.git
cd x-on
pnpm install
pnpm tauri dev`,
  buildNote: '发布构建为 pnpm tauri build，产物与 NSIS 安装包输出在 src-tauri/target/release/。',
};

import type { ComponentType } from 'react';
import {
  Blocks,
  Boxes,
  Cpu,
  Layers,
  Terminal,
  WandSparkles,
} from 'lucide-react';

export type Product = {
  id: string;
  title: string;
  description: string;
  badge: string;
  icon: ComponentType<{ className?: string }>;
  /** Bento 栅格中的占位（lg 断点为 6 列） */
  span: string;
  href: string;
};

/**
 * 产品陈列数据 —— 占位内容，替换成你自己的产品即可。
 * 只改这里，Bento 版块会自动按 span 重新编排。
 */
export const products: Product[] = [
  {
    id: 'promptdeck',
    title: 'PromptDeck',
    description:
      '提示词工作台。把散落在各处的 prompt 沉淀成可版本化、可复用、可评测的资产库。',
    badge: 'Featured',
    icon: WandSparkles,
    span: 'sm:col-span-2 lg:col-span-4 lg:row-span-2',
    href: '#',
  },
  {
    id: 'ui-forge',
    title: 'UI Forge',
    description: '描述一个界面，直接产出可粘贴进项目的 Tailwind 组件代码。',
    badge: 'Tool',
    icon: Layers,
    span: 'lg:col-span-2 lg:row-span-2',
    href: '#',
  },
  {
    id: 'mcp-toolkit',
    title: 'MCP Toolkit',
    description: '一组即插即用的 MCP Server，让 AI 直接读写你的本地工具链。',
    badge: 'Open Source',
    icon: Blocks,
    span: 'lg:col-span-2',
    href: '#',
  },
  {
    id: 'shipfast',
    title: 'ShipFast CLI',
    description: '一条命令拉起 Next.js + Tailwind + 静态部署的完整脚手架。',
    badge: 'CLI',
    icon: Terminal,
    span: 'lg:col-span-2',
    href: '#',
  },
  {
    id: 'agent-lab',
    title: 'Agent Playground',
    description: '在浏览器里编排多智能体工作流，实时观察每一步的工具调用。',
    badge: 'Experiment',
    icon: Cpu,
    span: 'lg:col-span-2',
    href: '#',
  },
  {
    id: 'vibe-log',
    title: 'Vibe Log',
    description: '记录每一次与 AI 结对的过程：什么奏效，什么翻车，为什么。',
    badge: 'Writing',
    icon: Boxes,
    span: 'lg:col-span-2',
    href: '#',
  },
];

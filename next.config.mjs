/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare Pages 静态打包：构建产物输出到 out/，不依赖任何 Node 运行时
  output: 'export',

  // 静态导出下没有 Next.js 图片优化服务，必须关闭
  images: {
    unoptimized: true,
  },

  // 生成 dir/index.html 结构，避免 Cloudflare Pages 上 /path 与 /path/ 的路由歧义
  trailingSlash: true,

  reactStrictMode: true,
};

export default nextConfig;

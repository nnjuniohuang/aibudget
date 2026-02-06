import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Next.js 会自动处理大文件上传，默认支持 5MB
};

export default nextConfig;

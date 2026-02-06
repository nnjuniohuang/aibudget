import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // 增加请求体大小限制到 5MB
  serverRuntimeConfig: {
    maxRequestBodySize: "5mb",
  },
  api: {
    responseLimit: "5mb",
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repoName = "nextjs-simple-spa";

const nextConfig: NextConfig = {
  ...(isProd
    ? {
        output: "export",
        basePath: `/${repoName}`,
        assetPrefix: `/${repoName}/`,
        images: {
          unoptimized: true,
        },
      }
    : {
        // dev mode
      }),
};

export default nextConfig;

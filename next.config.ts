import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    return Object.assign({}, config, {
      module: Object.assign({}, config.module, {
        rules: config.module.rules.concat([
          {
            test: /\.md$/,
            type: "asset/source",
          },
        ]),
      }),
    });
  },
};

export default nextConfig;

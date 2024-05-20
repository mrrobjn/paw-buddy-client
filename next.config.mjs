/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: process.env.BACK_END_URL },
          { key: "Access-Control-Allow-Methods", value: "GET,POST,PUT,DELETE" },
        ],
      },
      // Add your other headers configurations here
    ];
  },
  env: {
    BACK_END_URL: process.env.BACK_END_URL,
  },
  webpack(config) {
    // Add a rule to handle MP3 files
    config.module.rules.push({
      test: /\.mp3$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next',
            name: 'static/media/[name].[hash].[ext]',
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;

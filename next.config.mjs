/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // static HTML for every route — host anywhere (Vercel, Netlify, Cloudflare Pages, cPanel)
  trailingSlash: true, // canonical URLs end with "/" (e.g. /services/meta-ads/)
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
};
export default nextConfig;

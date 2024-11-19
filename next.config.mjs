const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fenwick-bazaar-bucket.s3.ap-southeast-2.amazonaws.com",
        port: "",
        pathname: "/**",
      }
    ],
  },
}

export default nextConfig

/** @type {import('next').NextConfig} */

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

const nextConfig = (phase) => {

  if(phase === PHASE_DEVELOPMENT_SERVER){
    return {
      env: {
        mongodb_username: 'nextdathil',
        mongodb_password: '5hGPUwnGCqIpHUgz',
        mongodb_clustername: 'cluster0',
        mongodb_database: 'nextauthdev',
        NEXTAUTH_SECRET: 'LlKq6ZtYbr+hTC073mAmAh9/h2HwMfsFo4hrfCx5mLg=',
        NEXT_URL: 'http://localhost:3000',
        NEXTAUTH_URL: 'http://localhost:3000',
      },
      reactStrictMode: true,
    };
  }

  return {
    env: {
      mongodb_username: 'nextdathil',
      mongodb_password: '5hGPUwnGCqIpHUgz',
      mongodb_clustername: 'cluster0',
      mongodb_database: 'nextauth',
      NEXTAUTH_SECRET: 'LlKq6ZtYbr+hTC073mAmAh9/h2HwMfsFo4hrfCx5mLg=',
      NEXT_URL: 'https://next-auth-git-main-athilameens-projects.vercel.app/',
      NEXTAUTH_URL: 'https://next-auth-git-main-athilameens-projects.vercel.app/',
    },
    reactStrictMode: true,
  }
  
}

module.exports = nextConfig
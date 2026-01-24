const config = {
  siteUrl: 'http://localhost:3000',
  generateRobotsTxt: true,

  exclude: ['/admin/*', '/dashboard/*', '/home/auth/*', '/api/*', '/home/profile/*', '/auth/*'],

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: ['/admin', '/dashboard', '/home/auth', '/api', '/home/profile', '/auth'],
      },
    ],
  },

  sitemapSize: 1000,
  changefreq: 'daily',
  priority: 0.7,

  transform: async (config, path) => {
    const priorities = {
      '/': 0.9,
      '/home': 1.0,
      '/home/event': 0.9,
      '/home/about': 0.9,
    };

    return {
      loc: path,
      changefreq: path === '/' ? 'daily' : 'weekly',
      priority: priorities[path] ?? 0.5,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};

export default config;

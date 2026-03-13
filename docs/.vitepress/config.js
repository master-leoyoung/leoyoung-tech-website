import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'LeoYoung Tech Website',
  description: 'A technology website built with VitePress',
  lang: 'en-US',
  
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'TeamMind', link: '/teammind/introduction' },
      { text: 'QoScore', link: '/qoscore/introduction' },
      { text: 'Blog', link: '/blog/' },
      { text: 'About', link: '/about/' }
    ],

    sidebar: {
      '/teammind/': [
        {
          text: 'TeamMind',
          items: [
            { text: 'Introduction', link: '/teammind/introduction' },
            { text: 'Features', link: '/teammind/features' },
            { text: 'Documentation', link: '/teammind/documentation' },
            { text: 'Installation', link: '/teammind/installation' }
          ]
        }
      ],
      '/qoscore/': [
        {
          text: 'QoScore',
          items: [
            { text: 'Introduction', link: '/qoscore/introduction' },
            { text: 'Features', link: '/qoscore/features' },
            { text: 'Documentation', link: '/qoscore/documentation' },
            { text: 'Installation', link: '/qoscore/installation' }
          ]
        }
      ],
      '/blog/': [
        {
          text: 'Blog',
          items: [
            { text: 'All Posts', link: '/blog/' },
            { text: 'Categories', link: '/blog/categories' }
          ]
        }
      ],
      '/about/': [
        {
          text: 'About',
          items: [
            { text: 'About Me', link: '/about/' },
            { text: 'Contact', link: '/about/contact' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/yourusername/yourrepo' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present LeoYoung'
    }
  }
})

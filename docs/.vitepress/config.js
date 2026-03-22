import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'LeoYoung Tech Website',
  description: 'A technology website built with VitePress',
  lang: 'en-US',
  ignoreDeadLinks: true
  
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'TeamMind', link: '/teammind/introduction' },
      { text: 'QoScore', link: '/qoscore/Framework' },
      { text: 'Blog', link: '/blog/' },
      { text: 'About', link: '/about/' }
    ],

    sidebar: {
      '/teammind/': [
        {
          text: 'TeamMind',
          items: [
            { text: 'Why build it', link: '/teammind/Why build it' },
            { text: 'Scenarios', link: '/teammind/Scenarios' },
            { text: 'Features', link: '/teammind/Features' },
            { text: 'Installation', link: '/teammind/Installation' }
          ]
        }
      ],
      '/qoscore/': [
        {
          text: 'QoScore',
          items: [
            { text: 'Framework', link: '/qoscore/Framework' },
            {
              text: 'Platform',
              collapsed: false,
              items: [
                { text: 'Introduction', link: '/qoscore/Introduction' },
                { text: 'Features', link: '/qoscore/Features' },
                { text: 'Editions', link: '/qoscore/Editions' },
                { text: 'Under the hood', link: '/qoscore/Under the hood' },
                { text: 'Installation', link: '/qoscore/Installation' },
                { text: 'Demo & Github', link: '/qoscore/Demo & Github' }
              ]
            }
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

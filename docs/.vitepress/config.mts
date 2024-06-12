import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "NPA-Tool",
    description: "开源的npm包依赖分析工具",
    base: "/npa-tool/",
    head: [
        ['link', { rel: 'icon', href: 'https://trudbot-pic.oss-cn-hangzhou.aliyuncs.com/trubdot/1FCEBC130F5CD4909174FFACCD09B5B5.webp' }]
    ],
    themeConfig: {
         // https://vitepress.dev/reference/default-theme-config
        logo: 'https://trudbot-pic.oss-cn-hangzhou.aliyuncs.com/trubdot/1FCEBC130F5CD4909174FFACCD09B5B5.webp',
        nav: [
            { text: 'Home', link: '/' },
            { text: 'trudbot', link: 'https://trudbot.cn' }
        ],

        sidebar: [
            {
                text: '简介',
                items: [
                    {text: '什么是npa-tool', link: '/guide/introduction'},
                    { text: '快速开始', link: '/guide/getting-started' },
                ]
            },
            {
                text: '开发指南',
                items: [
                    { text: '快速开始', link: '/dev/quick-start'},
                    {text: 'core模块详解', link: '/dev/core'}
                ]
            }
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/trudbot/npa-tool' }
        ]
    }
})

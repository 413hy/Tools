import env from './env';

const keywords = 'YangHE のTools,在线工具,工具集合,工具箱,在线转换';

export default {
    env: env,
    server: {
        // https:
        //     process.env.NODE_ENV === 'development'
        //         ? {
        //               key: fs.readFileSync(
        //                   path.resolve(__dirname, './ssl/privkey.pem')
        //               ),
        //               cert: fs.readFileSync(
        //                   path.resolve(__dirname, './ssl/server.pem')
        //               )
        //           }
        //         : undefined
    },
    serverMiddleware: ['~/server-middleware/headers'],

    /*
     ** Headers of the page
     */
    head: {
        title: `YangHE のTools - 一个轻量的工具集合`,
        meta: [
            { charset: 'utf-8' },
            {
                hid: 'viewport',
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'keywords',
                name: 'keywords',
                content: keywords
            },
            {
                hid: 'description',
                name: 'description',
                itemprop: 'description',
                content: '一个轻量的工具集合'
            },
            {
                hid: 'author',
                name: 'author',
                content: 'Ice-Hazymoon'
            },
            {
                name: 'HandheldFriendly',
                content: true
            },
            {
                property: 'og:site_name',
                content: 'MikuTools'
            },
            {
                name: 'mobile-web-app-capable',
                content: 'yes'
            },
            {
                name: 'apple-mobile-web-app-title',
                content: 'MikuTools'
            },
            {
                name: 'apple-mobile-web-app-status-bar-style',
                content: 'white'
            },
            {
                name: 'theme-color',
                content: '#ffffff'
            }
        ],
        link: [
            {
                rel: 'icon',
                type: 'image/x-icon',
                href: 'https://yhedesk.dpdns.org/toolssvg'
            }
        ]
    },

    /*
     ** Customize the progress-bar color
     */
    loading: {
        color: '#00adb5',
        height: '4px'
    },

    /*
     ** Global CSS
     */
    css: [
        'normalize.css',
        '~styles/main.scss',
        'eva-icons/style/eva-icons.css'
    ],

    styleResources: {
        scss: ['styles/variables.scss']
    },

    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        './plugins/request.js',
        {
            src: './plugins/db.js',
            ssr: false
        },
        {
            src: './plugins/modal.js',
            ssr: false
        },
        {
            src: './components/UI/index.js'
        },
        {
            src: './plugins/shortid.js',
            ssr: false
        },
        {
            src: './plugins/clipboard.js',
            ssr: false
        },
        {
            src: './plugins/vue-lazyload.js',
            ssr: false
        },
        {
            src: './plugins/vuejs-noty.js',
            ssr: false
        },
        {
            src: '~/plugins/localStorage.js',
            ssr: false
        },
        {
            src: '~/plugins/SmoothScroll.js',
            ssr: false
        },
        {
            src: '~/plugins/console.style.js',
            ssr: false
        },
        {
            src: '~/plugins/vue-good-table.js'
        },
        {
            src: '~/plugins/baidupush.js',
            ssr: false
        }
    ],

    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        '@nuxtjs/pwa',
        '@nuxtjs/style-resources',
        // [
        //     '@nuxtjs/google-analytics',
        //     {
        //         id: ''
        //     }
        // ],
        [
            'vue-sweetalert2/nuxt',
            {
                confirmButtonColor: '#249ffd',
                animation: false,
                customClass: {
                    popup: 'sweetalert2'
                }
            }
        ]
    ],
    /*
     ** Axios module configuration
     */
    axios: {
        baseURL: env.axios,
        progress: false
    },

    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        postcss: {
            plugins: {
                'postcss-pxtorem': {
                    rootValue: 16,
                    propList: ['*'],
                    selectorBlackList: ['html']
                },
                autoprefixer: {}
            }
        },
        // 添加 sass-loader 配置
        loaders: {
            scss: {
                implementation: require('sass'),
                sassOptions: {
                    fiber: false
                }
            }
        }
    },
    manifest: {
        description: '收集实用的小工具',
        display: 'standalone',
        name: 'MikuTools',
        short_name: 'MikuTools',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        scope: '/',
        lang: 'zh-cn'
    },
    // workbox: {
    //     runtimeCaching: [
    //         {
    //             urlPattern: 'https://mikutools.cdn.hazymoon.vip/.*'
    //         }
    //     ],
    //     offlinePage: '/offline.html',
    //     offlineAssets: ['/offline.html']
    // },
    router: {
        prefetchLinks: false,
        middleware: ['getCurrentTool', 'baidupush']
    },
    generate: {
        fallback: 'index.html',
        routes: ['/', '/custom_links'],
        subFolders: false
    }
};

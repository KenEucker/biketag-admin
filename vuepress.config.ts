import { defaultTheme, defineUserConfig } from 'vuepress'
import { sidebarTree } from './docs/api/config'

console.log({ sidebarTree: sidebarTree('Mainpage') })

export default defineUserConfig({
  lang: 'en-US',
  title: 'BikeTag Admin Vue Library',
  description: 'The vue component and store library for the BikeTag Game for Administrative tasks',
  theme: defaultTheme({
    editLink: true,
    sidebarDepth: 4,
    docsDir: 'docs',
    locales: {
      '/': {
        navbar: [
          {
            text: 'Home',
            link: '/',
          },
          {
            text: 'Api',
            link: '/api',
          },
        ],
        // Add the generated sidebar
        sidebar: Object.assign({}, sidebarTree('Mainpage')),
      },
    },
  }),
})

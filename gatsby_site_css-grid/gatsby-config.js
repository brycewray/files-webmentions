require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `brycewray.com`, // was Gatsby Default Starter
    titleTemplate: "%s • brycewray.com",
    description: `brycewray.com — Opinions, observations, nerdiness.`,
    author: `@BryceWrayTX`,
    siteUrl: `https://www.brycewray.com`,
    url: "https://www.brycewray.com",
    image: "/images/typewriter-monochrome_2242164_1280x720_60pct.jpg",
    twitterUsername: "@BryceWrayTX",
  },
  plugins: [
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-postcss`, // config in postcss.config.js
    `gatsby-plugin-twitter`, // still need so embedded tweets will appear
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {        
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 900,
              linkImagesToOriginal: false,
              backgroundColor: "none"
           },
         },
         {
           resolve: `gatsby-remark-smartypants`,
           options: {
             dashes: "oldschool",
             ellipse: false
           },
         },
         `gatsby-remark-numbered-footnotes`,
         {
           resolve: `gatsby-remark-prismjs`,
           options: {}
         },
         {
           resolve: `gatsby-remark-embed-video`,
           options: {
             beginMarker: `{{`,
             endMarker: `}}`,
             width: 640,
             related: false,
             noIframeBorder: true
           },
         },
         `gatsby-remark-responsive-iframe`,
         {
           resolve: `gatsby-remark-external-links`,
           options: {
             target: "_blank",
             rel: "noopener noreferrer"
           }
         },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`, 
      options: {
        name: `brycewray.com`, // was gatsby-starter-default
        short_name: `brycewray.com`,
        start_url: `/`,
        background_color: `#0000d1`,
        theme_color: `#0000d1`,
        display: `minimal-ui`,
        icon: `src/images/favicon-512x512.png` // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {}
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap.xml`
      }
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.frontmatter.description,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      fields { slug }
                      frontmatter {
                        title
                        date
                        description
                      }
                    }
                  }
                }
              }
            `,
            output: "/feed.xml",
            title: "RSS feed - brycewray.com",
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
            // match: "^/blog/",
          },
        ],
      },
    },
    `gatsby-plugin-netlify-cache`,
    {
      resolve: `gatsby-plugin-html-attributes`,
      options: {
        lang: `en`
      },
    },
    {
      resolve: `gatsby-plugin-webmention`,
      options: {
        username: `https://brycewray.com`,
        identity: {
          twitter: 'BryceWrayTX',
          email: 'bw@brycewray.com'
        },
        mentions: true,
        pingbacks: true,
        forwardPingbacksAsWebmentions: 'https://brid.gy',
        domain: 'brycewray.com',
        fetchLimit: 10000,
        token: process.env.GATSBY_WEBMENTION_IO_TOKEN
      },
    },
  ],
}

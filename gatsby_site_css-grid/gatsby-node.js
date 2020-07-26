const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions  

  const blogPost = path.resolve(`./src/templates/singlepost.js`)
  return graphql(
    `
    {
      onlyPosts: allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}, limit: 1000, filter: {frontmatter: {tags: {eq: "post"}}}) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              subtitle
              description
              tags
            }
          }
          next {
            fields {
              slug
            }
            frontmatter {
              title
              tags
            }
          }
          previous {
            fields {
              slug
            }
            frontmatter {
              title
              tags
            }
          }
        }
      }
      allContent: allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}, limit: 1000) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              subtitle
              description
              tags
            }
          }
        }
      }
    }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create site pages
    const pages = result.data.allContent.edges
    const posts = result.data.onlyPosts.edges

    pages.forEach((page, index) => {
      // for "Previous" and "Next" links
      const previous = index === pages.length - 1 ? null : pages[index + 1].node
      const next = index === 0 ? null : pages[index - 1].node
      const urlToCheck = "https://brycewray.com" + page.node.fields.slug

      createPage({
        path: page.node.fields.slug,
        component: blogPost,
        context: {
          slug: page.node.fields.slug,
          previous,
          next,
          permalink: `https://brycewray.com${path}`,
          urlToCheck
        },
      })
    })

    // Create blog post list pages
    const postsPerPage = 5
    const numPages = Math.ceil(posts.length / postsPerPage)

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/posts` : `/posts/${i + 1}`,
        component: path.resolve('./src/templates/postslist.js'),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode, getNodes }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value
    })
  }

  if (node.internal.type === "WebMentionEntry") {

    const slug = node.wmTarget
		createNodeField({ 
      node, 
      name: "slug", 
      value: slug
    })
	}

}
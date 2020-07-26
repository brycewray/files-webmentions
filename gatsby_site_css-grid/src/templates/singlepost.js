import React from 'react'
import { Link, graphql } from 'gatsby'
import LayoutSinglePost from "../components/layout-singlepost"
import SEO from '../components/seo'
import Header from '../components/header'

export const query = graphql`
  query($slug: String!, $urlToCheck: String!) {
    forThisPostQuery: markdownRemark(fields: { slug: { eq: $slug, ne: "Home page" } }) {
      fields {
        slug
      }
      frontmatter {
        description
        title
        tags
        subtitle
        date(formatString: "MMMM D, YYYY")
        lastmod(formatString: "MMMM D, YYYY")
        discussionId
        oldComments
      }
      html
    }
    forWMdataQuery: markdownRemark(fields: { slug: { eq: $slug, ne: "Home page" } }) {
      frontmatter {
        date
      }
    }
    likesQuery: allWebMentionEntry(sort: {fields: published, order: ASC}, filter: {wmTarget: {eq: $urlToCheck}, wmProperty: {eq: "like-of"}}) {
      edges {
        node {
          likeOf
          published(formatString: "MMM D, YYYY hh")
          type
          url
          wmReceived(formatString: "MMM D, YYYY")
          wmTarget
          author {
            name
            photo
            type
            url
          }
          wmProperty
        }
      }
    }
    repostsQuery: allWebMentionEntry(sort: {fields: published, order: ASC}, filter: {wmTarget: {eq: $urlToCheck}, wmProperty: {eq: "repost-of"}}) {
      edges {
        node {
          repostOf
          published(formatString: "MMM D, YYYY")
          type
          url
          wmReceived(formatString: "MMM D, YYYY")
          wmTarget
          author {
            name
            photo
            type
            url
          }
          wmProperty
        }
      }
    }
    repliesQuery: allWebMentionEntry(sort: {fields: published, order: ASC}, filter: {wmTarget: {eq: $urlToCheck}, wmProperty: {eq: "in-reply-to"}}) {
      edges {
        node {
          inReplyTo
          published(formatString: "MMM D, YYYY hh:mm:ss z")
          type
          url
          wmReceived(formatString: "MMM D, YYYY")
          wmTarget
          author {
            name
            photo
            type
            url
          }
          wmProperty
          content {
            html
            text
          }
        }
      }
    }
    mentionsQuery: allWebMentionEntry(sort: {fields: published, order: ASC}, filter: {wmTarget: {eq: $urlToCheck}, wmProperty: {eq: "mention-of"}}) {
      edges {
        node {
          likeOf
          published(formatString: "MMM D, YYYY hh:mm:ss z")
          type
          url
          wmReceived(formatString: "MMM D, YYYY")
          wmTarget
          author {
            name
            photo
            type
            url
          }
          wmProperty
          content {
            html
            text
          }
        }
      }
    }
    wmsAQuery: allWebMentionEntry(sort: {fields: published, order: ASC}, filter: {wmTarget: {eq: $urlToCheck}}) {
      edges {
        node {
          published(formatString: "MMM D, YYYY")
          wmReceived(formatString: "MMM D, YYYY")
          wmTarget
        }
      }
      totalCount
    }
  }
`

const singlePostTemplate = ({ data, pageContext }) => {
  const post = data.forThisPostQuery
  const wmDate = data.forWMdataQuery
  const wmsA = data.wmsAQuery
  const likes = data.likesQuery.edges
  const reposts = data.repostsQuery.edges
  const replies = data.repliesQuery.edges
  const mentions = data.mentionsQuery.edges
  
  const { previous, next, urlToCheck } = pageContext
  var lastModIntro, lastModText /* null unless there's a lastmod */
  if (post.frontmatter.lastmod) {
    lastModIntro = "last modified:";
    lastModText = post.frontmatter.lastmod;
  }
  
  return (
    <>
    <SEO 
    title={post.frontmatter.title} 
    description={post.frontmatter.description}
    />
    <Header />
    <LayoutSinglePost>
      <div className="background-hero-div">
        <div className="background-hero-title-block-fit">
          <h1 className="background-hero-title-text">{post.frontmatter.title}</h1>
          <h2 className="background-hero-subtitle-text">
          {post.frontmatter.subtitle && (
            <em>{post.frontmatter.subtitle}</em>
          )}
          {!post.frontmatter.subtitle && (
            <>
            &nbsp;
            </>
          )}
          </h2>
          <p className="background-hero-description-text">{post.frontmatter.description}</p>
          <p className="background-hero-p-text">
            <span style={{ fontVariant: "small-caps" }}>published:</span>&nbsp; <strong>{post.frontmatter.date}</strong><br />
            <span className="pokey">
            <span style={{ fontVariant: "small-caps" }}>{lastModIntro}</span>&nbsp; {lastModText}
            </span>
          </p>
        </div>
      </div>
      <div className="post-line"></div>
      <div className="container-narrower">
        <article className="article" dangerouslySetInnerHTML={{ __html: post.html }}>
        </article>
      </div>

      {post.frontmatter.oldComments && (
        <div dangerouslySetInnerHTML={{ __html: post.frontmatter.oldComments }} />
      )}


      <div class="webmentions" id="webmentions">
        <h3>Webmentions</h3>
        {wmsA.totalCount > 0
          ? <>
            {likes.length > 0
              ? <>
                <details>
                  <summary className="h4">Likes&nbsp;&nbsp;<span className="legal" style={{ fontWeight: "normal" }}>({likes.length})</span></summary>
                  <ul class="webmentions__list_facepile">
                    {likes.map(({ node }) => {
                      return (
                      <><li><img className="webmention__author__photo u-photo" src={node.author.photo} /></li></>
                      )
                    })}
                  </ul>
                </details>
                </>
              : ''
            }
            {reposts.length > 0
              ? <>
                <details>
                  <summary className="h4">Reposts&nbsp;&nbsp;<span className="legal" style={{ fontWeight: "normal" }}>({reposts.length})</span></summary>
                  <ul class="webmentions__list_facepile">
                    {reposts.map(({ node }) => {
                      return (
                      <><li><img className="webmention__author__photo u-photo" src={node.author.photo} /></li></>
                      )
                    })}
                  </ul>
                </details>
                </>
              : ''
            }
            {replies.length > 0
              ? <>
                <details>
                  <summary className="h4">Comments&nbsp;&bull;&nbsp;Replies&nbsp;&nbsp;<span className="legal" style={{ fontWeight: "normal" }}>({replies.length})</span></summary>
                  <ol className="webmentions__list">
                    {replies.map(({ node }) => {
                      return (
                      <>
                      <li className="webmentions__item">
                        <article className="webmention h-cite">
                          <div className="webmention__meta">
                            <a className="webmention__author p-author h-card u-url" href={node.url}><img className="webmention__author__photo u-photo" src={node.author.photo} alt={node.author.name} /><strong className="p-name">{node.author.name}</strong></a>&nbsp;<span className="legal"><time className="webmention__pubdate dt-published" datetime={node.published}>{node.published}</time></span>
                          </div>
                          <div className="webmention__content p-content" dangerouslySetInnerHTML={{ __html: node.content.html}} />
                        </article>
                      </li>
                      </>
                      )
                    })}
                  </ol>
                </details>
                </>
              : ''
            }
            {mentions.length > 0
              ? <>
                <details>
                  <summary className="h4">Mentions&nbsp;&nbsp;<span className="legal" style={{ fontWeight: "normal" }}>({mentions.length})</span></summary>
                  <ol className="webmentions__list">
                    {mentions.map(({ node }) => {
                      return (
                      <>
                      <li className="webmentions__item">
                        <article className="webmention h-cite">
                          <div className="webmention__meta">
                            <a className="webmention__author p-author h-card u-url" href={node.url}><img className="webmention__author__photo u-photo" src={node.author.photo} alt={node.author.name} /><strong className="p-name">{node.author.name}</strong></a>&nbsp;<span className="legal"><time className="webmention__pubdate dt-published" datetime={node.published}>{node.published}</time></span>
                          </div>
                          <div className="webmention__content p-content" dangerouslySetInnerHTML={{ __html: node.content.html}} />
                        </article>
                      </li>
                      </>
                      )
                    })}
                  </ol>
                </details>
                </>
              : ''
            }
            </>
          : <>
            <p className="ctr">(No webmentions yet.)</p>
            </>
        }
      </div>

      <div className="bg-dark">
        <h3 className="ctr wht"><a href="/posts" style={{ borderBottom: "0" }}>Other posts</a></h3>
        {next && (
          <p className="ctr"><strong>Next</strong>: <Link to={next.fields.slug} style={{ borderBottom: "0" }}>{next.frontmatter.title}</Link></p>
        )}
        {previous.fields.slug !== "/"
          ? (
          <p className="ctr"><strong>Previous</strong>: <Link to={previous.fields.slug} style={{ borderBottom: "0" }}>{previous.frontmatter.title}</Link></p>
          ) : null
        }
      </div>

      <footer className="ctr">
        <p><a href="https://github.com/brycewray/eleventy_bundler" target="_blank" rel="noopener" style={{ borderBottom: "none" }}><img src="/images/GitHub_octocat_logo_blue_48x48.png" style={{ height: "24px", width: "24px" }} alt="GitHub" /></a>&nbsp;&nbsp;<a href="https://twitter.com/BryceWrayTX" target="_blank" rel="noopener noreferrer" style={{ borderBottom: 
        "none" }}><img src="/images/twitter-2430933_48x48.png" style={{ height: "24px", width: "24px" }} alt="Twitter" /></a>&nbsp;&nbsp;<a href="https://www.linkedin.com/in/brycewray" target="_blank" rel="noopener noreferrer" style={{ borderBottom: "none" }}><img src="/images/linked-in-2674741_48x48.png" style={{ height: "24px", width: "24px" }} alt="LinkedIn" /></a>&nbsp;&nbsp;<a href="/feed.xml" style={{ borderBottom: "none" }}><img src="/images/rss-2440955_48x48.png" style={{ height: "24px", width: "24px" }} alt="RSS" /></a></p>
        <p className="legaltxt">
          &copy; {new Date().getFullYear()} <a className="h-card" rel="me" href="https://brycewray.com">Bryce Wray</a>.<br />
            Site built and managed with <a href="https://jamstack.org" target="_blank" rel="noopener noreferrer">the JAMstack</a>, <a href="https://css-tricks.com/snippets/css/complete-guide-grid/" target="_blank" rel="noopener noreferrer">CSS Grid</a>, <a href="https://www.apple.com/macos" target="_blank" rel="noopener noreferrer">macOS</a>, <a href="https://www.apple.com/ios">iOS</a>, <a href="https://daringfireball.net/projects/markdown" target="_blank" rel="noopener noreferrer">Markdown</a>, <span className="text-nowrap">time, and&nbsp;love.</span> <span className="text-nowrap">Hosted by&nbsp;<a href="https://netlify.com" target="_blank" rel="noopener noreferrer">Netlify</a></span>.
          </p>
          <hr style={{ marginTop: "2em"}} />
          <h4 className="ctr pokey">Information for webmentions</h4>
          <img className="u-photo" alt="This site's 'BW' logo" src="/images/favicon-512x512.png" style={{ width: "45px", height: "45px" }} />
          <p className="p-note legal">Unrepentant advocate for and user of the Oxford comma (sorry,&nbsp;AP). Webmentions&nbsp;of others&rsquo; content do&nbsp;not necessarily constitute endorsements. Comments&nbsp;and opinions expressed herein are my&nbsp;own, unless otherwise&nbsp;noted.</p>
          <h4 className="ctr legal">About this page</h4>
          <article className="h-entry legal">
            <div className="e-content p-name">
              {post.frontmatter.title}
              {post.frontmatter.subtitle 
                ? <>&nbsp;&nbsp;|&nbsp;&nbsp;{post.frontmatter.subtitle}</>
                : ''
              }
              {post.frontmatter.description
                ? <>&nbsp;&nbsp;|&nbsp;&nbsp;{post.frontmatter.description}</>
                : ``
              }
            </div>
            <a className="u-url" href={post.fields.slug}>Published <time className="dt-published">{wmDate.frontmatter.date}</time></a>
            <link rel="author" href="https://brycewray.com" />
          </article>
        </footer>
      </LayoutSinglePost>
  </>
  )
}

export default singlePostTemplate
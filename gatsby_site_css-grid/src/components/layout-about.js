import React from "react"
import PropTypes from "prop-types"
import Header from "./header"
import SEO from "./seo"

const AboutLayout = ({ children }) => {
  return (
    <>
      <SEO />
      <Header />
      <main>{children}</main>
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
              The obligatory About Me page&nbsp;&nbsp;|&nbsp;&nbsp;Not a bio (you’d fall asleep), but just a few explanatory observations.
            </div>
            <a className="u-url" href="/">Published <time className="dt-published">2018-09-14T20:00:00.000Z</time></a>
            <link rel="author" href="https://brycewray.com" />
          </article>
        </footer>
    </>
  )
}

AboutLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AboutLayout

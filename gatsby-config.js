/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Gartsby`,
    description: `[G] [A.] [T] [S] [B] [Y]`,
    author: `@erikdstock`,
  },
  /* Your site config here */
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-styled-components`,
    // {
    //   resolve: "gatsby-source-graphql",
    //   options: {
    //     // Url to query from
    //     url: process.env.GATSBY_METAPHYSICS_URL,
    //     // This type will contain remote schema Query type
    //     typeName: "ARTSY",
    //     // This is field under which it's accessible
    //     fieldName: "metaphysics",
    //   },
    // },
  ],
}

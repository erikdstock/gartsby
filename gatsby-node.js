const { introspectionQuery, graphql, printSchema } = require("gatsby/graphql")
const write = require("write")
const path = require("path")

exports.createPages = async ({ actions: { createPage }, graphql }) => {
  const result = await graphql(`
    query GetSalesQuery {
      metaphysics {
        sales(is_auction: true, live: true, sort: CREATED_AT_ASC, size: 100) {
          live_start_at
          gravityID
          id
          name
          is_live_open
          end_at
          is_closed
          cover_image {
            url
          }
        }
      }
    }
  `).then(res => res.data)
  console.log("got some sales: ", JSON.stringify(result, null, 2))
}

// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/account/)) {
    // Now matching /account/foo/bar/etc
    page.matchPath = "/account/*"

    // Update the page.
    createPage(page)
  }
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
  })
}
/**
 * Generate GraphQL schema.json file to be read by tslint
 * Thanks: https://gist.github.com/kkemple/6169e8dc16369b7c01ad7408fc7917a9 (via @damassi)
 */
exports.onPostBootstrap = async ({ store }) => {
  try {
    const { schema } = store.getState()
    const jsonSchema = await graphql(schema, introspectionQuery)
    const sdlSchema = printSchema(schema)

    write.sync("schema.json", JSON.stringify(jsonSchema.data), {})
    write.sync("schema.graphql", sdlSchema, {})

    console.log("\n\n[gatsby-plugin-extract-schema] Wrote schema\n") // eslint-disable-line
  } catch (error) {
    console.error(
      "\n\n[gatsby-plugin-extract-schema] Failed to write schema: ",
      error,
      "\n"
    )
  }
}

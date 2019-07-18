import React from "react"
import Layout from "components/Layout"
import { graphql } from "gatsby"

export default ({ data }) => {
  return (
    <Layout>
      Auctions
      <br />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Layout>
  )
}

// `graphql` queries on pages execute at build time only
export const pageQuery = graphql`
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
`

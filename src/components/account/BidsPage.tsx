import React, { useState } from "react"

import * as gravity from "utils/gravity"
import { Sans, Box, Serif, Separator, BorderBox, Flex } from "@artsy/palette"
import { RouteComponent, DebugData } from "pages/account"

const DEBUG = true

const last4 = (s: string) => {
  const length = s.length
  return s.slice(length - 5, length)
}

export const BidsPage: RouteComponent = () => {
  const [bids, setBids] = useState<any[] | null>(null)
  if (!bids) {
    gravity.meBidderPositions().then(data => setBids(data))
    return <pre>fetching ...</pre>
  } else {
    const activeBids = bids.filter(b => b.active)
    const totalOnTheTable = activeBids.reduce((prev, current) => {
      return prev + current.max_bid_amount_cents
    }, 0)

    return (
      <>
        <Serif size="6">
          You currently have {totalOnTheTable / 100}* on the table.
        </Serif>
        <Separator my={2} />
        <Box>
          <Sans size="6">Active Bids</Sans>
          {activeBids.map(b => (
            <BorderBox key={b.id}>
              <Flex justifyContent="space-between">
                <Sans mx={2} flex="1" size="3" color="black60">
                  Lot ID ending in {last4(b.sale_artwork_id)}
                </Sans>
                <Sans mx={2} size="4">
                  Current Bid: {b.highest_bid.display_amount_dollars}
                </Sans>
                <Sans mx={2} size="4">
                  Max Cents: {b.max_bid_amount_cents}
                </Sans>
              </Flex>
            </BorderBox>
          ))}
        </Box>
        <Separator />

        <Sans size="2">* Currencies may vary across bids</Sans>
        <DebugData debug={DEBUG} data={bids} />
      </>
    )
  }
}

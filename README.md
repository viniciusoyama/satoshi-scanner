This is a library with and an API ENDPOINT to fetch rare satoshis ranges from a bitcoin public address. 

# Setup

## Btc node / Ordinals server

- Follow this guide https://docs.ordinals.com/guides/inscriptions.html to install a btc full node and ordinals application
- start btc node with jrpc server. Don't forget to turn on txindex so you can getutxos from any wallet
- start ord server with API and satoshi indexing enabled: `ord --rpc-url http://127.0.0.1:18443 --index-sats server --enable-json-api --http --http-port 80 --address 0.0.0.0`

## Project setup

- Copy `.env.sample` to `.env` and change the variables accordingly
- Run `npm install`
- Run `npm run dev`

# Usage

## Using api

`curl http://localhost:3001/?address=BTCPUBLICADDRESSS`

It just returns the data array from `findRareSatoshis` method described below.findRareSatoshis

## Using library

```javascript

import { findRareSatoshis } from './satoshi_scanner.js'


findRareSatoshis(req.query.address).then(data => {
  //...
});

```

`findRareSatoshis` returns an array with utxos, satoshi ranges and rare satoshi ranges. Example:

```json
[
  { ... }, 
  { ... }, 
  {
    "txid":"6f66762fc7ab27a74b9a405e5d3cd12b7a713006d1cf30acafc061209d752a23",
    "vout":1,
    "satRanges":[["14918599692","14971599691"]],
    "rareSatsRanges": {
      "mythic":[],
      "legendary":[],
      "epic":[],
      "rare":[],
      "uncommon":[],
      "black":[],
      "alpha":[],
      "omega":[],
      "nakamoto":[],
      "palindrome":[["14918681941","14918681941"],["14918781941","14918781941"]]
      ,"pizza":[]
    }
  },
  { ... },
  { ... }
]
```
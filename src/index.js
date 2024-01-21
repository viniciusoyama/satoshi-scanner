import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import { findRareSatoshis } from './satoshi_scanner.js'

const app = express()

app.use(cors());
const port = 3001

app.get('/', (req, res) => {

  if(!req.query.address)
    return res.send("Missing 'address' parameter on querystring")

  findRareSatoshis(req.query.address).then(data => {
    res.send(data)
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

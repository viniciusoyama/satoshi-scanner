import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import { findSatoshiRanges } from './satoshi_scanner.js'

const app = express()

app.use(cors());
const port = 3001

app.get('/', (req, res) => {
  findSatoshiRanges(req.query.address).then(data => {
    res.send({
        message: data
    })
  });
})

let count = 0;
app.get('/dumy', (req, res) => {
    res.send({
    message: `Dummy Endpoint ${count++}`
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

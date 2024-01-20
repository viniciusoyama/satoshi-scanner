import BitcoinClient from './bitcoin_client.js'
import OrdinalsClient from './ordinals_client.js'
import extractRareSatsRanges from './rare-sats/index.js'

export async function findSatoshiRanges(addr) {
  const UTXOs = await BitcoinClient.scanUTXOSet(addr);
  
  return Promise.all(UTXOs.result.unspents.map(async ({ txid, vout }) => {
    const data = { txid, vout };
    const outputInfo = await OrdinalsClient.getOutputInfo(txid, vout)
    data.satRanges = outputInfo.sat_ranges
    return data
  }))
}


export async function findRareSatoshis(addr) {
  let transactionsData = await findSatoshiRanges(addr)

  for (let txData of transactionsData) {
    txData.rareSatsRanges = extractRareSatsRanges(txData.satRanges)
  }

  return transactionsData;
}
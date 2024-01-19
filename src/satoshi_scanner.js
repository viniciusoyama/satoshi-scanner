import BitcoinClient from './bitcoin_client.js'

export function findSatoshis(addr) {
  return BitcoinClient.scanUTXOSet(addr);
}

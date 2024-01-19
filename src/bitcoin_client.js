export default class BitcoinClient {

  static IP = process.env.BITCOIN_RPC_IP;
  static PORT = process.env.BITCOIN_RPC_PORT;
  static USER = process.env.BITCOIN_RPC_USER;
  static PASS = process.env.BITCOIN_RPC_PASSWORD;
  static ENDPOINT_URL = `http://${this.IP}:${this.PORT}/`

  static getblockchaininfo() {
    const dataString = `{"jsonrpc":"1.0","id":"call","method":"getblockchaininfo","params":[]}`;
    var headers = new Headers({
      'Authorization': `Basic ${btoa(this.USER + ':' + this.PASS)}`,
       "Content-Type": "text/plain"
    });


    return fetch(this.ENDPOINT_URL, {
      method: "post",
      body: dataString,
      headers: headers,
    }).then(response => response.json())
    .then(data => {
      console.log(data);
    });
  }

  static scanUTXOSet(addr) {
    const dataString = JSON.stringify({
      "jsonrpc":"1.0",
      "id":"call",
      "method":"scantxoutset",
      "params":['start', [`addr(${addr})`]]
    });

    var headers = new Headers({
      'Authorization': `Basic ${btoa(this.USER + ':' + this.PASS)}`,
       "Content-Type": "text/plain"
    });


    return fetch(this.ENDPOINT_URL, {
      method: "post",
      body: dataString,
      headers: headers,
    }).then(response => response.json())
  }
}

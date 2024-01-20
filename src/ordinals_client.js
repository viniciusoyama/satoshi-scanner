import JSONbig from 'json-bigint';
const JSONbigNative = JSONbig({ useNativeBigInt: true, alwaysParseAsBig: true });

// fix 
// TypeError: Do not know how to serialize a BigInt
BigInt.prototype.toJSON = function() { return this.toString() }


export default class OrdinalsClient {
  static ENDPOINT_URL = process.env.ORDINALS_API_URL.replace(/\/$/, "");
  
  static getOutputInfo(txId, vout) {
    const url = `${this.ENDPOINT_URL}/output/${txId}:${vout}`;

    return fetch(url, {
      method: "GET",
      headers: { "Accept": "application/json" }
    }).then(response => response.text())
    .then(text => JSONbigNative.parse(text));
  }

}

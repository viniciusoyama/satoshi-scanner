export default class OrdinalsClient {
  static ENDPOINT_URL = process.env.ORDINALS_API_URL.replace(/\/$/, "");
  
  static getOutputInfo(txId, vout) {
    const url = `${this.ENDPOINT_URL}/output/${txId}:${vout}`;

    return fetch(url, {
      method: "GET",
      headers: { "Accept": "application/json" }
    }).then(response => response.json());
  }

}

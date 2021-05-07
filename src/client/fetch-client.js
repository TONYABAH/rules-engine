import { NetworkError } from "../core/custom-errors"
import ErrorKeys from '../core/error-keys'
import { translateKey } from '../core/translate'

export default class FetchClient {
  constructor (language) {
    this.language = language
  }
  
  raiseNetworkError (response) {
    const message = translateKey(ErrorKeys.ScriptError, this.language)
    throw new NetworkError(message, ErrorKeys.NetworkError, response.status)
  }
  async getToken (url, apiKey) {
    const myHeaders = new Headers({
      'Content-Type': 'application/json',
      'X-API-KEY': apiKey
    });
    const myRequest = new Request(url, {
      method: 'GET',
      headers: myHeaders,
      mode: 'cors',
      cache: 'no-cache',
    });

    const resp = await fetch(myRequest).then(response => {
      if (!response.ok) {
        this.raiseNetworkError(response)
      }
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        this.raiseNetworkError(response)
      }
      return response.json();
    })
    return resp
  }

  async getEngine (url, token) {
    const myHeaders = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ token
    })
    const myRequest = new Request(url, {
      method: 'GET',
      headers: myHeaders,
      mode: 'cors',
      cache: 'no-cache',
    })

    return await fetch(myRequest).then(response => {
      if (!response.ok) {
        this.raiseNetworkError(response)
      }
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        // throw new TypeError("Response does not have a valid JSON")
        this.raiseNetworkError(response)
      }
      return response.json();
    })
  }

  async postEngine (url, token, data = {}) {
    const myHeaders = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    })
    const myRequest = new Request(url, {
      method: 'POST',
      headers: myHeaders,
      mode: 'cors',
      cache: 'no-cache',
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
    return await fetch(myRequest).then(response => {
      if (!response.ok) {
        this.raiseNetworkError(response)
      }
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        // throw new TypeError("Response does not have a valid JSON")
        this.raiseNetworkError(response)
      }
      return response.json();
    })
  }
}


export default async function Ajax (url, { options }, headers = []) {

  var xhttp = new XMLHttpRequest()
  xhttp.open(options.method || 'GET', url, true)

  if (options.method === 'POST') {
    xhttp.setRequestHeader('Content-Type', options.contentType || 'application/json; charset=UTF-8')
  }
  headers.forEach(h => {
    xhttp.setRequestHeader(h[0], h[1])
  })

  return new Promise((resolve, reject) => {

    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status >= 200 && this.status < 400) {
          //success
          var data = this.responseText
          if (this.responseType === "json") {
            data = JSON.parse(this.responseText)
          }
          resolve(data)
        } else {
          //error
          reject({ status: this.status, message: this.responseText })
        }
      }
    }
    xhttp.send(options.data || null)
    xhttp = null
  })
}

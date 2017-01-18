const axios = require('axios')
const htmlToText = require('html-to-text')
const urls = require('./url.json')

const word = process.argv[2] || 'ha'

function scrap(url) {
  return axios.get(url).then(res => {
    const text = htmlToText.fromString(res.data)
    const total = text.split(word).length - 1

    console.log(`Jumlah kata "${word}" di ${url} = ${total}`)

    return total
  }).catch(err => console.error(err))
}

Promise
  .all(urls.map(url => scrap(url)))
  .then(total => {
    console.log('Total ditemukan: ' + total.reduce((a, b) => a + b, 0))
})

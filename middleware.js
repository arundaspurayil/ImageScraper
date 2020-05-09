const axios = require('axios')
const client = require('./redis')

async function cache(req, res, next) {
    let url = decodeURIComponent(req.params.url)
    const response = await axios.get(url)
    const headers = response.headers
    const lastModified = headers['last-modified']

    client.get(url, (error, value) => {
        if (error) throw error
        if (value) {
            const data = JSON.parse(value)
            console.log(data)
            if (data.lastModified === lastModified) {
                return res.json({ images: data.images })
            }
        }
        next()
    })
}

module.exports = cache

const axios = require('axios')
const client = require('./redis')

exports.getCachedImages = function (req, res, next) {
    let url = decodeURIComponent(req.params.url)
    client.get(url, (error, value) => {
        if (error) throw error
        if (value) {
            const data = JSON.parse(value)
            const images = data.images
            req.images = images
        }
        next()
    })
}

exports.cache = async function (req, res, next) {
    let url = decodeURIComponent(req.params.url)
    const response = await axios.get(url)
    const headers = response.headers
    const lastModified = headers['last-modified']

    client.get(url, (error, value) => {
        if (error) throw error
        if (value) {
            const data = JSON.parse(value)
            if (data.lastModified === lastModified) {
                return res.json({ images: data.images })
            }
        }
        req.lastModified = lastModified
        next()
    })
}

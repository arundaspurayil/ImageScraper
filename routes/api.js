const express = require('express')
const router = express.Router()
const fs = require('fs')
const axios = require('axios')
const client = require('../redis')
const middleware = require('../middleware')
const getAllImages = require('../services/ImageScraper')
const downloadImages = require('../services/ImageDownloader')

router.get('/download/:url', middleware.getCachedImages, async (req, res) => {
    req.setTimeout(0)
    let images = req.images

    let output = fs.createWriteStream(__dirname + '/example.zip')
    downloadImages(output, images)
    output.on('close', function () {
        res.download(__dirname + '/example.zip')
    })
})

router.get('/scrape/:url', middleware.cache, async (req, res) => {
    req.setTimeout(0)
    const url = decodeURIComponent(req.params.url)

    const response = await axios.get(url)
    const headers = response.headers
    const lastModified = headers['last-modified']

    const links = await getAllImages(url)

    const images = { images: links }

    client.set(url, JSON.stringify({ ...images, lastModified: lastModified }))

    res.json(images)
})

module.exports = router

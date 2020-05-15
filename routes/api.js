const express = require('express')
const router = express.Router()
const fs = require('fs')
const axios = require('axios')
let Queue = require('bull')

const middleware = require('../middleware')
const getAllImages = require('../services/ImageScraper')
const downloadImages = require('../services/ImageDownloader')

let REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379'
const scraperQueue = new Queue('scraper', REDIS_URL)

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
    const url = decodeURIComponent(req.params.url)
    let job = await scraperQueue.add({ url: url })
    const jobId = { id: job.id }
    res.json(jobId)
})

//Cache images
scraperQueue.on('global:completed', async (jobId) => {
    const job = await scraperQueue.getJob(jobId)
    const { url } = job.data
    const images = job.returnvalue

    const response = await axios.get(url)
    const headers = response.headers
    const lastModified = headers['last-modified']

    client.set(
        url,
        JSON.stringify({ ...images, lastModified: lastModified }),
        'EX',
        60 * 60 * 24
    )
})
module.exports = router

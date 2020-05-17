const express = require('express')
const router = express.Router()
const axios = require('axios')
let Queue = require('bull')

const middleware = require('../middleware')
const getAllImages = require('../services/ImageScraper')
const downloadImages = require('../services/ImageDownloader')

const client = require('../redis')
const opts = require('../worker_redis')
const scraperQueue = new Queue('scraper', opts)
const downloadQueue = new Queue('download', opts)

router.get('/download/:url', middleware.getCachedImages, async (req, res) => {
    let images = req.images
    let job = await downloadQueue.add({ images: images })
    const jobId = { id: job.id }
    res.json(jobId)
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

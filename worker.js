let throng = require('throng')
let Queue = require('bull')

let REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379'

const getAllImages = require('./services/ImageScraper')

let workers = process.env.WEB_CONCURRENCY || 1

let maxJobsPerWorker = 50

function start() {
    let scraperQueue = new Queue('scraper', REDIS_URL)

    scraperQueue.process(maxJobsPerWorker, async (job) => {
        const url = job.data.url
        const links = await getAllImages(url)
        return { images: links }
    })
}

throng({ workers, start })

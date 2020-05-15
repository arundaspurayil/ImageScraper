let throng = require('throng')
let Queue = require('bull')

const opts = require('./worker_redis')

const getAllImages = require('./services/ImageScraper')

let workers = process.env.WEB_CONCURRENCY || 1

let maxJobsPerWorker = 50

function start() {
    let scraperQueue = new Queue('scraper', opts)

    scraperQueue.process(maxJobsPerWorker, async (job) => {
        const url = job.data.url
        const links = await getAllImages(url)
        return { images: links }
    })
}

throng({ workers, start })

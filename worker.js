let throng = require('throng')
let Queue = require('bull')

const opts = require('./worker_redis')

const getAllImages = require('./services/ImageScraper')
const downloadImages = require('./services/ImageDownloader')
const upload = require('./services/UploadToS3')

let workers = process.env.WEB_CONCURRENCY || 1

let maxJobsPerWorker = 50

function start() {
    let scraperQueue = new Queue('scraper', opts)
    let downloadQueue = new Queue('download', opts)

    scraperQueue.process(maxJobsPerWorker, async (job) => {
        const url = job.data.url
        const links = await getAllImages(url)
        return { images: links }
    })

    downloadQueue.process(maxJobsPerWorker, async (job) => {
        const images = job.data.images
        const zipPath = await downloadImages(images)
        const awsUrl = await upload(zipPath)

        return { downloadUrl: awsUrl }
    })
}

throng({ workers, start })

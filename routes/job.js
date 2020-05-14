const express = require('express')
const router = express.Router()

let Queue = require('bull')
let REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379'

router.get('/:id', async (req, res) => {
    let scraperQueue = new Queue('scraper', REDIS_URL)

    const id = req.params.id
    let job = await scraperQueue.getJob(id)
    if (job === null) {
        res.status(404).end()
    } else {
        let state = await job.getState()
        const data = { test: 'hey' }

        if (job.returnvalue) {
            let { images } = job.returnvalue
            res.json(data)
        } else {
            res.json(data)
        }
    }
})

module.exports = router

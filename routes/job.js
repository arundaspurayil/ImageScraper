const express = require('express')
const router = express.Router()

let Queue = require('bull')
const opts = require('../worker_redis')

router.get('/:id', async (req, res) => {
    let scraperQueue = new Queue('scraper', opts)
    const id = req.params.id
    let job = await scraperQueue.getJob(id)

    if (job === null) {
        return res.status(404).end()
    }

    let state = await job.getState()
    if (job.returnvalue) {
        let { images } = job.returnvalue
        res.json({ state: state, images: images })
    } else {
        res.json({ state: state })
    }
})

module.exports = router

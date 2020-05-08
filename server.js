require('dotenv').config()
const express = require('express')
const app = express()
const fs = require('fs')
const archiver = require('archiver')
const ImageScraper = require('./services/ImageScraper')

const redis = require('redis')
//Sets values for clinet to connect to the Redis database
const client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD,
})

//client connects to database
client.on('connect', function () {
    console.log('Connected to Redis')
})

//If theres an error connection then exit the process
client.on('error', function (err) {
    console.error('Redis server error: ' + err.code)
    process.exit(1)
})

function cache(req, res, next) {
    let url = decodeURIComponent(req.params.url)
    console.log(req.params)

    client.get(url.toString(), (error, value) => {
        if (error) throw error
        if (value) {
            const images = JSON.parse(value)
            res.json({ images: images })
        } else {
            next()
        }
    })
}

let images = [
    'https://www.mac-photography.com/wp-content/uploads/2018/10/maternity.jpg',
    'https://www.mac-photography.com/wp-content/uploads/2019/03/IMG_3228.jpg',
    'https://www.mac-photography.com/wp-content/uploads/2018/10/pregnancy_pics.jpg',
]

app.get('/api/download/', async (req, res) => {
    let output = fs.createWriteStream(__dirname + '/example.zip')
    ImageScraper.downloadImages(output, images)
    output.on('close', function () {
        res.download(__dirname + '/example.zip')
    })
})

app.get('/api/scrape/:url', cache, async (req, res) => {
    req.setTimeout(0)
    const url = decodeURIComponent(req.params.url)

    console.log(url)
    const links = await ImageScraper.getAllImages(url)

    const images = { images: links }

    client.set(url, JSON.stringify(links))

    res.json(images)
})

const port = process.env.PORT || '5000'
app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
})

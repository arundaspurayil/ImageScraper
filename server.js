require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const apiRouter = require('./routes/api')

const PORT = process.env.PORT || '5000'

app.use('/api', apiRouter)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client', 'build')))
    app.get('/*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(PORT, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${PORT}`)
})

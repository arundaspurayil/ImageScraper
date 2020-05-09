require('dotenv').config()
const express = require('express')
const app = express()
const apiRouter = require('./routes/api')

app.use('/api', apiRouter)

const port = process.env.PORT || '5000'
app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
})

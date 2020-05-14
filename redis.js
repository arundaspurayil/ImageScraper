const redis = require('redis')
//Sets values for clinet to connect to the Redis database
const client = redis.createClient({
    host: process.env.REDIS_LAB_HOST,
    port: process.env.REDIS_LAB_PORT || 6379,
    password: process.env.REDIS_LAB_PASSWORD,
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

module.exports = client

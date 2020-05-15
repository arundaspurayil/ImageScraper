const Redis = require('ioredis')

const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379'

let client = new Redis(REDIS_URL)
let subscriber = new Redis(REDIS_URL)

const opts = {
    createClient: function (type) {
        switch (type) {
            case 'client':
                return client
            case 'subscriber':
                return subscriber
            case 'bclient':
                return new Redis(REDIS_URL)
            default:
                throw new Error('Unexpected connection type: ', type)
        }
    },
}

module.exports = opts

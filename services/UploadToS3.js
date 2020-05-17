const AWS = require('aws-sdk')
const s3 = new AWS.S3()
const fs = require('fs')

async function upload(zipPath) {
    return new Promise((resolve, reject) => {
        const fileName = zipPath.split('/').pop()
        fs.readFile(zipPath, function (err, data) {
            if (err) reject(err)
            const params = {
                Bucket: 'imagescraperzips',
                Key: fileName,
                Body: data,
            }

            s3.upload(params, function (err, data) {
                if (err) console.log('ERROR MSG: ', err)
                resolve(`https://imagescraperzips.s3.amazonaws.com/${fileName}`)
            })
        })
    })
}

module.exports = upload

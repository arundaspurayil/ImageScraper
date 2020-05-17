const axios = require('axios')
const archiver = require('archiver')
const fs = require('fs')

async function downloadImages(images) {
    return new Promise(async (resolve, reject) => {
        let output = fs.createWriteStream(__dirname + '/example.zip')

        let archive = archiver('zip', {
            zlib: { level: 9 }, // Sets the compression level.
        })

        output.on('end', function () {
            console.log('Data has been drained')
        })
        archive.on('warning', function (err) {
            if (err.code === 'ENOENT') {
                console.log(err)
            } else {
                // throw error
                reject(err)
            }
        })

        archive.on('error', function (err) {
            reject(err)
        })

        archive.pipe(output)
        while (images.length > 0) {
            let image = images.pop()
            const fileName = image.split('/').pop()
            const response = await axios.get(image, {
                validateStatus: false,
                responseType: 'arraybuffer',
            })
            if (response.status == 200) {
                const buffer = Buffer.from(response.data, 'utf-8')
                archive.append(buffer, { name: fileName })
            }
        }

        archive.finalize()

        output.on('close', function () {
            resolve(__dirname + '/example.zip')
        })
    })
}

module.exports = downloadImages

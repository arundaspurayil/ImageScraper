const axios = require('axios')
const archiver = require('archiver')

async function downloadImages(output, images) {
    let archive = archiver('zip', {
        zlib: { level: 9 }, // Sets the compression level.
    })

    output.on('end', function () {
        console.log('Data has been drained')
    })
    archive.on('warning', function (err) {
        if (err.code === 'ENOENT') {
            // log warning
        } else {
            // throw error
            throw err
        }
    })

    // good practice to catch this error explicitly
    archive.on('error', function (err) {
        throw err
    })

    archive.pipe(output)
    while (images.length > 0) {
        let image = images.pop()
        console.log(image)
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
}

module.exports = downloadImages

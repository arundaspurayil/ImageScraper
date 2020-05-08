const puppeteer = require('puppeteer')
const parseurl = require('url')
const axios = require('axios')
const archiver = require('archiver')

async function getLinksFromPage(page, url) {
    //Retrieves all links on the page
    let hrefs = await page.$$eval('a', (as) => as.map((a) => a.href.trim()))
    //Filters URLs that are apart of the same domain as provided URL
    const domainName = parseurl.parse(url).hostname
    let domainLinks = hrefs.filter((href, index) => {
        let unique = hrefs.indexOf(href) == index
        let correctHost = href.includes(domainName)
        return unique && correctHost
    })
    await visitSubPages(page, domainLinks)
}

async function visitSubPages(page, links) {
    let visitedUrls = []

    while (links.length > 0) {
        let url = links.pop()
        console.log(links.length)
        if (!visitedUrls.includes(url)) {
            await page.goto(url, {
                waitUntil: 'domcontentloaded',
            })
            visitedUrls.push(url)
        }
    }
}

exports.getAllImages = async function (url) {
    let images = []

    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.setRequestInterception(true)
    page.on('request', (request) => {
        if (request.resourceType() === 'image') images.push(request.url())

        request.continue()
    })
    await page.goto(url, {
        waitUntil: 'domcontentloaded',
    })
    await getLinksFromPage(page, url)
    await browser.close()

    return images
}

exports.downloadImages = async function (output, images) {
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
        const fileName = image.split('/').pop()
        const response = await axios.get(image, { responseType: 'arraybuffer' })
        const buffer = Buffer.from(response.data, 'utf-8')
        archive.append(buffer, { name: fileName })
    }

    archive.finalize()
}

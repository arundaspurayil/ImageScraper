const puppeteer = require('puppeteer')
const parseurl = require('url')

async function getLinksFromPage(page, url) {
    //Retrieves all links on the page
    let hrefs = await page.$$eval('a', (as) => as.map((a) => a.href.trim()))
    //Filters URLs that are apart of the same domain as provided URL
    const domainName = parseurl.parse(url).hostname
    let domainLinks = hrefs.filter((href, index) => {
        let unique = hrefs.indexOf(href) == index
        let correctHost = href.includes(domainName)
        let isPDF = !href.split('/').pop().includes('.pdf')

        return unique && correctHost && isPDF
    })
    await visitSubPages(page, domainLinks)
}

async function visitSubPages(page, links) {
    let visitedUrls = []

    while (links.length > 0) {
        let url = links.pop()
        if (!visitedUrls.includes(url)) {
            await page.goto(url, {
                waitUntil: 'domcontentloaded',
            })
            visitedUrls.push(url)
        }
    }
}

async function getAllImages(url) {
    let images = []

    /*
{
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    }
    */
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.setRequestInterception(true)
    page.on('request', (request) => {
        let reqUrl = request.url()
        if (
            reqUrl.endsWith('.png') ||
            reqUrl.endsWith('.jpg') ||
            reqUrl.endsWith('.gif') ||
            reqUrl.endsWith('.svg')
        ) {
            images.push(request.url())
        }

        request.continue()
    })
    await page.goto(url, {
        waitUntil: 'domcontentloaded',
    })

    await getLinksFromPage(page, url)
    await browser.close()

    return images
}

module.exports = getAllImages

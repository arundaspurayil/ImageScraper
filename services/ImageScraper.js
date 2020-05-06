const puppeteer = require('puppeteer');

async function getLinksFromPage(page, url){
    //Retrieves all links on the page
    let hrefs = await page.$$eval('a', as => as.map(a => a.href))
    //Filters URLs that are apart of the same domain as provided URL
    const domainLinks = hrefs.filter(href => href.includes(url))
    return domainLinks
}

exports.getAllImages = async function(url){
    const images = []
    let links = []

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url)

    let hrefs = await getLinksFromPage(page, url)
    links = links.concat(hrefs)

    await browser.close();

    return links
}
const { response } = require('express');
const puppeteer = require('puppeteer');

exports.crawlTicket = async (ticketId) => {

    const api_url = `https://sports-mts-api.gb.nsoftcdn.com/ticketCode.php/prematch/getTicketCode?cpvUuid=bfc724e7-fd98-4226-a61e-cef6072f0d8e&locale=en&webCode=${ticketId}`
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: false,
        args: [ '--no-sandbox' ]
    });
    
    const page = await browser.newPage();
    await page.goto(api_url);

    const data = await page.evaluate(()=> {
        return JSON.parse(document.querySelector("body").innerText)
    })

    const outcomes = data;
    console.log(outcomes);

    await browser.close();
    return outcomes;
};

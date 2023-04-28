const { response } = require('express');
const puppeteer = require('puppeteer');

exports.crawlTicket = async (ticketId) => {

    const api_url = `https://www.merrybet.com/rest/betting/anyslip/${ticketId}`
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

    const outcomes = data.data;
    const games = outcomes.outcomes;
    const totalGames = games.length;
    console.log(outcomes);

    await browser.close();
    return outcomes;
};

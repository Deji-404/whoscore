const puppeteer = require('puppeteer');

exports.crawlTicket = async (ticketId) => {

    //const ticketId = 'U1F502008';
    const api_url = `https://www.betway.com.ng/BookABet/internal/GetClientSideBetslipForBookingCode?bookingCode=${ticketId}`
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

    console.log(data)

    await browser.close();
    return(data);


};
const puppeteer = require('puppeteer');

(async () => {

    const ticketId = 'EC0689771';
    const api_url = `https://www.sportybet.com/api/ng/orders/share/${ticketId}`
    const browser = await puppeteer.launch({headless: false});
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

})();
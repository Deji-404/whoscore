const { response } = require('express');
const puppeteer = require('puppeteer');

exports.crawlTicket = async (ticketId) => { 

    //ticketId = 'K5NB2';
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: false,
        args: [ '--no-sandbox' ]
    });
    const page = await browser.newPage();
    await page.goto('https://www.betking.com/sports/s');

    const bookingCodeTextbox = await page.$('div input[placeholder="Booking Code..."]');
    let loadBtn;
    loadBtn = await page.$('#btnLoadBookedCoupon');

    try {
        
        const btnText = await page.evaluate((el)=> el.textContent, loadBtn);

        await bookingCodeTextbox.type(ticketId);
        await loadBtn.click();
        await page.waitForSelector('#couponContent');

    } 
    catch(e) {

        console.log(e);
    }

    const totalsDivs = await page.$$('div.tblCouponTotals div.totals-container');
    const couponContent = await page.$('#couponContent');
    let totalGames = await page.waitForSelector('.selections-counter');
    totalGames = await totalGames.evaluate(el=>el.textContent);
    let totalStake = await page.$eval('div input[id="txtAmount"]', (el)=> el.value);
    
    let totalContainer = await page.$('.totals-container');
    let totalDivs = await totalContainer.$$eval('div', el=> el[1].textContent);
    const potentialOdds = Number(totalDivs.replace(/\D/g, ''))/100;

    const potentialWin = parseFloat(potentialOdds * totalStake).toFixed(2);
    /** 
    let potentialWin = await couponContent.$('.coupon-potential-winning');
    potentialWin = await potentialWin.evaluate(s=>s.textContent);
    potentialWin = potentialWin.replace(/\D/g, '');
    potentialWin = Number(potentialWin)/100;
    
    //const totalWins = await betList.$eval('div.m-lay-left i.m-icon-check--checked', (e) => e.innerText);
    **/

    const result = [
        ticketId,
        totalGames,
        potentialOdds,
        potentialWin,
        totalStake
    ]

    //console.log(result)
    await browser.close();
    return result;

};
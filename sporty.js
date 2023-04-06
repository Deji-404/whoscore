const { response } = require('express');
const puppeteer = require('puppeteer');

(async () => { 

    const ticketId = 'FF1C8941';
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://www.sportybet.com/ng/');

    const bookingCodeTextbox = await page.$('div input[placeholder="Booking Code"]');
    let loadBtn;
    sliploadBtns = await page.$$('div button');
    let betslipDiv

    for (const btn of sliploadBtns) {

        let btnText = await page.evaluate(el => el.textContent, btn);
        btnText = btnText.replace(/\s/g, '');
        console.log(btnText);

        if (btnText === "Load") {

            loadBtn = btn;

            try {
                await bookingCodeTextbox.type(ticketId);
                await loadBtn.click();

                betslipDiv = await page.waitForSelector('#j_betslip');
                
            }
            catch (e) {
                console.log(e)
            }
        }
    }

    let totalBets = await betslipDiv.$$('div.m-tabs-tab span');

    let totalStake = await betslipDiv.$$eval('.m-betslips .m-stake .m-money-wrapper .m-value', el => el[1].textContent);

    for (const div of totalBets) {

        const divText = await div.evaluate( el => el.textContent);
        console.log(divText)
    }

    let potentialOdds = await betslipDiv.$$eval('.m-betslips .m-stake .m-money-wrapper div', el => el[1].textContent)

    console.log(totalStake);

    
     /** 
    try {
        
        const btnText = await page.evaluate((el)=> el.textContent, loadBtn);

        await bookingCodeTextbox.type(ticketId);
        await page.screenshot({path: 'before.png'});
        await loadBtn.click();
        await page.waitForSelector('#couponContent');
        await page.screenshot({path: 'after.png'});

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
     
    let potentialWin = await couponContent.$('.coupon-potential-winning');
    potentialWin = await potentialWin.evaluate(s=>s.textContent);
    potentialWin = potentialWin.replace(/\D/g, '');
    potentialWin = Number(potentialWin)/100;
    
    //const totalWins = await betList.$eval('div.m-lay-left i.m-icon-check--checked', (e) => e.innerText);
    

    result = [
        ticketId,
        totalGames,
        potentialOdds,
        potentialWin,
        totalStake
    ]
**/
    //console.log(result)
    // await browser.close();

})();
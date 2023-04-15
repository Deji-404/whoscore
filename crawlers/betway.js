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

    /**
    for (const btn of sliploadBtns) {
        
        let btnText = await page.evaluate((el)=> el.textContent, btn);
        btnText = btnText.replace(/\s/g, '');
        console.log(btnText);
       
        if (btnText === "Load") {

            try {
    
                await ticketInput.type(ticketId);
                
                await btn.click();
                //await page.waitForSelector('.coupon-tab-selector__caption .has-tooltip');
                //console.log()
            } 
            catch(e) {

                console.log(e);
            }

        }
    }


    let totalBets = await page.$('.tab__container[data-v-76ab0dc1]');
    totalBets = await totalBets.$eval('span', el => el.textContent);

    let potentialOdds = await page.waitForSelector('.coupon-result-coef-value');
    potentialOdds = await potentialOdds.evaluate(el => el.textContent, '.column-box-num__value[data-v-4a7e3fa5]');

    let possibleWins = await page.$('.coupon-possible-win');
    possibleWins = await possibleWins.evaluate( el => el.textContent, '.column-box-num__value');
    console.log(possibleWins)
    
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

    console.log(result)
    // await browser.close();
    **/
};
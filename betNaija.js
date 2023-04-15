
const axios = require('axios');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
puppeteer.use(StealthPlugin());
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));
//const {newTicket, ticketConstants} = require('../TicketUtils');

exports.crawlTicket = async(platform, betId) => {
    let results = [];
    
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: false,
        args: [ '--no-sandbox' ]
    });
    const page = await browser.newPage();
    await page.goto('https://sports.bet9ja.com');
    await page.waitForSelector('.betslip__body .p20.txt-c .betslip__reservation-container.mt15');
    const bookingSlipTextBox = await page.$('div input[placeholder="Booking Number"]');
    const bettingSlipTextBox = await page.$('div input[placeholder="Bet ID"]');
    let bettingSlipBtn = '';
    let bookingSlipBtn = '';
    let data = {};
    const slipSubmitBtns = await page.$$('div button');

    for (const btns of slipSubmitBtns) {
        try {
          buttonText = await page.evaluate(
            (el) => el.textContent,
            btns
          );

          if(buttonText === 'Check') {
              bettingSlipBtn = btns;
              await bettingSlipTextBox.type(betId);
              await bettingSlipBtn.click();  
              await page.waitForSelector('div.m-betslip-bar');
          }
        } catch (error) {}

    }

        //   const betSlipResultsDivs = await page.$$('div.mybets-item');
        await page.waitForSelector('div.mybets-row');
        const betSummaryDiv = await page.$('div.mybets-holder');
        const overallWon = (await betSummaryDiv.$('div.mybets-holder__info-item span.txt-green')) ? await betSummaryDiv.$eval('div.mybets-holder__info-item span.txt-green', (s) => s.textContent) : '';
        const overallLoss = (await betSummaryDiv.$('div.mybets-holder__info-row span.txt-red')) ? await betSummaryDiv.$eval('div.mybets-holder__info-item span.txt-red', (s) => s.textContent) : '';
        const gameDateTime = (await page.$('div.mybets-date span'))? await page.$eval('div.mybets-date span', (d) => d.textContent) : '';
        const totalGames = (await betSummaryDiv.$('div.mybets-bet.txt-cut')) ? ((await betSummaryDiv.$eval('div.mybets-bet.txt-cut', (s) => s.textContent)).split(',')) : '';
        const totalOdds = (await betSummaryDiv.$('div.mybets-holder__info-row div.mybets-holder__info-item')) ? await betSummaryDiv.$eval('div.mybets-holder__info-row>div.mybets-holder__info-item', (s) => s.textContent) : '';
        const totalStakes = (await betSummaryDiv.$$('div.mybets-holder__info-row div.mybets-holder__info-item')) ? await betSummaryDiv.$$eval('div.mybets-holder__info-row div.mybets-holder__info-item', (s) => s[1].textContent) : '';
        const ticketStatus = overallWon ? overallWon : overallLoss ? overallLoss : 'Pending'; 

        /***
        data = {
            ticket_number: betId,
            gameDateTime: gameDateTime,
            platform:platform,
            ticket_type: ticketConstants.ticketTypes.betting,
            ticketStatus: ticketStatus,
            totalStake: totalStakes,
            totalOdd: totalOdds
        }
        */
        // newTicket(data).then((ticket)=>{
            results.push({
                gameDateTime,
                betId,
                totalGames,
                totalOdds,
                totalStakes,
                ticketStatus
            });
        // });

        await browser.close();
        return results;
}

// exports.crawlTicket = async(platform, betId) => {
//     let results = [];
    
//     const browser = await puppeteer.launch({
//         headless: true,
//         defaultViewport: false,
//         args: [ '--no-sandbox' ]
//     });
//     const page = await browser.newPage();
//     await page.goto('https://sports.bet9ja.com');
//     await page.waitForSelector('div a.sports-toolbar__nav-link');
//     const options = await page.$$('a.sports-toolbar__nav-link');
//     await options[3].click();
//     const betSlipInput = await page.$('div.mt20 input[placeholder="BET ID"]');
//     await betSlipInput.type(betId);
//     const betSlipBtns = await page.$$('div.btn-primary-m');
//     await betSlipBtns[1].click();
//     console.log('Awaiting div.mybets-row');
//     await page.waitForSelector('div.mybets-row');
//     console.log('recieved selector, processing selector');
//     const betSlipResultsDivs = await page.$$('div.mybets-item');
//     const betSummaryDiv = await page.$('div.mybets-holder');
//     const overallWon = (await betSummaryDiv.$('div.mybets-holder__info-item span.txt-green')) ? await betSummaryDiv.$eval('div.mybets-holder__info-item span.txt-green', (s) => s.textContent) : '';
//     const overallLoss = (await betSummaryDiv.$('div.mybets-holder__info-row span.txt-red')) ? await betSummaryDiv.$eval('div.mybets-holder__info-item span.txt-red', (s) => s.textContent) : '';
//     // await page.setRequestInterception(true); // 
//     // await page.waitForTimeout(3000);
//     const gameDateTime = (await page.$('div.mybets-date span'))? await page.$eval('div.mybets-date span', (d) => d.textContent) : '';
//     const totalGames = (await betSummaryDiv.$('div.mybets-bet.txt-cut')) ? ((await betSummaryDiv.$eval('div.mybets-bet.txt-cut', (s) => s.textContent)).split(',')) : '';
//     const totalOdds = (await betSummaryDiv.$('div.mybets-holder__info-row div.mybets-holder__info-item')) ? await betSummaryDiv.$eval('div.mybets-holder__info-row>div.mybets-holder__info-item', (s) => s.textContent) : '';
//     const totalStakes = (await betSummaryDiv.$$('div.mybets-holder__info-row div.mybets-holder__info-item')) ? await betSummaryDiv.$$eval('div.mybets-holder__info-row div.mybets-holder__info-item', (s) => s[1].textContent) : '';
//     const ticketStatus = overallWon ? overallWon : overallLoss ? overallLoss : 'Pending'; 

//     const data = {
//         ticket_number: betId,
//         gameDateTime: gameDateTime,
//         platform:platform,
//         ticket_type: ticketConstants.ticketTypes.betting,
//         ticketStatus: ticketStatus,
//         totalStake: totalStakes,
//         totalOdd: totalOdds
//     }

//     newTicket(data).then((ticket)=>{
//         results.push({
//             gameDateTime,
//             betId,
//             totalGames,
//             totalOdds,
//             totalStakes,
//             ticketStatus
//         });
//     });

//     await browser.close();
//     return results;
// }
const puppeteer = require('puppeteer');

const crawlTicket = async() => {
    const ticketId = '3VQLRLH';
    let results = [];
    const api_url = `https://coupon.bet9ja.com/desktop/feapi/CouponAjax/GetBookABetCoupon?couponCode=${ticketId}`
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: false,
        args: [ '--no-sandbox' ]
    });
    
    const page = await browser.newPage();
    await page.goto(api_url);

    const data = await page.evaluate(()=> {
        return JSON.parse(document.querySelector("body").innerText)
    });

    const gameData = data.D;
    const games = [];
    const gameDateTime = gameData.DATE;
    const betPlatform = 'bet9ja';
    const totalStakes = gameData.STAKE;
    let totalGames = [];

    for(var i in gameData.O) {
        games.push([i, gameData.O[i]]);
    }

    for (const game of games) {

        let event = game[1];
        let gameTitle = event.E_NAME;
        let odd = event.V;
        let gCheck = event.M_NAME
        let league = event.GN
        let matchDate = event.STARTDATE
        totalGames.push(gameTitle)
        
        results.push({
            gameTitle: gameTitle,
            odd: odd,
            gCheck: gCheck,
            league: league,
            matchDate: matchDate
        })
        //console.log(gameTitle)
    }

    results.unshift({
        gameDateTime: gameDateTime,
        betId: ticketId,
        totalGames: totalGames,
        betPlatform: betPlatform,
        totalStakes: totalStakes,
    })

    console.log(results);

    await browser.close();
    return results;
}

crawlTicket()
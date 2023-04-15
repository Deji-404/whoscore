const puppeteer = require('puppeteer');

exports.crawlTicket = async (ticketId) => {

    //const ticketId = '3QFYV56';
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

    console.log(data.D);

    await browser.close();
    return data.D;
};
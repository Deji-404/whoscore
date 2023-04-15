const http = require('http');
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const betking = require('./betking');
const sporty = require('./crawlers/sporty');
const betway = require('./crawlers/betway');
const bet9ja = require('./crawlers/bet9ja');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static("express"));
app.use(helmet())

// default URL for website
app.get('/', function(req,res){
    res.sendFile(path.join(__dirname+'/express/index.html'));
    //__dirname : It will resolve to your project folder.
  });

app.post('/ticketId', async function(req,res){
    const ticketId = req.body.ticketId;
    const platform = req.body.platform;
    let result;

    switch (platform) {

      case "betking":
        
        result = await betking.crawlTicket(ticketId);
        break;

      case "sportybet": 

        result = await sporty.crawlTicket(ticketId);
        break

      case "betway":

        result = await betway.crawlTicket(ticketId);
        break;

      case "bet9ja":

        result = await bet9ja.crawlTicket(ticketId);
        break;
    
      default:
        break;

    }

    res.send(result);
    console.debug(platform);
    
})

const server = http.createServer(app);
const port = 3000;
server.listen(port);
console.debug('Server listening on port ' + port);
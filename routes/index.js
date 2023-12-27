var express = require('express');
var router = express.Router();
const axios = require('axios');

var data = {}
data.leverages = [10, 15, 20, 25]
data.symbols = [
  "AAVEVNDC",
  "ARBVNDC",
  "ATOMVNDC",
  "AVAXVNDC",
  "BADGERVNDC",
  "BCHVNDC",
  "BLURVNDC",
  "BNBVNDC",
  "BTCVNDC",
  "FXSVNDC",
  "QTUMVNDC",
  "RACA1000VNDC",
  "RIFVNDC",
  "SATS1000VNDC",
  "STORJVNDC",
  "STPTVNDC",
  "MOVRVNDC",
  "CRVVNDC",
  "EDUVNDC",
  "GRTVNDC",
  "POWRVNDC",
  "PYTHVNDC",
  "ETHUSDT",
  "HFTVNDC",
  "ALPHAVNDC",
  "ICPVNDC",
  "ACEVNDC",
  "SUPERVNDC",
  "RATS1000VNDC",
  "QIVNDC",
  "AUCTIONVNDC",
  "ARKMVNDC",
  "DENTVNDC",
  "KSMVNDC",
  "ACHVNDC",
  "BAKEVNDC",
  "CELOVNDC",
  "DODOVNDC",
  "GODSVNDC",
  "JTOVNDC",
  "KASVNDC",
  "LOOKSVNDC",
  "MAGICVNDC",
  "MINAVNDC",
  "NEOVNDC",
  "HIGHVNDC",
  "IOSTVNDC",
  "JOEVNDC",
  "LEVERVNDC",
  "LINKVNDC",
  "MAVVNDC",
  "MKRVNDC",
  "NMRVNDC",
  "LINAUSDT",
  "ETHWVNDC",
  "ONEVNDC",
  "XEMVNDC",
  "BNXVNDC",
  "COREVNDC",
  "EGLDVNDC",
  "ETHVNDC",
  "MBLVNDC",
  "MEMEVNDC",
  "NTRNVNDC",
  "OPVNDC",
  "ORDIVNDC",
  "POLYXVNDC",
  "COMPVNDC",
  "MDTVNDC",
  "OCEANVNDC",
  "OPUSDT",
  "ONUSVNDC",
  "PEPE1000VNDC",
  "PERPVNDC",
  "RDNTVNDC",
  "SHIB1000VNDC",
  "ROSEVNDC",
  "SANDVNDC",
  "SEIVNDC",
  "BONDVNDC",
  "GLMRVNDC",
  "ADAVNDC",
  "AERGOVNDC",
  "APTVNDC",
  "IOTAVNDC",
  "LUNC1000VNDC",
  "NKNVNDC",
  "RNDRVNDC",
  "SKLVNDC",
  "SLPVNDC",
  "SNTVNDC",
  "STARL1000VNDC",
  "STEEMVNDC",
  "STGVNDC",
  "FLOKI1000VNDC",
  "GALAVNDC",
  "ADAUSDT",
  "SOLUSDT",
  "HBARVNDC",
  "SPELLVNDC",
  "SSVVNDC",
  "STMXVNDC",
  "STXVNDC",
  "SUIVNDC",
  "AXSVNDC",
  "SNXVNDC",
  "CETUSVNDC",
  "ONGVNDC",
  "RAREVNDC",
  "STRAXVNDC",
  "SXPVNDC",
  "TIAVNDC",
  "TOKENVNDC",
  "TRBVNDC",
  "TRXVNDC",
  "TRUVNDC",
  "TWTVNDC",
  "USTCVNDC",
  "VICVNDC",
  "VINU1000000VNDC",
  "TVNDC",
  "UNFIVNDC",
  "WLDVNDC",
  "LINKUSDT",
  "LPTVNDC",
  "OGNVNDC",
  "PENDLEVNDC",
  "PEOPLEVNDC",
  "UNIVNDC",
  "WAVESVNDC",
  "ARPAVNDC",
  "BANDVNDC",
  "BIGTIMEVNDC",
  "BNBUSDT",
  "BSVVNDC",
  "DYDXVNDC",
  "GASVNDC",
  "CTKVNDC",
  "EOSVNDC",
  "ETCVNDC",
  "FTMVNDC",
  "DOTVNDC",
  "BONK1000VNDC",
  "ONSVNDC",
  "AMBVNDC",
  "APEVNDC",
  "ARKVNDC",
  "ATAVNDC",
  "AUDIOVNDC",
  "BLZVNDC",
  "BNTVNDC",
  "CEEKVNDC",
  "CELVNDC",
  "KAVAVNDC",
  "KNCVNDC",
  "CFXVNDC",
  "LITVNDC",
  "AGIXVNDC",
  "BELVNDC",
  "WAXPVNDC",
  "MNAIVNDC",
  "WOOVNDC",
  "XRPVNDC",
  "YFIVNDC",
  "CTSIVNDC",
  "BTCUSDT",
  "COTIVNDC",
  "ORBSVNDC",
  "PEPE1000USDT",
  "XRPUSDT",
  "SOLVNDC",
  "FILVNDC",
  "GTCVNDC",
  "HIFIVNDC",
  "IDVNDC",
  "SUSHIVNDC",
  "XLMVNDC",
  "ZILVNDC",
  "API3VNDC",
  "COMBOVNDC",
  "ARBUSDT",
  "ETCUSDT",
  "SHIB1000USDT",
  "LINAVNDC",
  "LOOMVNDC",
  "GMTVNDC",
  "HOOKVNDC",
  "ICXVNDC",
  "KEYVNDC",
  "LDOVNDC",
  "LQTYVNDC",
  "LTCVNDC",
  "MASKVNDC",
  "PHBVNDC",
  "RADVNDC",
  "RUNEVNDC",
  "1INCHVNDC",
  "AGLDVNDC",
  "C98VNDC",
  "CELRVNDC",
  "DOGEVNDC",
  "NEARVNDC",
  "CHZVNDC",
  "CYBERVNDC",
  "DOGEUSDT",
  "FRONTVNDC",
  "GMXVNDC",
  "MATICVNDC",
  "MTLVNDC",
  "FLMVNDC",
  "BICOVNDC",
  "CAKEVNDC",
  "FETVNDC",
  "IMXVNDC",
  "XVSVNDC",
  "YGGVNDC",
  "ZRXVNDC",
  "INJVNDC"
]
data.vols = [
  100000,
  200000,
  500000,
  1000000,
  1500000,
  2000000,
  2500000,
  3000000,
  3500000,
  4000000,
  4500000,
]

router.get('/', function(req, res, next) {
  res.render('index', { data });
});

router.post('/', async function(req, res, next) {
  data.side = String(req.body.side);
  data.symbol = String(req.body.symbol);
  data.leverage = Number(req.body.leverage);
  data.vol = Number(req.body.vol);
  data.token = String(req.body.token);

  try{
      const [request1, request2] = await Promise.all([
        axios.request({
          method: 'post',
          maxBodyLength: Infinity,
          url: 'https://api-pro.goonus.io/perpetual/v1/leverage',
          headers: { 
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer ' + data.token
          },
          data : JSON.stringify({
            "symbol": data.symbol,
            "leverage": data.leverage
          })
        })
        .then((response) => {
          return response.data;
        }),
        axios.request({
          method: 'get',
          maxBodyLength: Infinity,
          url: 'https://api-pro.goonus.io/perpetual/v1/ticker/24hr?symbol=' + data.symbol,
          headers: { 
            'Authorization': 'Bearer ' + data.token
          }
        })
        .then((response) => {
          return response.data;
        })
      ]);

      const lastPrice = Number(request2.lastPrice);
      const size = data.vol / lastPrice;
      const result = await axios.request({
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api-pro.goonus.io/perpetual/v1/order',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': 'Bearer ' + data.token
        },
        data : JSON.stringify({
          "symbol": data.symbol,
          "side": data.side,
          "type": "MARKET",
          "positionSide": "BOTH",
          "size": size,
          "clientOrderId": "42466c03-44f3-4960-9e52-40501d2edcb0",
          "userId": "42466c03-44f3-4960-9e52-40501d2edcb0",
          "postOnly": false,
          "workingType": "MARK_PRICE",
          "stopPrice": "0",
          "reduceOnly": false,
          "timeInForce": "GTC",
          "closePosition": false
        })
      });
      
      console.log(result.data);
      data.error = '';
      data.success = `${data.side} lệnh ${data.symbol} thành công!`;
  }
  catch(error){
      data.error = error.message;
      data.success = '';
  }

  return res.render('index', { data });
});

module.exports = router;
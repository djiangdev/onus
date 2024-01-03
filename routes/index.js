var express = require('express');
var router = express.Router();
var axios = require('axios');

const takeProfitPercent = 20; //%TP
const stopLossPercent = 50; //%SL

var data = {
  cookie: "NEXT_LOCALE=vi;_ga=GA1.1.400631048.1702754205;_ga_5L0R5TQX7E=GS1.1.1703587655.2.0.1703587734.0.0.0; _ga_B0X67FBFWY=GS1.1.1703593380.4.0.1703593389.0.0.0; __Host-next-auth.csrf-token=3ab5a2592856f9fc82c90d881f404221dd69afcab3cadeca6afffafe536d5d8f%7C6b0aab872d45a95803f3eb7102097b63d8dfab57510f85367937b8c5900ae0a0; __Secure-next-auth.callback-url=https%3A%2F%2Fpro.goonus.io; onuspro-user-id=42466c03-44f3-4960-9e52-40501d2edcb0; onuspro-user-onus-id=6277729717665175454; onuspro-access-token=eyJraWQiOiJNMTNRMHFyYU1sdDlVOXR1R015ZlJYOHlKdm5cL1VyXC9iaVh6VTlDRlR6SHM9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI0MjQ2NmMwMy00NGYzLTQ5NjAtOWU1Mi00MDUwMWQyZWRjYjAiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGhlYXN0LTEuYW1hem9uYXdzLmNvbVwvYXAtc291dGhlYXN0LTFfekhxTWxQUW16IiwiY2xpZW50X2lkIjoiNWRkMGppNWlzOHU4aXNvazhmM3J1NmtjdmIiLCJvcmlnaW5fanRpIjoiZjRiNmU3NzEtMmNiZi00NTRhLWIxOGYtMzJkN2RkMjBiZDkzIiwiZXZlbnRfaWQiOiI1OGIxN2NkOC1hOWVlLTRlNGYtYTA3Ni02MzdiMmE2NWFmN2EiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNzAzNDkwNDY0LCJleHAiOjE3MDM2NjU4ODAsImlhdCI6MTcwMzY2MjI4MSwianRpIjoiMWFjYmJiYmUtODI4NS00MjA0LTliNDctNTkwZGVlYTlkM2QzIiwidXNlcm5hbWUiOiI2Mjc3NzI5NzE3NjY1MTc1NDU0QG9udXNwcm8uZXhjaGFuZ2UifQ.Os12WiTIhhS4Cwug9LhOC4baROJNIpjpvPgfKVI2Ths5zx7oAjnw0hIhiCsjAx1BGpSNXIlQ2XMajPO9h3SkSIAxxxVEsv2xq1RnxB8gPetd5MuSEqn7lgFhRFDmHqTEh3ah2gckQlWvXFcObnQ9s_6M3pwsEs2cqbZNuBGrxeRulBSuUAJL3gZNP3hwy4RWaYumZI2ZCoBQ9UOlwMFkGaQq_n-wCvIB7jsvwdlKYLmiPL7UhWoPls3eXOlJf__ZFg862MXd25o7j8sPCfd6fuwUJDGsdnx4i37MjX7XUbSEHweOYA8RqFdldkBlwJWs9UtAg_LH3NPkQjrUvup4Ew; _ga_WT03GV9QJK=GS1.1.1703662471.12.0.1703662471.0.0.0; __Secure-next-auth.session-token.0=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..0CwhiP5RCSs7hufW.XMqS-GwAZXGtpctoMKk13mQsC323UIsMfiYu5GFyKy6h3W1Lq0danifhZ3KBNkrVYBl74LOD9uVy2AaRo_6yKYRcxFiQAcFxzh7a6CSCQ6ALtLL7JbYJbdUdAWjTkuvgEGnlMJUHptyzVejLZjDaA6j43U7LvWpIXO00QUEtTUX9zTn8I7RP9iCK0e-Ngc5Ch55C89486RDy9_ivPl1J1sb8XtvH5AwjNM-UKv5AFZFX6vFmI22rO_pAuuYGlRceP2pXYa6n_MeTCU7o22Eq0HnQdfLdrPa98sFr_X_gFpnEIVSyw8PXmUAROB9omfXjAQAx4ISsZmwE2Z5okLyO8jJ5iuPOOflvMR_bLJSznPlpGtRpUhAX-h1oJoyD3fn6qlNXZ-46I8QLWpD01oviTxDstefIAIrR77DavHpLwyiBq6xlPWJoL1cFK4JMIrC2ya7qLt11eNgPlCsdB-m3p9NbbLrxO49TkuAyB5ExTa2Cb3mMkoUYoWnK9Yy-NugTVuKMO0o7qvHrXQXTZDnDSAH0yqzEdUuLYMHVbeG8hFykp0QI5XGrc83N_I6lq-oEYktf1ahYD-7tYgZ_HQ2byl9IbQ8TfZiJSmFaFSKrnq1phogig0o90Y-j9yMJDJXY3xwNsHHVPx8BQEn8bXApU6ynvO9D9DN8CE1CF0BOijRfV6Z7Ulluksteol9l1GZWXYuqywdBAsGADRVoZU9yvkCwyaDPVuuwTEZhtcQOVFIvmrECQrc8kidDFbgySVD0G-xhlza7Fo0zp7g-ADiDK1rdPG5_afcObWts5nO2G-1SnCf_M_u4sAUYF0Ylc23EKMcWUI2zdH_5uMuXWJL6NsSjAw-N7qYTKea1077m46KiGqRehJimaA2SBocg0xanP6BY2CQEyJkrBWt4THwLPoc415MS_U6uqioPe1Kk2J9qzAnR7E4LZWy-xMM6_8936axLT8LBvbm45fsoN0kCIJo5MEJi9VS0kjRFNWRRmRTeAAwWyzkFeFXVGuQPOXVgGlpnpkT9R-_-eF6ROzqvShei4ghlZ-4IyNlAZtlJa_Fy4FuALUDJBc1-OdyeghEOVRKcUg8d24CUTNIcu7HE8db0bB7rPTTplhUzguq0TxNxaxkzfNC_7mrtxiizYF8fzzskjaW25vv7xTdLgTa7C3_4FBmFk8326O8VPm6Qn9pLwMetqf18agV7VJrhu8D_hXhSH0JEKrfi9hjc7KWihbMkIpsUhoOIo9YPrg4Wn3eNUBV4Y-d86pkAe0rPAaiHpU7LP-SqYpMgycIrfSmikUc5IK9THADKyv07IRISq6wLzHqHFfQYeM93xjF_bwaEYTaiQhwiBLyE20f0uFKISPsPadmsi3Mvmpc4kauOVVeALgXku-F5A9jXuRXpfml4K1nSODOqWY2-CusfXpFgvi3IWO01tXHt9NrobAry6EEEwS7PBpgfMjYIG52tDBKoT1idBs2Ztm_B6O-Yph-Riw6z6kNBryZkNtZ7izVD-EhYgB6d9fneXUFo9CNuxv9KkiuxQC7ehgGPamgMRee6uEfyyHoGdB3R7QtkjhMNvYGe_VJQalLHzA7Z8uBi6OlZu3jKaGCZ27w5Ng2O4AP9k9QhxFqSDzrn_7rB3_rHZED81vfAKsAp9-vEAatrHmPhjbaeBDCTtolNT-_1nxoxHqAcdYC5j5ZftfE82vXNkJ_hVknYp_-uqqCqe8ZdBMt4FXChfuJxnmlVMyR9g7sENP-DJJ-UtbZ8vqyyLcc3Q1b-2qMSlUlfbkb_z0lqiJ1PT9sqKAMUUIGwp37vzJFIQXglAsJWNHU-tiEc9TDLnuluGUGIHXUptPp8Zy9Qqh3xsxc0XGeSvsd1rczpVpqtWf6dqy0Y2oVB-DFyxQSL4PLwGAF7RKTkb8qePuJCsC9U3abZ-PS7yKRf_5MnmlLNT2F7ucZHQVWiP8xKArsWYxFbFn9QW8T-mcFVVzswxoFqICPMT1CZYeSsnL7uKOXWeNBjpTwF5WyzxSTzWMWbElOUeiGxLX5mUfj43Jf7zyL54W3hpb34ly4-taU00EHf3_i9QIF714xJtrYRW-DUmuWxYZdBV3cvxc9Ug9GriEImg9QRG4oCEgMqviR4vrcnYsSqykLTw68-0iNDo7VEjCv7LRj4xVawnS1lykb76cF99wf8-SSmRpOntGpud4qf9ZZtbAnqwKCeYJYaI6gYw8UTO1e0uUZyJdi80yj4ZbjotelzQ8ZAHBYhJk8DQLBExYYeuiiLzeAuW52qVy3BLmfxFbgDsaJn0NuQ28EMFsKf8ze7zZ6wMTCHCprLlCi-cP_id__kkaxC-L97Gnso3sGP8e0pxehW4EFpCndPq1oJflSqZ7uIuVgpvcskG6igjcwcl9rJ7iFwm9gNAZAWGqiDnyekjazB5m1KpZSkP3WB40R71DqpKoCte_tv9iZLCKfpkm7R9t-hl_FjCojUSZUgMW4Z5OZq2emyJ0voR8putOs2C2LZ5Y7BnjecWt0rpn5LB1E9W7QcY6iszoYH6kggHkD5zMO0z0V2NqhvLujwK6MHtOIsDOgggSkT6GMvrkKlEGo6We5tFTQDSn5imPof4HCIrrJP3Fu9RQLX6WvXE06mNMxlPYvEr18xQVgD3oWW_qmd7ShRh3EpeiwwxDGu04crPBmpq22QubY7UehBe36iyz9YWL7Tvq1J32C7YF5Bi2vcXtE1lzy5zHRtnZBoUi6prK8jifT2LLoBZEUWnMYHFyhPk51Fs1rnyJ7wqsBK8SaSK2jNzXgUcSIqaKhDS0ylBPjfV4PRUJ-sCD7Ffpro43D8F8TBmn9NqQWwmX5vCmi4FnKuatjQoMKCdV2ZoTPkQgo3jhnLaTlr8jJM_ttgd6rJ4VKk6kjNxhn2hb8Tm3_XNHHzcqA7RkEa5relMZmpuJ1gqL-1yCh9o01-JxWdX-7F_hrB0QrG2qsjRwU-LZkurU8M_LLGIZXQgaTQmXgduxPQTHyMMZO330xnwL5ZbUJSL9zbxpsd6ov7xtsvO4qaOjCgdQHFYAZQPKxWOYbo1xkKugtH5ijaJVtKoSYZjO-zQlYpOJWY7lQ_A9xmXDWKu7yu6Et-aRDLFC0QbWmrScrnMaCCf0HCpjLHzjrsV5--6zKRhiW4eGALdGpJBnpqGZC7CFZiZHVTeTjXCgL0YJyZjS8YzQ7eX9p3QZZE3qARs02UAGttiR6MTTfMVc34ZhaCLkaYcWo5Q6xUocTU0Gdmp_f6ySfEEsqyz_9RgDAMy_fF9PbPoeVgsrsDHlAsSiQ7yG-F52XLSDaek5KwMzGiNtERdFOKk7Inq7DruP8uFQGOUykfjlmYzno_gxprPqbkjQjqFCmExPLmvf6mS9OV0yGnr7lm974HQWVNvLfGHC1SAzKlStQLYL_AP8kh7WqZyOkWwOBfm27LA5mvPoC3U5RYLfTVMtT40HA7C7yz0OlCRTLuFWpJgFMUfIS115iv5sucCDDeaicNvNHtUWzK5oXDymvuY9AO1zmagx-2G829HtS-6YYGLr5VR90GupVbX2vwjALt6GNjkvcCzSvFVbYzAHBenH7cYjfeQ8mk5GM6TPGg0zuFsle_SXTUDg-K9B4XsKBGQQ4Qg9wY3VN8wbqU8tyl5ZzPHNSuMeTz_FAHltDuzoc20sgeZ-eBdDSQfA_o9rAkjVxxd9sOoZtzJztAAcsBiBWIfyGXktdrGDwUKJrwYPq4XmsMZG4wtJ45MJ0e74A1QmB9_VMxOKC9a-LSrrPAdMEuvNCs2RIwQ4BW8NBk5M0vyPXUJCPz9cVfIQsukO0y3aDRpfvn0-_oEXMQQyZYjAH_mn_Aby8P0yqU9UKZT0B83vkJCepQ-RT0zCa; __Secure-next-auth.session-token.1=0rfKQ0GRJbE-P5tCZG7dipuhXmfzc2J9-w5LGVbLi4f59g2eu6GGGpi7IuydAJa2aIHv9oAjamMuVGtfL9AwwQ41m5MO88ngfIfkG1_Du3K9LRKgppjNe8XS1ta4A7JEyjaUNl4_UrdjDOeqGpRSZqwrctgif4-GVLvuPQr32Z7TOZBmCw4FlbOQpuzmJMe35Bywrl9FE7WYMDqybRBICeIGKCsP3_Jzwr9BiE1U6KJjPrjRIgZ2n8OruM1iADD5RuUqktpkQrThhGHg5dNmDBKcY6Q1xuziQ7KZTJiL_tmd8.IIm6K4KlV6nxy88oB0b5gA",
  leverages: [10, 15, 20, 25, 30, 35, 40, 45, 50],
  symbols: [
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
  ],
  vols: [
    50000,
    100000,
    200000,
    300000,
    500000,
    1000000,
    1500000,
    2000000,
    2500000,
    3000000,
    3500000,
    4000000,
    4500000,
  ],
}

router.get('/', function(req, res, next) {
  data.error = false;
  data.success = false;
  res.render('index', { data });
});

router.get('/list', async function(req, res, next) {
  try {
    const access = await axios.request({
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://pro.goonus.io/api/auth/session',
      headers: {
        "Content-Type": "application/json",
        Cookie: data.cookie
      }
    });
    const token = access.data.accessToken;
    const list = await axios.request({
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://api-pro.goonus.io/perpetual/v1/positions?status=OPEN',
      headers: { 
        'Authorization': 'Bearer ' + token
      }
    });
    res.send(list.data);
  } catch (error) {
    res.send(error.response.data);
  }
});

router.post('/', async function(req, res, next) {
  data.side = String(req.body.side);
  data.symbol = String(req.body.symbol);
  data.leverage = Number(req.body.leverage);
  data.vol = Number(req.body.vol);
  data.cookie = req.body.cookie ? String(req.body.cookie) : data.cookie;
  data.type = String(req.body.type);
  data.stop_market_price = Number(req.body.stop_market_price);
  
  try{
      const access = await axios.request({
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://pro.goonus.io/api/auth/session',
        headers: {
          "Content-Type": "application/json",
          Cookie: data.cookie
        }
      });
      const token = access.data.accessToken;

      const [a, b] = await Promise.all([
        axios.request({
          method: 'post',
          maxBodyLength: Infinity,
          url: 'https://api-pro.goonus.io/perpetual/v1/leverage',
          headers: { 
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer ' + token
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
            'Authorization': 'Bearer ' + token
          }
        })
        .then((response) => {
          return response.data;
        })
      ]);

      if(data.type == 'STOP_MARKET') {
        try {
          await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api-pro.goonus.io/perpetual/v1/order',
            headers: { 
              'Content-Type': 'application/json', 
              'Authorization': 'Bearer ' + token
            },
            data : JSON.stringify({
              "symbol": data.symbol,
              "side": data.side,
              "type": "STOP",
              "positionSide": "BOTH",
              "size": data.vol/data.stop_market_price,
              "clientOrderId": "42466c03-44f3-4960-9e52-40501d2edcb0",
              "userId": "42466c03-44f3-4960-9e52-40501d2edcb0",
              "postOnly": false,
              "workingType": "CONTRACT_PRICE",
              "stopPrice": data.stop_market_price,
              "reduceOnly": false,
              "timeInForce": "GTC",
              "closePosition": false
            })
          });
        } catch (err) {
          await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api-pro.goonus.io/perpetual/v1/order',
            headers: { 
              'Content-Type': 'application/json', 
              'Authorization': 'Bearer ' + token
            },
            data : JSON.stringify({
              "symbol": data.symbol,
              "side": data.side,
              "type": "TAKE_PROFIT",
              "positionSide": "BOTH",
              "size": data.vol/data.stop_market_price,
              "clientOrderId": "42466c03-44f3-4960-9e52-40501d2edcb0",
              "userId": "42466c03-44f3-4960-9e52-40501d2edcb0",
              "postOnly": false,
              "workingType": "CONTRACT_PRICE",
              "stopPrice": data.stop_market_price,
              "reduceOnly": false,
              "timeInForce": "GTC",
              "closePosition": false
            })
          });
        }
      } else {
          const lastPrice = Number(b.lastPrice);
          const size = data.vol/lastPrice;

          const order = await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api-pro.goonus.io/perpetual/v1/order',
            headers: { 
              'Content-Type': 'application/json', 
              'Authorization': 'Bearer ' + token
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
              "stopPrice": 0,
              "reduceOnly": false,
              "timeInForce": "GTC",
              "closePosition": false
            })
          });
    
          const [c, d] = await Promise.all([
            axios.request({
              method: 'get',
              maxBodyLength: Infinity,
              url: 'https://api-pro.goonus.io/perpetual/v1/positions?status=OPEN',
              headers: { 
                'Authorization': 'Bearer ' + token
              }
            })
            .then((response) => {
              return response.data;
            }),
            axios.request({
              method: 'get',
              maxBodyLength: Infinity,
              url: 'https://api-pro.goonus.io/perpetual/v1/orders?status=OPEN&status=UNTRIGGERED',
              headers: { 
                'Authorization': 'Bearer ' + token
              }
            })
            .then((response) => {
              return response.data;
            })
          ]);
          
          let notional = data.vol;
          const checkNotionalExist = c.length ? c.find(x => x.symbol == data.symbol) : false;
          if (checkNotionalExist) { 
            notional = checkNotionalExist.notional + data.vol;
          }
          const newSize = notional/lastPrice;
          const isolatedMargin = (newSize*lastPrice) / data.leverage;
          const lossMoney = (stopLossPercent/100) * isolatedMargin;
          const takeMoney = (takeProfitPercent/100) * isolatedMargin;
          let lossPrice = lastPrice + (lossMoney/newSize);
          let takePrice = lastPrice - (takeMoney/newSize);
          if (data.side == 'BUY') lossPrice = lastPrice - (lossMoney/newSize);
          if (data.side == 'BUY') takePrice = lastPrice + (takeMoney/newSize);
          
          let processes = [];
          const e = d.filter(x => x.closePosition && x.symbol == data.symbol);
          if (e.length) {
            let p = [];
            e.forEach(x => {
              p.push(axios.request({
                method: 'delete',
                maxBodyLength: Infinity,
                url: 'https://api-pro.goonus.io/perpetual/v1/order',
                headers: { 
                  'Content-Type': 'application/json', 
                  'Authorization': 'Bearer ' + token
                },
                data : JSON.stringify({
                  "id":x.id,
                  "symbol":data.symbol,
                  "clientOrderId":"42466c03-44f3-4960-9e52-40501d2edcb0"
                })
              }).then((response) => {
                return response.data;
              }));
            });
            await Promise.all(p);
          }
    
          processes.push(
            axios.request({
              method: 'post',
              maxBodyLength: Infinity,
              url: 'https://api-pro.goonus.io/perpetual/v1/order',
              headers: { 
                'Content-Type': 'application/json', 
                'Authorization': 'Bearer ' + token
              },
              data : JSON.stringify({
              "symbol": data.symbol,
              "side": (data.side == 'BUY') ? 'SELL' : 'BUY',
              "type": 'TAKE_PROFIT',
              "positionSide": "BOTH",
              "clientOrderId": "42466c03-44f3-4960-9e52-40501d2edcb0",
              "userId": "42466c03-44f3-4960-9e52-40501d2edcb0",
              "postOnly": false,
              "timeInForce": "GTC",
              "reduceOnly": false,
              "closePosition": true,
              "price": 0,
              "stopPrice": takePrice,
              "workingType": "CONTRACT_PRICE"
              })
            }).then((response) => {
              return response.data;
            }),
            axios.request({
              method: 'post',
              maxBodyLength: Infinity,
              url: 'https://api-pro.goonus.io/perpetual/v1/order',
              headers: { 
                'Content-Type': 'application/json', 
                'Authorization': 'Bearer ' + token
              },
              data : JSON.stringify({
                "symbol": data.symbol,
                "side": (data.side == 'BUY') ? 'SELL' : 'BUY',
                "type": 'STOP',
                "positionSide": "BOTH",
                "clientOrderId": "42466c03-44f3-4960-9e52-40501d2edcb0",
                "userId": "42466c03-44f3-4960-9e52-40501d2edcb0",
                "postOnly": false,
                "timeInForce": "GTC",
                "reduceOnly": false,
                "closePosition": true,
                "price": 0,
                "stopPrice": lossPrice,
                "workingType": "CONTRACT_PRICE"
              })
            }).then((response) => {
              return response.data;
            })
          );
    
          await Promise.all(processes);
      }

      data.error = '';
      data.success = `${data.side} ${data.type} lệnh ${data.symbol}!`;
  }
  catch(error){
      console.log(error.response);
      data.error = error.response.data.message || error.response.data.code;
      data.success = '';
  }

  return res.render('index', { data });
});

router.post('/close', async function(req, res, next) {
  const id = Number(req.body.id);
  const size = Number(req.body.size);
  const symbol = String(req.body.symbol);
  try {
    const access = await axios.request({
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://pro.goonus.io/api/auth/session',
      headers: {
        "Content-Type": "application/json",
        Cookie: data.cookie
      }
    });
    const token = access.data.accessToken;
    const response = await axios.request({
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api-pro.goonus.io/perpetual/v1/order',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer ' + token
      },
      data : JSON.stringify({
        "symbol": symbol,
        "side": size < 0 ? 'BUY' : 'SELL',
        "type": "MARKET",
        "positionSide": "BOTH",
        "price": 0,
        "size": Math.abs(size),
        "clientOrderId": "42466c03-44f3-4960-9e52-40501d2edcb0",
        "userId": "42466c03-44f3-4960-9e52-40501d2edcb0",
        "postOnly": false,
        "timeInForce": "GTC",
        "workingType": "MARK_PRICE",
        "stopPrice": 0,
        "reduceOnly": true,
        "id": id
      })
    });
    res.send(response.data);
  } catch (error) {
    res.send(error.response.data);
  }
});

module.exports = router;
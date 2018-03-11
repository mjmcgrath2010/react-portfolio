/**
 *  API and Middleware methods
 */
const fetch = require('node-fetch');
const baseStockUrl = 'https://api.iextrading.com/1.0';
const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyCjXddPanpmLwtsDoXLHNqwhiEmCtMlc0U',
});

module.exports = {
  autoComplete: (req, res) => {
    fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${
        req.query.keyword
      }&types=address&location=42.342813,-71.0976066&radius=80467&strictbounds&key=AIzaSyCjXddPanpmLwtsDoXLHNqwhiEmCtMlc0U`
    )
      .then(resp => resp.json())
      .then(json => res.status(200).send(json))
      .catch(err => res.status(400).send(`Error: ${err}`));
  },
  geocode: (req, res) => {
    googleMapsClient.geocode(
      {
        address: req.query.address,
      },
      (err, response) => {
        if (!err) {
          res.send(response);
        }
      }
    );
  },
  directions: (req, res) => {
    googleMapsClient.directions(
      {
        origin: ['42.342813', '-71.097606'],
        destination: [req.query.lat, req.query.lng],
        mode: req.query.mode,
      },
      (err, response) => {
        if (!err) {
          return res.send(response);
        }
        return res.send(err);
      }
    );
  },
  getStockData: (req, res) => {
    const endpoints = [
      { name: 'stock_data', endpoint: `/stock/${req.query.symbol}/chart/${req.query.interval || 'dynamic'}` },
      { name: 'company_info', endpoint: `/stock/${req.query.symbol}/company` },
    ];
    let data = {};
    let completedRequests = 0;
    let errors = 0;

    const sendResponse = () => {
      if (completedRequests === endpoints.length || completedRequests + errors === endpoints.length) {
        res.status(200).send(data);
      }
    };

    endpoints.forEach(endpoint => {
      fetch(`${baseStockUrl}${endpoint.endpoint}`)
        .then(resp => resp.json())
        .then(json => {
          data = Object.assign(data, { [endpoint.name]: json });
          completedRequests += 1;
          sendResponse();
        })
        .catch(err => {
          data = Object.assign(data, { [endpoint.name]: err });
          errors += 1;
        });
    });
  },
  getTickerSymbols: (req, res) => {
    fetch(`${baseStockUrl}/ref-data/symbols`)
      .then(resp => resp.json())
      .then(json => res.status(200).send(json))
      .catch(err => res.status(400).send(`Error: ${err}`));
  },
  getCurrentMarketData: (req, res) => {
    const endpoints = ['/mostactive', '/gainers', '/iexvolume', '/iexpercent'];
    let data = {};
    let completedRequests = 0;
    let errors = 0;

    const sendResponse = () => {
      if (completedRequests === endpoints.length || completedRequests + errors === endpoints.length) {
        res.status(200).send(data);
      }
    };

    endpoints.forEach(endpoint => {
      fetch(`${baseStockUrl}/stock/market/list${endpoint}`)
        .then(resp => resp.json())
        .then(json => {
          data = Object.assign(data, { [endpoint.replace('/', '')]: json });
          completedRequests += 1;
          sendResponse();
        })
        .catch(err => {
          data = Object.assign(data, err);
          errors += 1;
        });
    });
  },
};

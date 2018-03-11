/**
 *  API and Middleware methods
 */
const https = require('https');
const fetch = require('node-fetch');
const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyCjXddPanpmLwtsDoXLHNqwhiEmCtMlc0U',
});

module.exports = {
  autoComplete: (req, res) => {
    https
      .get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${
          req.query.keyword
        }&types=address&location=42.342813,-71.0976066&radius=80467&strictbounds&key=AIzaSyCjXddPanpmLwtsDoXLHNqwhiEmCtMlc0U`,
        resp => {
          let data = '';
          resp.on('data', chunk => {
            data += chunk;
          });
          resp.on('end', () => {
            res.status(200).send(data);
          });
        }
      )
      .on('error', err => {
        res.status(400).send(`Error: ${err.message}`);
      });
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
  // TODO: Refine these methods
  getStockData: (req, res) => {
    let data = {};
    let completedRequests = 0;
    let errors = 0;

    const sendResponse = () => {
      if (completedRequests === 1 || completedRequests + errors === 1) {
        res.status(200).send(data);
      }
    };

    fetch(`https://api.iextrading.com/1.0/stock/${req.query.symbol}/chart/${req.query.interval || 'dynamic'}`)
      .then(resp => resp.json())
      .then(json => {
        data = Object.assign(data, json);
        completedRequests += 1;
        sendResponse();
      })
      .catch(err => {
        data = Object.assign(data, err);
        errors += 1;
      });
  },
  getCompanyInfo: (req, res) => {
    https
      .get(`https://api.iextrading.com/1.0/stock/${req.query.symbol}/company`, resp => {
        let data = '';
        let processedData;

        resp.on('data', chunk => {
          data += chunk;
        });

        resp
          .on('end', () => {
            https.get(`https://api.iextrading.com/1.0/stock/${req.query.symbol}/logo`, response => {
              response.on('data', logo => {
                processedData = Object.assign(JSON.parse(data), JSON.parse(logo));
              });
              response.on('end', () => {
                res.status(200).send(processedData);
              });
            });
          })
          .on('error', err => {
            if (data) {
              res.status(204).send(JSON.parse(data));
            } else {
              res.status(400).send(`Error: ${err.message}`);
            }
          });
      })
      .on('error', err => {
        res.status(400).send(`Error: ${err.message}`);
      });
  },
  getTickerSymbols: (req, res) => {
    https.get('https://api.iextrading.com/1.0/ref-data/symbols', resp => {
      let data = '';

      resp.on('data', chunk => {
        data += chunk;
      });

      resp
        .on('end', () => {
          res.status(200).send(JSON.parse(data));
        })
        .on('error', err => {
          res.status(400).send(`Error: ${err.message}`);
        });
    });
  },
  getCurrentMarketData: (req, res) => {
    const endpoints = ['/mostactive', '/gainers', '/iexvolume', '/iexpercent'];
    const baseUrl = 'https://api.iextrading.com/1.0/stock/market/list';
    let data = {};
    let completedRequests = 0;
    let errors = 0;

    const sendResponse = () => {
      if (completedRequests === endpoints.length || completedRequests + errors === endpoints.length) {
        res.status(200).send(data);
      }
    };

    endpoints.forEach(endpoint => {
      fetch(`${baseUrl}${endpoint}`)
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

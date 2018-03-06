/**
 *  API and Middleware methods
 */

// https://www.alphavantage.co/support/#api-key UPCYGJ7GI7N68IBM
const https = require('https');
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
  getStockData: (req, res) => {
    https
      .get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${req.query.symbol}&interval=${
          req.query.interval
        }min&apikey=UPCYGJ7GI7N68IBM`,
        resp => {
          let data = '';

          resp.on('data', chunk => {
            data += chunk;
          });

          resp.on('end', () => {
            res.status(200).send(JSON.parse(data));
          });
        }
      )
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
};

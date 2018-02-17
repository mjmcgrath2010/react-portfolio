/**
 *  API and Middleware methods
 */

const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyCjXddPanpmLwtsDoXLHNqwhiEmCtMlc0U',
});

module.exports = {
  autoComplete: (req, res) => {
    res.send(400);
  },
  geocode: (req, res) => {
    googleMapsClient.geocode(
      {
        address: req.query.address,
      },
      (err, response) => {
        if (!err) {
          res.send(response.json.results);
        }
      }
    );
  },
  directions: (req, res) => {
    googleMapsClient.directions(
      {
        origin: ['42.342813', '-71.097606'],
        destination: [req.query.lat, req.query.lng],
      },
      (err, response) => {
        if (!err) {
          return res.send(response);
        }
        return res.send(err);
      }
    );
  },
};

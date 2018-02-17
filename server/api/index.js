/**
 *  API and Middleware methods
 */

const GooglePlaces = require('google-places');
const places = new GooglePlaces('AIzaSyCjXddPanpmLwtsDoXLHNqwhiEmCtMlc0U');
const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyCjXddPanpmLwtsDoXLHNqwhiEmCtMlc0U',
});

module.exports = {
  autoComplete: (req, res) => {
    places.autocomplete({ input: req.query.keyword, types: 'address' }, (autoCompleteErr, response) => {
      if (autoCompleteErr) {
        return res.status(400).send(autoCompleteErr);
      }
      return res.status(200).send(response);
    });
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
        destination: ['42.3503027', '-71.05706599999999'],
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

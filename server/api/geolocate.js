/**
 * Map Utils
 */

const GooglePlaces = require('google-places');
const places = new GooglePlaces('AIzaSyCjXddPanpmLwtsDoXLHNqwhiEmCtMlc0U');

module.exports = {
  autoComplete: (req, res) => {
    places.autocomplete({ input: req.query.keyword, types: 'address' }, (autoCompleteErr, response) => {
      if (autoCompleteErr) {
        return res.status(400).send(autoCompleteErr);
      }
      return res.status(200).send(response);
    });
  },
};

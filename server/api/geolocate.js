/**
 * Map Utils
 */

const GooglePlaces = require('google-places');
const places = new GooglePlaces('AIzaSyCjXddPanpmLwtsDoXLHNqwhiEmCtMlc0U');

module.exports = (req, res) => {
  // places.search({ keyword: req.query.search }, (searchErr, response) => {
  //   places.details({ reference: response.results[0].reference }, (detailErr, detailResponse) => {
  //     if (detailResponse) {
  //       res.send(detailResponse);
  //     }
  //   });
  // });

  places.autocomplete({ input: req.query.keyword, types: 'address' }, (autoCompleteErr, response) => {
    if (response) {
      res.send(response);
    }
  });
};

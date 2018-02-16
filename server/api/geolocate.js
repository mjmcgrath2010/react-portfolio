/**
 * Map Utils
 */

var GooglePlaces = require('google-places');
var places = new GooglePlaces('AIzaSyCjXddPanpmLwtsDoXLHNqwhiEmCtMlc0U');

module.exports = (req, res, next) => {
  // const geoLocate = input => {
  //   const key = 'AIzaSyCjXddPanpmLwtsDoXLHNqwhiEmCtMlc0U';
  //   const baseUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?types=establishment&location=42.342813,-71.097606&radius=500&key=${
  //     key
  //   }&input=${input}`;
  // };

  places.search({ keyword: req.query.keyword }, function(err, response) {
    console.log('search: ', response.results);

    places.details({ reference: response.results[0].reference }, function(err, response) {
      console.log('search details: ', response.result.website);
      // search details:  http://www.vermonster.com/
    });
  });

  places.autocomplete({ input: 'Verm', types: '(cities)' }, function(err, response) {
    console.log('autocomplete: ', response.predictions);

    if (response) {
      res.send(response);
    }
  });
};

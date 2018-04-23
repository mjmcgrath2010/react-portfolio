const router = require('express').Router();
const middleware = require('./middleware/index');
// / Backend middleware and middleware
router.get('/autocomplete', middleware.autoComplete);
router.get('/geocode', middleware.geocode);
router.get('/directions', middleware.directions);
router.get('/stock-data', middleware.getStockData);
router.get('/symbols', middleware.getTickerSymbols);
router.get('/current-market-stats', middleware.getCurrentMarketData);

module.exports = router;

// const User = require('../db/users/userModel');
const signToken = require('./auth').signToken;

exports.signin = (req, res) => {
  // req.user will be there from the middleware
  // verify user. Then we can just create a token
  // and send it back for the client to consume
  // eslint-disable-next-line no-underscore-dangle
  const token = signToken(req.user._id);
  res.json({ token });
};

const User = require('./userModel');
const _ = require('lodash');
const signToken = require('../../auth/auth').signToken;

exports.params = function(req, res, next, id) {
  User.findById(id)
    .select('-password')
    .exec()
    .then(
      user => {
        if (!user) {
          next(new Error('No user with that id'));
        } else {
          req.user = user;
          next();
        }
      },
      err => {
        next(err);
      }
    );
};

exports.get = (req, res, next) => {
  User.find({})
    .select('-password')
    .exec()
    .then(
      users => {
        res.json(
          users.map(user => {
            return user.toJson();
          })
        );
      },
      err => {
        next(err);
      }
    );
};

exports.getOne = (req, res, next) => {
  const user = req.user.toJson();
  res.json(user.toJson());
};

exports.put = (req, res, next) => {
  const user = req.user;

  const update = req.body;

  _.merge(user, update);

  user.save((err, saved) => {
    if (err) {
      next(err);
    } else {
      res.json(saved.toJson());
    }
  });
};

exports.post = (req, res, next) => {
  const newUser = new User(req.body);

  newUser.save((err, user) => {
    if (err) {
      return next(err);
    }

    const token = signToken(user._id);
    return res.json({ token });
  });
};

exports.delete = (req, res, next) => {
  req.user.remove((err, removed) => {
    if (err) {
      next(err);
    } else {
      res.json(removed.toJson());
    }
  });
};

exports.me = (req, res) => {
  res.json(req.user.toJson());
};

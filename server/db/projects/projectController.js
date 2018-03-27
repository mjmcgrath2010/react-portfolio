const Post = require('./projectModel');
const _ = require('lodash');
// const logger = require('../../util/logger');

exports.params = (req, res, next, id) => {
  Post.findById(id)
    .populate('author')
    .exec()
    .then(
      post => {
        if (!post) {
          next(new Error('No project with that id'));
        } else {
          req.post = post;
          next();
        }
      },
      err => {
        next(err);
      }
    );
};

exports.get = (req, res, next) => {
  Post.find({})
    .populate('author categories')
    .exec()
    .then(
      posts => {
        res.json(posts);
      },
      err => {
        next(err);
      }
    );
};

exports.getOne = (req, res) => {
  const post = req.post;
  res.json(post);
};

exports.put = (req, res, next) => {
  const post = req.post;

  const update = req.body;

  _.merge(post, update);

  post.save((err, saved) => {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  });
};

exports.post = (req, res, next) => {
  const newpost = req.body;
  Post.create(newpost).then(
    post => {
      res.json(post);
    },
    err => {
      // logger.error(err);
      next(err);
    }
  );
};

exports.delete = (req, res, next) => {
  req.post.remove((err, removed) => {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};

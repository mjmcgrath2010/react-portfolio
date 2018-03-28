const Project = require('./projectModel');
const _ = require('lodash');
// const logger = require('../../util/logger');

exports.params = (req, res, next, id) => {
  Project.findById(id)
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
  Project.find({})
    .populate('author categories')
    .exec()
    .then(
      projects => {
        res.json(project);
      },
      err => {
        next(err);
      }
    );
};

exports.getOne = (req, res) => {
  const project = req.post;
  res.json(project);
};

exports.put = (req, res, next) => {
  const project = req.post;

  const update = req.body;

  _.merge(project, update);

  project.save((err, saved) => {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  });
};

exports.post = (req, res, next) => {
  const newProject = req.body;
  Project.create(newProject).then(
    project => {
      res.json(project);
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

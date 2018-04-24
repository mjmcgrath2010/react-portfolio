const Project = require('./projectModel');
const _ = require('lodash');
// const logger = require('../../utils/logger');

exports.params = (req, res, next, id) => {
  Project.findById(id)
    .exec()
    .then(
      project => {
        if (!project) {
          next(new Error('No project with that id'));
        } else {
          req.project = project;
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
    .exec()
    .then(
      projects => {
        res.json(projects);
      },
      err => {
        next(err);
      }
    );
};

exports.getOne = (req, res) => {
  const project = req.project;
  res.json(project);
};

exports.put = (req, res, next) => {
  const project = req.project;

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
      next(err);
    }
  );
};

exports.delete = (req, res, next) => {
  req.project.remove((err, removed) => {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};

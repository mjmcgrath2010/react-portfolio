const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },

  text: {
    type: String,
    required: true,
  },

  author: { type: Schema.Types.ObjectId, ref: 'user' },

  categories: [{ type: Schema.Types.ObjectId, ref: 'category' }],
});

module.exports = mongoose.model('project', ProjectSchema);

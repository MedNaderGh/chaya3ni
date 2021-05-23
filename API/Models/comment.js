const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Comment = new Schema({
  Comment: {
    type: String,
    required: true
  },
  rate: {
    type: Number,
    required: true
  },
  id_user: {
    type: String,
    required: true
  },
  name_user: {
    type: String,
    required: true
  },
 commenter_id: {
    type: String,
    required: true
  },
  date:{
      type:Date,
      required:true
  }
},{
    collection: 'comment'
});
module.exports = mongoose.model('Comment', Comment);
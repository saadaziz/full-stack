const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  avatarUrl: 
  {
    type: String
  },
  createdAt:
  {
    type: Date,
  },
  displayName:  
  {
    type: String
  },
  email:
  {
    type: String,
    required: true,
    unique: true,
  },
  googleId:
  {
    type: String,
    required: true,
    unique: true,
  },
  lastVisited: 
  { 
    type: Date, 
    default: new Date() 
  }
});

module.exports = mongoose.model("user", userSchema);
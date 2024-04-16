const mongoose = require("mongoose")
const plm = require("passport-local-mongoose")
const { stringify } = require("postcss")

mongoose.connect("mongodb://127.0.0.1:27017/MemoProps")

const userSchema = mongoose.Schema({
  fullname: String,
  username: {
    type: String,
    unique: true,
  }, 
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  }]
})

userSchema.plugin(plm)
module.exports = mongoose.model("User", userSchema);
const mongoose = require('mongoose');
const PostSchema = require("./postSchema");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 characters'
    },
    required: [true, "Name is required."],
  },
  blogPosts:[{
    type: Schema.Types.ObjectId,
    ref: 'blogPost'
  }],
  posts:[PostSchema],
  likes:Number,
});

UserSchema.virtual("postCount").get(function(){
  return this.blogPosts.length;
  console.log("hi i'm working");
});
const User = mongoose.model("user", UserSchema);

module.exports = User;

// virtual type fix
// UserSchema.virtual("postCount").get(function(){
//   return this.blogPosts.length;
//   console.log("hi i'm working");
// });

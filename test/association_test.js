const mongoose = require('mongoose');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');
const assert = require('assert');


describe('Associations', (done) => {

  beforeEach(function(done){
    this.timeout(5000);
    let joe, blogPost, comment;

    joe = new User({
      name: "Joe",
    });
    blogPost = new BlogPost({
      title:"1st Post",
      content:"This is the first Post"
    });
    comment = new Comment({
      content: "this post was short and crappy"
    });

    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;

    Promise.all([
      joe.save(),
      blogPost.save(),
      comment.save(),
    ])
      .then(() => done());
  });

it.only('Saves a relationship between a user and a blogPost', (done) => {
  User.findOne({name: "Joe" })
  .then((user) => {
    console.log(user.blogPosts);
    return done();
  });
});

});

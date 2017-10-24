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
    blogPost2 = new BlogPost({
      title:"2nd Post",
      content:"This post is worse than the first Post"
    });
    comment = new Comment({
      content: "This post was short and crappy"
    });
    comment2 = new Comment({
      content: "This post was longer than the first, but still crap"
    });

    joe.blogPosts.push(blogPost);
    joe.blogPosts.push(blogPost2);
    blogPost.comments.push(comment);
    blogPost2.comments.push(comment2);
    comment.user = joe;
    comment2.user = joe;

    Promise.all([
      joe.save(),
      blogPost.save(),
      blogPost2.save(),
      comment.save(),
      comment2.save(),
    ])
      .then(() => done());
  });

it('Saves a relationship between a user and a blogPost', (done) => {
  User.findOne({name: "Joe" })
  .populate('blogPosts')
  .then((user) => {
    assert(user.blogPosts[0].title === "1st Post");
    return done();
  });
});

it('Saves the relationship between a Users blogPost and a comment tree', (done) => {
  User.findOne({name:"Joe"})
  .populate({
    path:"blogPosts",
    populate: {
      path: "comments",
      model:'comment',
    },
  })
  .then((user) => {
    assert(user.blogPosts[0].comments[0].content === "This post was short and crappy");
    done();
  })
});

it('Saves the relationship between a Users blogPost and a comment tree', (done) => {
  User.findOne({name:"Joe"})
  .populate({
    path:"blogPosts",
    populate: {
      path: "comments",
      model:'comment',
      populate:{
        path:"user",
        model:"user"
      }
    },
  })
  .then((user) => {
    assert(user.blogPosts[0].comments[0].user.name === "Joe");
    done();
  })
});


});

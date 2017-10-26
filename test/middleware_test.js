const mongoose = require('mongoose');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');
const assert = require('assert');

describe('Middleware', () => {
  let joe, blogPost;

  beforeEach((done) => {

    joe = new User({name:"joe"});
    blogPost = new BlogPost({
      title:"new post",
      content:"what the title said",
    });

    joe.blogPosts.push(blogPost);

    Promise.all([joe.save(), blogPost.save()])
      .then(() => done());
  });

  it('Test to see if blogposts are destroyed with users Removal', (done) => {
    joe.remove()
    .then(() => BlogPost.count())
    .then((count) => {
      console.log(count);
      assert (count === 0);
      done();
    })
  });

});

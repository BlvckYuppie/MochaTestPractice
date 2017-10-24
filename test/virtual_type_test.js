const assert = require("assert");
const User = require("../src/user");
const BlogPost = require("../src/blogPost");

describe('Virtual Types', () => {

  it('postcount returns number of posts', (done) => {
    const joe = new User({
      name:"Joe"
    });
    const blogPost = new BlogPost({
      title:"1st Post",
      content:"This is the first Post"
    });
    joe.blogPosts.push(blogPost);

    Promise.all( [ joe.save(), blogPost.save() ])
      .then(() => User.findOne({name:"Joe"}))
      .then((user)=> {
        console.log(joe.postcount);
        console.log(joe.blogPosts);
        assert(joe.postCount === 1);
        done();
      })
  });

});

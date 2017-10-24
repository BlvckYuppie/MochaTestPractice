const assert = require("assert");
const User = require("../src/user");
const BlogPost = require("../src/blogPost");

describe('Virtual Types', () => {

  it('postcount returns number of posts', function(done){
    this.timeout(6000);
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
        assert(joe.postCount === 1);
        done();
      })
  });

});

const assert = require("assert");
const User = require("../src/user");

describe('Virtual Types', () => {

  it('postcount returns number of posts', (done) => {
    const joe = new User({
      name:"Joe",
      posts: [{title:"1st post"}]
    });

    joe.save()
      .then(() => User.findOne({name:"Joe"}))
      .then((user)=> {
        assert(joe.postCount === 1);
        done();
      })
  });

});



// const User = require("../src/user");
// const joe = new User({
//   name:"Joe",
//   posts: [{title:"1st post"}]
// });

const assert = require('assert');
const User = require("../src/user");

describe('Subdocuments', () => {

  beforeEach(function(done) {
    this.timeout(5000);
   const joe = new User({
     name: "Joe",
     posts: [{
       title: "I'm a post."
    }],
    postCount: 1,
   });

    joe.save()
      .then(() => done());
  });

  it('can create a subdocument', (done) => {
     User.findOne({name:"Joe"})
      .then((user)=>{
          assert(user.posts[0].title === "I'm a post.")
          done();
        });
  });

  it('can add subdocuments to an existing record.', (done) => {

     User.findOne({name: "Joe"})
      .then((user) => {
        user.posts.push({title: "I'm post 2"});
        return user.save();
      })
      .then(() => User.update({name:"Joe"}, {$inc: {postCount: 1} }))
      .then(() => User.findOne({name: "Joe"}))
      .then((user) => {
        assert(user.posts[0].title === "I'm a post.");
        assert(user.posts[1].title === "I'm post 2");
        assert(user.postCount === 2)
        done();
      })
  });

  it('can remove an existing sub document', (done) => {
    User.findOne({name: "Joe"})
      .then((user) => {
        user.posts[0].remove();
        return user.save()
      })
      .then(() => User.findOne({name: "Joe"}))
      .then((user) => {
        assert(user.posts[0] === undefined);
        assert(user.posts.length === 0);
        done();
      })
  });


});

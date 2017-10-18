const assert = require('assert');
const User = require("../src/user");

describe('Subdocuments', () => {

  it('can create a subdocument', (done) => {
    const joe = new User({
      name: "Joe",
      posts: [
        { title: "I'm a post." }
      ],
      postCount: 1,
    });

    joe.save()
      .then(() => User.findOne({name:"Joe"}))
      .then((user)=>{
          assert(user.posts[0].title === "I'm a post.")
          done();
        });
  });

  it('can add subdocuments to an existing record.', (done) => {
    
  });


});

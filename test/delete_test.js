const assert = require('assert');
const User = require("../src/user");

describe("Delete Test!" + " Deleting User Record From DB" , () => {
  let joe;

  beforeEach(function(done) {
    this.timeout(5000)
   joe = new User({name: "joe"});

    joe.save()
      .then(() => done());
  });

  it("model instance remove",(done) => {
    joe.remove()
      .then(() => User.findOne({name: "joe"}))
      .then((user) => {
        assert(user === null);
        done();
      })


  });

  it('class method remove', (done) => {
    User.remove({name: "joe"})
      .then(() => User.findOne({name:"joe"}))
      .then((user) => {
        assert(user === null);
        done();
      })
  });

  it('class method findOneAndRemove', (done) => {
    User.findOneAndRemove({name: "joe"})
      .then(() => User.findOne({name: "joe"}))
      .then((user) => {
        assert(user === null);
        done();
      })
    });

  it('class method findById and remove', (done) => {
   User.findByIdAndRemove(joe._id)
     .then(() => User.findOne({name:"joe"}))
     .then((user) => {
       assert(user === null);
       done();
   })
  });



});

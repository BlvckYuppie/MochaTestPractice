const assert = require ("assert");
const User = require("../src/user");

describe("Searching For User Record",() => {
  let joe;

  beforeEach((done) => {
    joe = new User({
      name: "Joe"
    });

    joe.save()
      .then(() => {
        done();
      });
  });

  it('Finds all users in the db named joe',(done) => {
    User.find({name:'Joe'})
      .then((users) => {
        assert(users[0]._id.toString() === joe._id.toString());
        done();
      });
  });
});

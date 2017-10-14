const assert = require ("assert");
const User = require("../src/user");

describe("Searching For User Record",() => {
  let joe;
  let moe;
  let hoe;

  beforeEach((done) => {
    joe = new User({
      name: "Joe"
    });
    moe = new User({
      name: "Moe"
    });
    hoe = new User({
      name: "Hoe"
    });

    joe.save()
      .then(() => {
        moe.save()
          .then(() => {
            hoe.save()
              .then(() => {
                done();
              })
          })
      });
  });

  it('Finds all users in the db named joe',(done) => {
    User.find({name:'Joe'})
      .then((users) => {
        assert(users[0]._id.toString() == joe._id.toString());
        done();
      });
  });

  it("Finds A User by Id",(done) => {
    User.findOne({_id : joe._id})
      .then((users) => {
        assert(users.name === joe.name);
        done();
      });

  })
});

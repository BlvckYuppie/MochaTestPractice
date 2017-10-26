const assert = require ("assert");
const User = require("../src/user");

describe("Searching For User Record",() => {

  let joe, moe, hoe, foe;

  beforeEach((done) => {

    foe = new User({
      name: "Foe"
    });
    hoe = new User({
      name: "Hoe"
    });
    joe = new User({
      name: "Joe"
    });
    moe = new User({
      name: "Moe"
    });

    Promise.all([foe.save(),moe.save(), joe.save(),hoe.save(),  ])
      .then(() => done());
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
  });

  it('can skip and limit the result set', (done) => {
    User.find({})
    .sort({name: 1})
    .skip(1)
    .limit(2)
      .then((users)=>{
        assert(users.length === 2);
        assert(users[0.].name === "Hoe");
        assert(users[1].name === "Joe");
        done();
      });
  });

});

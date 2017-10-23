const assert = require('assert');
const User = require("../src/user");

describe("Update a User Record", () => {
  let joe;
  let moe;
  let hoe;

  beforeEach((done) => {
    joe = new User({
      name: "Joe",
      likes: 0
    });
    moe = new User({
      name: "Moe",
      likes: 0
    });
    hoe = new User({
      name: "Hoe",
      likes: 0
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

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 3);
        assert(users[0].name === "Joseph");
        done();
      })
  };

  it('model instance can update using .set() and .save()', (done) => {
    joe.set('name', 'Joseph');
    assertName(joe.save(), done);
  });

  it('model instance can update using .update ', (done) => {
    assertName(joe.update({name: "Joseph"}), done);
  });

  it('A model class can update using' + ' .update()', (done) => {
   assertName(
     User.update({name: "Joe"}, {name: "Joseph"}),
     done
   )

  });

  it('a model class can update one record using' + " .findOneAndUpdate()", (done) => {
    assertName(
      User.findOneAndUpdate({name: "Joe"}, {name: "Joseph"}),
      done
    )
  });

  it('A model class can update one record using' + " .findByIdAndUpdate()", (done) => {
    assertName(
      User.findByIdAndUpdate(joe._id, {name: "Joseph"}),
      done
    )
  });

  it('A User can have their posts increment by 1', (done) => {
    User.update({name:"Joe"}, {$inc: {likes: 1} })
      .then(() => User.findOne({name: "Joe"}))
      .then((user) => {
        assert(user.likes === 1 );
        done();
      })
  });
})

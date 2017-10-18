const assert = require('assert');
const User = require("../src/user");

describe("Deleting User Record From DB", () => {
  let joe

  beforeEach((done) => {
    const joe = new User({name: "joe"});

    joe.save()
      .then(() => {
        done();
      });
  });

  it("Removes a user from the collection",(done) => {
    
  });


});

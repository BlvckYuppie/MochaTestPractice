const assert = require('assert');
const User = require("../src/user");

describe("Creating Records", ()=>{
  it("saves a user", function (done){
    this.timeout(5000)
    const joe = new User({name: "Joe"});
    joe.save()
      .then(() => {
        assert(!joe.isNew);
        done();
      });
  });
});

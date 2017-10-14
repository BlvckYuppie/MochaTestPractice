const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


before((done) => {
  mongoose.connect("mongodb://localhost:users_test/users_test");
  mongoose.connection
    .once("open",() => {
      done();
    })
    .on("error", (error) => {
      console.warn("Warning", error);
    });
});


beforeEach((done) => {
  return mongoose.connection.collections.users.drop(() => {
    done();
  });
});

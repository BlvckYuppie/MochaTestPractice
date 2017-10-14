const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:users_test/users_test");
mongoose.connection
  .once("open", () => console.log("DB Running =]"))
  .on("error", (error) => {
    console.warn("Warning", error);
  });

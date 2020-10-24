const mongoose = require("mongoose");
const app = require("./app");

mongoose
  .connect(
    "mongodb+srv://SWE497:r2EZjzEGpFjFOuRD@cluster0-fuyka.mongodb.net/SWE497?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    }
  )
  .then(c => {
    console.log("Yeah");
  });

const PORT = process.env.PORT || 8000;

app.listen(PORT);

//database: mongodb+srv://SWE497:r2EZjzEGpFjFOuRD@cluster0-fuyka.mongodb.net/SWE497?retryWrites=true&w=majority
//database password: r2EZjzEGpFjFOuRD

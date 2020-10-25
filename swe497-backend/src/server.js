const app = require("./app");
const connectDB = require("./config/db");

// Connect to the database
connectDB();

const PORT = process.env.PORT || 8000;

app.listen(PORT);

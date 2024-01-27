const express = require("express");
const cors = require("cors");
const connectToMongo = require("./db");

connectToMongo();

const app = express();
const PORT = 3000;

app.use(
  cors({ origin: "https://login-page-mern-pi.vercel.app", credentials: true })
);

// Middlewares
app.use(express.json()); // to read json request from user

// Endpoints
app.use("/auth", require("./routes/auth"));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

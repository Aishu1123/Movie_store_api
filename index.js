
const express = require("express");
const PORT = 4500;
const { connection } = require("./db");
const { movieRouter } = require("./routes/movie.routes");

const app = express();

app.use(express.json());

app.use("/", movieRouter);

app.listen( PORT, async () => {
  try {
    
    await connection;
     console.log(`Server is running at http://localhost:${PORT}`);
    console.log("Database Connected");
  } 
  catch (err) {
    console.log(err);
  }
});
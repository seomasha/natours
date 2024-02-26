const express = require("express");
const port = 3000;
const app = express();

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Hello from the server side!", app: "Natours" });
});

app.post("/", (req, res) => {
  res.status(200).send("You can post to this URL");
});

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send("MERN DevOps Project Running Successfully");
});

app.listen(6000, () => {
  console.log("Server running on port 6000");
});

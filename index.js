const express = require("express");
const app = express();

// allows us to parse the body of an incoming request
app.use(express.json());

const port = process.env.PORT || 5500;

app.get("/", (req, resp) => {
  resp.send("working");
});

app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;

const routers = require("./routers/index");
app.use(cors());
app.use(express.urlencoded({ extended: true })); // ini untuk baca request body, kalau gk di pasang maka nanti undefined
app.use(express.json());

app.use(routers);
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// module.exports= app

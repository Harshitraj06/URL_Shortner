const express = require("express");
const path = require("path")
const {connectToMongoDb} = require("./connect")
const urlRoute = require("./routes/url")
const URL = require("./models/url")
const staticRoute = require("./routes/staticRouter")
const app = express();
const PORT = 8001;

connectToMongoDb("mongodb://127.0.0.1:27017/short-url")
.then(() => console.log("MongoDb Connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended: false})); 

app.use("/url", urlRoute);
app.use("/", staticRoute);

app.get("/url/:shortId", async(req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate({
    shortId
  }, {$push:{
    visitHistory:{
     timestamp :  Date.now()
    },
  }
  })
  res.redirect(entry.reDirectUrl)
})



app.listen(PORT, () => console.log(`Server started at PORT : ${PORT}`));
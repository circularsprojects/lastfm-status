const express = require("express")
const axios = require("axios")
require("dotenv").config()

const app = express()

var lastResponseTime = 0
var lastResponse = ""
var cacheTime = 10000

async function getLastFMStatus() {
  var url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=circular_&api_key=${process.env.LastFM}&format=json&limit=1`
  if (Date.now() - lastResponseTime < cacheTime) {
    return lastResponse
  } else {
    var response = await axios.get(url)
    lastResponseTime = Date.now()
    lastResponse = JSON.stringify(response.data)
    return lastResponse
  }
}

app.get("/", async (req, res) => {
  var status = await getLastFMStatus()
  res.header("Content-Type",'application/json');
  res.header("Access-Control-Allow-Origin", "*");
  res.status(200)
  res.send(status)
})

app.listen(3002, () => {
  console.log("Server is running on port 3002")
});

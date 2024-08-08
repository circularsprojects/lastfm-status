const express = require("express")
const axios = require("axios")
require("dotenv").config()

const app = express()

async function getLastFMStatus() {
  var url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=circular_&api_key=${process.env.LastFM}&format=json&limit=5`
  var response = await axios.get(url)
  //console.log(JSON.stringify(response.data))
  return JSON.stringify(response.data)
}

app.get("/", async (req, res) => {
  var status = await getLastFMStatus()
  res.send(status)
})

app.listen(3002, () => {
  console.log("Server is running on port 3002")
});

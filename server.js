const envConfig = require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const port = 3000
const app = express()
app.use(cors())
app.use(bodyParser.json())

////// OpenAI config goes here //////

app.post('/chat', async (req, res) => {
  // Open AI request goes here
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

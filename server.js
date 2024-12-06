const envConfig = require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const port = 3000
const app = express()
app.use(cors())
app.use(bodyParser.json())

////// OpenAI config //////
const { OpenAI } = require('openai')

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

// OpenAI chat completion
app.post('/chat', async (req, res) => {
  const messages = req.body.messages
  console.log(messages)
  try {
    if (messages == null) {
      throw new Error('We have a problem - no prompt was provided')
    }

    const response = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages
    })
    const completion = response.choices[0].message
    console.dir(response.choices[0], { depth: 4 })
    return res.status(200).json({
      success: true,
      message: completion
    })
  } catch (error) {
    console.log(error.message)
  }
})

////// Token Counter //////
////// require gpt-3-encoder here

app.post('/tokenize', async (req, res) => {
  // gpt-3-encoder logic goes here
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

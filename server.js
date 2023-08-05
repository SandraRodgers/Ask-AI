const envConfig = require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const multer = require('multer')
const upload = multer()

const port = 3000
const app = express()
app.use(cors())
app.use(bodyParser.json())

////// OpenAI config //////
const { Configuration, OpenAIApi } = require('openai')
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)

// OpenAI chat completion
app.post('/chat', async (req, res) => {
  const messages = req.body.messages
  console.log(messages)
  try {
    if (messages == null) {
      throw new Error('We have a problem - no prompt was provided')
    }

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages
    })
    const completion = response.data.choices[0].message
    console.dir(response.data.choices[0])
    return res.status(200).json({
      success: true,
      message: completion
    })
  } catch (error) {
    console.log(error.message)
  }
})

////// Token Counter //////
const { encode } = require('gpt-3-encoder')

// Token Counter
app.post('/tokenize', async (req, res) => {
  const str = req.body.stringToTokenize
  try {
    if (str == null) {
      throw new Error('No string was provided')
    }
    const encoded = encode(str)
    const length = encoded.length
    console.log('Token count is ' + length)
    return res.status(200).json({
      success: true,
      tokens: length
    })
  } catch (error) {
    console.log(error.message)
  }
})

////// Deepgram config //////
const { Deepgram } = require('@deepgram/sdk')
const deepgram = new Deepgram(process.env.DG_API)

// Deepgram transcription
app.post('/dg-transcription', upload.single('file'), async (req, res) => {
  try {
    console.log(req.file)
    const dgResponse = await deepgram.transcription.preRecorded(
      {
        buffer: req.file.buffer,
        mimetype: req.file.mimetype
      },
      {
        punctuate: true,
        model: 'nova'
      }
    )
    console.dir(dgResponse.results, { depth: 4 })
    res.send({ transcript: dgResponse })
  } catch (e) {
    console.log('error', e)
  }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

////// LangChain Config here //////

// langchain endpoint
app.post('/chain', async (req, res) => {})

// clear memory endpoint
app.get('/clear-chain', async (req, res) => {})

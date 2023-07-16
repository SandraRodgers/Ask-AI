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

////// Replicate config //////
const Replicate = require('replicate')
const replicate = new Replicate({
  auth: process.env.REPLICATE
})

const miniGPT =
  'daanelson/minigpt-4:b96a2f33cc8e4b0aa23eacfce731b9c41a7d9466d9ed4e167375587b54db9423'

// Replicate (minigpt) image analyzer
app.post('/minigpt', async (req, res) => {
  try {
    const miniGPTResponse = await replicate.run(miniGPT, {
      input: {
        image: req.body.image,
        prompt: req.body.prompt
      }
    })
    res.send({ message: miniGPTResponse })
  } catch (e) {
    console.log('error', e)
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

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

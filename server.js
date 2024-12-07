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

////// Deepgram config //////
const { createClient } = require('@deepgram/sdk')
const deepgram = createClient(process.env.DG_API)

// Deepgram transcription
app.post('/dg-transcription', upload.single('file'), async (req, res) => {
  try {
    console.log(req.file)
    if (!req.file) {
      return res.status(400).send('No file uploaded')
    }

    const audioBuffer = req.file.buffer

    const response = await deepgram.listen.prerecorded.transcribeFile(audioBuffer, {
      punctuate: true,
      model: 'nova-2'
    })

    console.dir(response, { depth: 4 })

    res.send({ transcript: response.result })
  } catch (e) {
    console.error('Error:', e)
    res.status(500).send('An error occurred during transcription')
  }
})

////// Replicate config //////
const ReplicateAPI = require('replicate')
const replicate = new ReplicateAPI({
  auth: process.env.REPLICATE
})

// Replicate (minigpt) image analyzer
app.post('/minigpt', async (req, res) => {
  try {
    const miniGPTResponse = await replicate.run(
      'daanelson/minigpt-4:e447a8583cffd86ce3b93f9c2cd24f2eae603d99ace6afa94b33a08e94a3cd06',
      {
        input: {
          image: req.body.image,
          prompt: req.body.prompt
        }
      }
    )
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

////// LangChain Config //////
const { OpenAI: OpenAIClient } = require('@langchain/openai')
const { BufferMemory } = require('langchain/memory')
const { ConversationChain } = require('langchain/chains')

const model = new OpenAIClient({})
const memory = new BufferMemory()
const chain = new ConversationChain({ llm: model, memory: memory })
let chainNum = 0

app.post('/chain', async (req, res) => {
  chainNum++
  const messages = req.body.messages
  console.log(chainNum)
  if (chainNum === 1) {
    const firstResponse = await chain.call({ input: messages[0].content })
    console.log(firstResponse)
    const secondResponse = await chain.call({ input: messages[1].content })
    console.log(secondResponse)
    const thirdResponse = await chain.call({ input: messages[2].content })
    console.log(thirdResponse)
    return res.status(200).json({
      success: true,
      message: thirdResponse.response
    })
  } else {
    const nextResponse = await chain.call({ input: messages[2].content })
    console.log(nextResponse)
    return res.status(200).json({
      success: true,
      message: nextResponse.response
    })
  }
})

app.get('/clear-chain', async (req, res) => {
  memory.clear()
  chainNum = 0
  return res.status(200).json({
    success: true,
    message: 'Memory is clear!'
  })
})

////// Replicate + Langchain config //////

const { Replicate } = require('langchain/llms/replicate')

const replicateModel = new Replicate({
  model: 'daanelson/minigpt-4:b96a2f33cc8e4b0aa23eacfce731b9c41a7d9466d9ed4e167375587b54db9423',
  apiKey: process.env.REPLICATE
})

const replicateMemory = new BufferMemory()
const replicateChain = new ConversationChain({ llm: replicateModel, memory: replicateMemory })
let replicateChainNum = 0

app.post('/replicate-chain', async (req, res) => {
  console.log(req.body)
  replicateChainNum++
  console.log(replicateChainNum)
  if (replicateChainNum === 1) {
    // send image only on first request
    replicateModel.input.image = req.body.image
    const firstResponse = await replicateChain.call({ input: req.body.prompt })
    console.log(firstResponse)
    return res.status(200).json({
      success: true,
      message: firstResponse.response
    })
  } else {
    console.log('else statement')

    const nextResponse = await replicateChain.call({
      input: req.body.prompt
    })
    console.log(nextResponse)
    return res.status(200).json({
      success: true,
      message: nextResponse.response
    })
  }
})

app.get('/clear-replichain', async (req, res) => {
  replicateMemory.clear()
  replicateChainNum = 0
  return res.status(200).json({
    success: true,
    message: 'Memory is clear!'
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

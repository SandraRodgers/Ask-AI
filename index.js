const envConfig = require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const port = 3000
const app = express()
app.use(cors())
app.use(bodyParser.json())

const Replicate = require('replicate')
const replicate = new Replicate({
  auth: process.env.REPLICATE
})

app.post('/minigpt', async (req, res) => {
  try {
    const miniGPTResponse = await replicate.run(
      'daanelson/minigpt-4:b96a2f33cc8e4b0aa23eacfce731b9c41a7d9466d9ed4e167375587b54db9423',
      {
        input: {
          image: req.body.image,
          prompt: req.body.prompt
        }
      }
    )
    res.send({ apiCall: miniGPTResponse })
  } catch (e) {
    console.log('error', e)
  }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

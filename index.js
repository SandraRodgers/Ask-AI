const envConfig = require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

// const multer = require('multer')
// const fs = require('fs').promises

const port = 3000
const app = express()
app.use(cors())
app.use(bodyParser.json())

const Replicate = require('replicate')
const replicate = new Replicate({
  auth: process.env.REPLICATE
})

// const storage = multer.diskStorage({
//   filename: function (req, file, cb) {
//     console.log('filename', file.originalname)
//     cb(null, file.originalname)
//   },
//   destination: function (req, file, cb) {
//     cb(null, './uploads')
//   }
// })

// const upload = multer({
//   storage
// })

// app.post('/upload_file', upload.single('file'), (req, res) => {
//   res.send({ filepath: req.file.filename })
// })

// function convertFilePathToURL(filePath) {
//   const baseUrl = 'http://localhost:5173/uploads' // Replace with the base URL of your server

//   // Remove the leading slash from the file path if it exists
//   const trimmedPath = filePath.startsWith('/uploads') ? filePath.slice(1) : filePath

//   // Construct the HTTP URL by appending the file path to the base URL
//   const url = `${baseUrl}/${trimmedPath}`
//   console.log(url)
//   return url
// }

app.post('/minigpt', async (req, res) => {
  console.log(req.body)
  // const imageUrl = convertFilePathToURL(req.body.filepath)
  // // Read the file into a buffer
  // const data = await fs.readFile(req.body.filepath, 'utf-8')
  // // Convert the buffer into a base64-encoded string
  // const base64 = data.toString('base64')
  // // Set MIME type for PNG image
  // const mimeType = 'image/png'
  // // Create the data URI
  // const dataURI = `data:${mimeType};base64,${base64}`
  // // console.log(dataURI)

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

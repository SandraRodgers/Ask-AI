import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useImageChatStore = defineStore('imageChat', () => {
  const file = ref({})
  const questions = ref('')
  const prompt = ref([])
  const gptResponse = ref('')
  const description = ref('')
  const numQuestions = ref(1)
  const questionIncrement = ref({})
  const tokenLength = ref(0)
  const tokenLoading = ref(false)
  const isDescribing = ref(false)
  const isLoadingGPT = ref(false)
  const filepath = ref('')
  const imageURL = ref('')

  // watch(imageURL, () => {
  //   describeImage()
  // })

  function describeImage() {
    if (file.value === 0) {
      alert('Please add an image')
    } else {
      createPrompt()
      // const formData = new FormData()
      // console.log(imageURL.value)
      // formData.append('image', imageURL.value)
      // formData.append('filepath', filepath.value)
    }
  }
  function createPrompt() {
    // const instructions = {
    //   role: 'system',
    //   content: 'You will answer questions about the following description of an image.'
    // }

    // const descriptionToAnalyze = { role: 'user', content: description.value }

    // concatenate list of questions into one string:
    let num = 0
    for (const property in questionIncrement.value) {
      num++
      questions.value += ` Question ${num}: ${questionIncrement.value[property]}? `
    }
    // const chatQuestion = { role: 'user', content: questions.value }

    // create prompt array
    // prompt.value.push(instructions)
    // prompt.value.push(descriptionToAnalyze)
    // prompt.value.push(questions.value)
    isDescribing.value = true
    fetch('http://localhost:3000/minigpt', {
      method: 'POST',
      body: JSON.stringify({
        image: imageURL.value,
        prompt: questions.value
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        description.value = data.apiCall
        file.value = {}
        // checkTokens()
        isDescribing.value = false
      })

    // if (description.value) {
    //   sendPrompt()
    // } else {
    //   alert('Please transcribe an audio file.')
    //   prompt.value = []
    // }
  }

  return {
    questions,
    prompt,
    file,
    describeImage,
    description,
    createPrompt,
    // sendPrompt,
    gptResponse,
    isDescribing,
    filepath,
    imageURL,
    numQuestions,
    questionIncrement
  }
})

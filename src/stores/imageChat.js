import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useImageChatStore = defineStore('imageChat', () => {
  // const file = ref({})
  const questions = ref('')
  const prompt = ref([])
  const gptResponse = ref('')
  const description = ref('')
  const numQuestions = ref(1)
  const question = ref('')
  const isDescribing = ref(false)
  // const filepath = ref('')
  const imageURL = ref('')
  const questionAnswerList = ref([])

  function describeImage() {
    if (file.value === 0) {
      alert('Please add an image')
    } else {
      createPrompt()
    }
  }
  function createPrompt() {
    // concatenate list of questions into one string:
    // let num = 0
    // for (const property in multipleQuestions.value) {
    //   num++
    //   questions.value += ` Question ${num}: ${multipleQuestions.value[property]}? `
    // }

    isDescribing.value = true
    fetch('http://localhost:3000/replicate-chain', {
      method: 'POST',
      body: JSON.stringify({
        image: imageURL.value,
        prompt: question.value
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        questionAnswerList.value.push({
          question: question.value,
          answer: data.message
        })
        // description.value = data.apiCall
        // file.value = {}
        isDescribing.value = false
      })
  }

  function clearChat() {
    // file.value = {}
    questions.value = ''
    prompt.value = []
    gptResponse.value = ''
    description.value = ''
    numQuestions.value = 1
    question.value = ''
    isDescribing.value = false
    // filepath.value = ''
    imageURL.value = ''
    questionAnswerList.value = []
  }

  return {
    questions,
    prompt,
    // file,
    describeImage,
    description,
    createPrompt,
    gptResponse,
    isDescribing,
    // filepath,
    imageURL,
    numQuestions,
    question,
    clearChat,
    questionAnswerList
  }
})

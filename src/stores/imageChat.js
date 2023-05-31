import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useImageChatStore = defineStore('imageChat', () => {
  const file = ref({})
  const questions = ref('')
  const prompt = ref([])
  const gptResponse = ref('')
  const description = ref('')
  const numQuestions = ref(1)
  const questionIncrement = ref({})
  const isDescribing = ref(false)
  const filepath = ref('')
  const imageURL = ref('')

  function describeImage() {
    if (file.value === 0) {
      alert('Please add an image')
    } else {
      createPrompt()
    }
  }
  function createPrompt() {
    // concatenate list of questions into one string:
    let num = 0
    for (const property in questionIncrement.value) {
      num++
      questions.value += ` Question ${num}: ${questionIncrement.value[property]}? `
    }

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
        isDescribing.value = false
      })
  }

  return {
    questions,
    prompt,
    file,
    describeImage,
    description,
    createPrompt,
    gptResponse,
    isDescribing,
    filepath,
    imageURL,
    numQuestions,
    questionIncrement
  }
})

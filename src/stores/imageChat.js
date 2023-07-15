import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useImageChatStore = defineStore('imageChat', () => {
  const file = ref({})
  const questions = ref('')
  const prompt = ref([])
  const gptResponse = ref('')
  const description = ref('')
  const numQuestions = ref(1)
  const multipleQuestions = ref({})
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
    for (const property in multipleQuestions.value) {
      num++
      questions.value += ` Question ${num}: ${multipleQuestions.value[property]}? `
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

  function clearChat() {
    file.value = {}
    questions.value = ''
    prompt.value = []
    gptResponse.value = ''
    description.value = ''
    numQuestions.value = 1
    multipleQuestions.value = {}
    isDescribing.value = false
    filepath.value = ''
    imageURL.value = ''
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
    multipleQuestions,
    clearChat
  }
})

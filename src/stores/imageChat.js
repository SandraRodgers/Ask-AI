import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useImageChatStore = defineStore('imageChat', () => {
  const prompt = ref([])
  const miniGPTResponse = ref('')
  const question = ref('')
  const imageURL = ref('')
  const questionAnswerList = ref([])

  function createPrompt() {
    // use replicate + langchain endpoint
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
        miniGPTResponse.value = data.message
        questionAnswerList.value.push({
          question: question.value,
          answer: data.message
        })
        question.value = ''
      })
  }

  function clearChat() {
    prompt.value = []
    miniGPTResponse.value = ''
    question.value = ''
    imageURL.value = ''
    questionAnswerList.value = []
    // clear memory in server:
    fetch('http://localhost:3000/clear-replichain').then((response) => response.json())
  }

  return {
    prompt,
    miniGPTResponse,
    createPrompt,
    imageURL,
    question,
    clearChat,
    questionAnswerList
  }
})

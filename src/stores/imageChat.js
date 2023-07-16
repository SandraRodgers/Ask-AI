import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useImageChatStore = defineStore('imageChat', () => {
  const prompt = ref([])
  const miniGPTResponse = ref('')
  const question = ref('')
  const isThinking = ref(false)
  const imageURL = ref('')
  const questionAnswerList = ref([])

  function createPrompt() {
    isThinking.value = true
    fetch('http://localhost:3000/minigpt', {
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
        miniGPTResponse.value = data.message
        questionAnswerList.value.push({
          question: question.value,
          answer: data.message
        })
        isThinking.value = false
        question.value = ''
      })
  }

  function clearChat() {
    prompt.value = []
    miniGPTResponse.value = ''
    question.value = ''
    isThinking.value = false
    imageURL.value = ''
    questionAnswerList.value = []
  }

  return {
    prompt,
    miniGPTResponse,
    createPrompt,
    isThinking,
    imageURL,
    question,
    clearChat,
    questionAnswerList
  }
})

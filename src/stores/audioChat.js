import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTextChatStore = defineStore('textChat', () => {
  // state properties
  const text = ref('') // Text we want OpenAI to analyze
  const question = ref('') // Question we want to ask OpenAI about the text
  const prompt = ref([]) // Prompt built as messages array
  const gptResponse = ref('') // Response from OpenAI

  // actions
  function createPrompt() {}

  function sendPrompt() {}

  function clearChat() {}

  return { text, question, prompt, gptResponse, createPrompt, sendPrompt, clearChat }
})

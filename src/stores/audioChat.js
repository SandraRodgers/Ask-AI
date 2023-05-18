import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAudioChatStore = defineStore('audioChat', () => {
  const text = ref('')
  const question = ref('')
  const prompt = ref([])
  const gptResponse = ref('')

  function createPrompt() {}

  function sendPrompt() {}

  return { text, question, prompt, createPrompt, sendPrompt, gptResponse }
})

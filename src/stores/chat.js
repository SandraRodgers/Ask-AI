import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useChatStore = defineStore('chat', () => {
  const text = ref('')
  const question = ref('')

  return { text, question }
})

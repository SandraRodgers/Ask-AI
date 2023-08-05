import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAudioChatStore = defineStore('audioChat', () => {
  const file = ref({})
  const transcript = ref('')

  function transcribeFile() {}

  return {
    file,
    transcript
  }
})

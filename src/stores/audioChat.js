import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAudioChatStore = defineStore('audioChat', () => {
  const file = ref({})
  const transcript = ref('')

  function transcribeFile() {
    if (file.value === 0) {
      alert('Please attach a file')
    } else {
      const formData = new FormData()
      formData.append('file', file.value.value)
      fetch('http://localhost:3000/dg-transcription', {
        method: 'POST',
        body: formData
      })
        .then((response) => response.json())
        .then((data) => {
          transcript.value = data.transcript.results.channels[0].alternatives[0].transcript
          file.value = {}
        })
    }
  }

  return {
    file,
    transcribeFile,
    transcript
  }
})

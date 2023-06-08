import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useTokenizeStore } from './tokenize'

export const useAudioChatStore = defineStore('audioChat', () => {
  const tokenizeStore = useTokenizeStore()
  const file = ref({})
  const text = ref('')
  const questions = ref('')
  const prompt = ref([])
  const gptResponse = ref('')
  const transcript = ref('')
  const numQuestions = ref(1)
  const questionIncrement = ref({})
  const isTranscribing = ref(false)
  const isLoadingGPT = ref(false)
  const clearFile = ref(false)

  function transcribeFile() {
    if (file.value === 0) {
      alert('Please attach a file')
    } else {
      const formData = new FormData()
      console.log(file)
      formData.append('file', file.value.value)
      isTranscribing.value = true
      fetch('http://localhost:3000/dg-transcription', {
        method: 'POST',
        body: formData
      })
        .then((response) => response.json())
        .then((data) => {
          transcript.value = data.apiCall.results.channels[0].alternatives[0].transcript
          file.value = {}

          isTranscribing.value = false
        })
    }
  }

  function createPrompt() {
    const instructions = {
      role: 'system',
      content:
        'You will answer questions about the following text that has been transcribed from an audio file.'
    }

    const transcriptToAnalyze = { role: 'user', content: transcript.value }

    // concatenate list of questions into one string:
    let num = 0
    for (const property in questionIncrement.value) {
      num++
      questions.value += ` Question ${num}: ${questionIncrement.value[property]}? `
    }
    const chatQuestion = { role: 'user', content: questions.value }

    // create prompt array
    prompt.value.push(instructions)
    prompt.value.push(transcriptToAnalyze)
    prompt.value.push(chatQuestion)
    tokenizeStore.checkTokens(
      instructions.content + transcriptToAnalyze.content + chatQuestion.content
    )

    if (transcript.value) {
      sendPrompt()
    } else {
      alert('Please transcribe an audio file.')
      prompt.value = []
    }
  }

  function sendPrompt() {
    if (transcript.value.length === 0) {
      alert('You have not added any transcript to analyze.')
    } else {
      isLoadingGPT.value = true

      fetch('http://localhost:3000/chat', {
        method: 'POST',
        body: JSON.stringify({
          messages: prompt.value
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => response.json())
        .then((data) => {
          isLoadingGPT.value = false
          gptResponse.value = data.message.content
        })
    }
  }

  function clearChat() {
    file.value = {}
    text.value = ''
    questions.value = ''
    prompt.value = []
    gptResponse.value = ''
    transcript.value = ''
    numQuestions.value = 1
    questionIncrement.value = {}
    isTranscribing.value = false
    isLoadingGPT.value = false
    tokenizeStore.tokenLength = 0
    clearFile.value = true
  }

  return {
    text,
    questions,
    prompt,
    createPrompt,
    sendPrompt,
    gptResponse,
    file,
    transcribeFile,
    transcript,
    numQuestions,
    questionIncrement,
    isTranscribing,
    isLoadingGPT,
    clearChat,
    clearFile
  }
})

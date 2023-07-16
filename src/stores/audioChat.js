import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useTokenizeStore } from './tokenize'

export const useAudioChatStore = defineStore('audioChat', () => {
  const tokenizeStore = useTokenizeStore()
  const file = ref({})
  const prompt = ref([])
  const gptResponse = ref('')
  const transcript = ref('')
  const question = ref('')
  const isTranscribing = ref(false)
  const isLoadingGPT = ref(false)
  const clearFile = ref(false)
  const questionAnswerList = ref([])

  function transcribeFile() {
    if (file.value === 0) {
      alert('Please attach a file')
    } else {
      const formData = new FormData()
      formData.append('file', file.value.value)
      isTranscribing.value = true
      fetch('http://localhost:3000/dg-transcription', {
        method: 'POST',
        body: formData
      })
        .then((response) => response.json())
        .then((data) => {
          transcript.value = data.transcript.results.channels[0].alternatives[0].transcript
          file.value = {}

          isTranscribing.value = false
        })
    }
  }

  function createPrompt() {
    prompt.value = []
    const instructions = {
      role: 'system',
      content:
        'You will answer questions about the following text that has been transcribed from an audio file.'
    }
    const transcriptToAnalyze = { role: 'user', content: transcript.value }
    const chatQuestion = { role: 'user', content: question.value }
    ///create prompt array
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
        // array to save the conversation
        questionAnswerList.value.push({
          question: question.value,
          answer: data.message.content
        })
        question.value = ''
      })
  }

  function clearChat() {
    file.value = {}
    prompt.value = []
    gptResponse.value = ''
    transcript.value = ''
    question.value = ''
    isTranscribing.value = false
    isLoadingGPT.value = false
    tokenizeStore.tokenLength = 0
    clearFile.value = true
    questionAnswerList.value = []
  }

  return {
    prompt,
    createPrompt,
    sendPrompt,
    gptResponse,
    file,
    transcribeFile,
    transcript,
    question,
    isTranscribing,
    isLoadingGPT,
    clearChat,
    clearFile,
    questionAnswerList
  }
})

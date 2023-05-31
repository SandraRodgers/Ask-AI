import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTokenizeStore = defineStore('tokenize', () => {
  const tokenLength = ref(0)
  const tokenLoading = ref(false)

  function checkTokens(val) {
    tokenLength.value = 0
    tokenLoading.value = true
    fetch('https://OpenAI-Deepgram-Server.sandrar.repl.co/tokenize', {
      method: 'POST',
      body: JSON.stringify({
        string: val
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        tokenLoading.value = false
        tokenLength.value = data.tokens
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return { checkTokens, tokenLength }
})

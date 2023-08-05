import { defineStore } from 'pinia'

export const useTokenizeStore = defineStore('tokenize', () => {
  const tokenLength = ref(0)

  function checkTokens(val) {
    // check tokens fetch request
  }
  return { checkTokens, tokenLength }
})

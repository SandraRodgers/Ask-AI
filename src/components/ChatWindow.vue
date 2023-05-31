<script setup>
import { useTextChatStore } from '../stores/textChat'
import Loading from './Loading.vue'
const textChatStore = useTextChatStore()

function sendQuestion() {
  textChatStore.createPrompt()
  textChatStore.sendPrompt()
}
</script>

<template>
  <div>
    <div class="flex rounded-md shadow-sm mt-4">
      <div class="relative flex flex-grow items-stretch focus-within:z-10">
        <input v-model="textChatStore.question" class="input-button" placeholder="Send a message" />
      </div>

      <button
        @click="sendQuestion()"
        type="button"
        class="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 text-sm font-semibold bg-[#1a1a21] text-green-500 ring-1 ring-inset ring-gray-300 hover:bg-[#32a16f]"
      >
        <span class="text-green-100">submit</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 text-green-400"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
          />
        </svg>
      </button>
    </div>
    <loading :loadingState="textChatStore.isLoadingGPT" loadingMessage="Loading" />
  </div>
</template>

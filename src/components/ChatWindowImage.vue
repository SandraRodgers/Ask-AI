<script setup>
import { ref } from 'vue'
import { useImageChatStore } from '../stores/imageChat'
import Loading from './Loading.vue'
import { useTokenizeStore } from '../stores/tokenize'
const imageChatStore = useImageChatStore()
const tokenizeStore = useTokenizeStore()
function sendQuestion() {
  imageChatStore.createPrompt()
}
</script>

<template>
  <div>
    <div class="flex rounded-md mt-4">
      <div class="relative flex flex-col flex-grow items-stretch">
        <div>
          <div class="flex shadow-sm mb-4">
            <input
              v-model="imageChatStore.question"
              class="question-input"
              placeholder="Send a message"
            />
            <button
              @click="sendQuestion()"
              type="button"
              class="chat-button group relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 text-sm font-semibold bg-[#1a1a21] text-green-500 ring-1 ring-inset ring-gray-300"
            >
              <span class="text-green-100 group-hover:bg-[#42b983]">submit</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 text-green-400 group-hover:bg-[#42b983]"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            </button>
          </div>
        </div>
        <div v-if="tokenizeStore.tokenLength" class="text-xs mt-1 mb-4">
          Token length: {{ tokenizeStore.tokenLength }}
        </div>
        <div v-for="(chat, i) in imageChatStore.questionAnswerList" :key="chat.question">
          <p class="font-bold">Question {{ i + 1 }}: {{ chat.question }}</p>
          <p
            class="block w-full rounded-md border-0 bg-green-900 text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:p-4 sm:text-sm sm:leading-6 text-sm my-4"
          >
            {{ chat.answer }}
          </p>
        </div>
      </div>
    </div>
    <loading :loadingState="imageChatStore.isThinking" loadingMessage="Loading" />
  </div>
</template>

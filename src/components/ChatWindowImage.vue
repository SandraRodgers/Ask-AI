<script setup>
import { useImageChatStore } from '../stores/imageChat'
import Loading from './Loading.vue'

const imageChatStore = useImageChatStore()

function sendQuestion() {
  imageChatStore.createPrompt()
}
</script>

<template>
  <div>
    <div class="flex rounded-md mt-4">
      <div class="relative flex flex-col flex-grow items-stretch">
        <div v-for="(num, index) in imageChatStore.numQuestions" :key="num">
          <div class="flex shadow-sm mb-4">
            <input
              v-model="imageChatStore.questionIncrement[`question${index}`]"
              class="question-input"
              placeholder="Ask AI about the text"
            />
            <button
              v-if="num === imageChatStore.numQuestions"
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
        <div class="flex justify-center">
          <button
            @click="imageChatStore.numQuestions++"
            type="button"
            class="flex items-center rounded-md text-green-100 ring-1 hover:ring-2 ring-inset ring-gray-300 px-3 py-1 shadow-sm mt-10 text-2xl"
          >
            + <span class="text-sm font-semibold ml-2">add question</span>
          </button>
        </div>
      </div>
    </div>
    <loading :loadingState="imageChatStore.isDescribing" loadingMessage="Loading" />
  </div>
</template>

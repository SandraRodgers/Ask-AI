<script setup>
import { useAudioChatStore } from '../stores/audioChat'
import Loading from './Loading.vue'

const audioChatStore = useAudioChatStore()

function sendQuestion() {
  audioChatStore.createPrompt()
}
</script>

<template>
  <div>
    <div class="flex rounded-md mt-4">
      <div class="relative flex flex-col flex-grow items-stretch">
        <div v-for="(num, index) in audioChatStore.numQuestions" :key="num">
          <div class="flex shadow-sm mb-4">
            <input
              v-model="audioChatStore.questionIncrement[`question${index}`]"
              class="input-button"
              placeholder="Send a message"
            />
            <button
              v-if="num === audioChatStore.numQuestions"
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
        </div>
        <div class="flex justify-center">
          <button
            @click="audioChatStore.numQuestions++"
            type="button"
            class="rounded-md text-green-100 ring-1 hover:ring-2 ring-inset ring-gray-300 hover:bg-[#32a16f] px-3 py-1 shadow-sm mt-10 text-2xl"
          >
            +
          </button>
        </div>
      </div>
    </div>
    <loading :loadingState="audioChatStore.isLoadingGPT" loadingMessage="Loading" />
  </div>
</template>

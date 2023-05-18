<script setup>
import { useChatStore } from '../stores/chat'

const chatStore = useChatStore()
</script>

<template>
  <div>
    <div class="flex rounded-md shadow-sm mt-4">
      <div class="relative flex flex-grow items-stretch focus-within:z-10">
        <input
          v-model="chatStore.question"
          type="text"
          name="question"
          id="question"
          class="block w-full rounded-none rounded-l-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Send a message"
        />
      </div>
      <button
        type="button"
        class="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-200"
      >
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
</template>

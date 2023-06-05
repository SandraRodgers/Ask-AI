<script setup>
import Transcriber from '../components/Transcriber.vue'
import Uploader from '../components/Uploader.vue'
import ChatWindowAudio from '../components/ChatWindowAudio.vue'
import { useAudioChatStore } from '../stores/audioChat'
import { useTokenizeStore } from '../stores/tokenize'
const audioChatStore = useAudioChatStore()
const tokenizeStore = useTokenizeStore()
</script>

<template>
  <article class="grid grid-cols-1 lg:grid-cols-2 gap-x-8">
    <div class="mt-4">
      <h3>Choose audio that has some speech that you would like to ask questions about.</h3>
      <section class="my-4"><uploader fileType="audio/*" /></section>

      <transcriber />
      <div
        v-if="audioChatStore.transcript.length > 0"
        class="block w-full rounded-md border-0 bg-blue-900 text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:p-4 sm:text-sm sm:leading-6 text-sm my-4"
      >
        {{ audioChatStore.transcript }}
      </div>
    </div>
    <div>
      <chat-window-audio page="audio" />
      <div
        v-if="audioChatStore.gptResponse.length > 0"
        class="block w-full rounded-md border-0 bg-green-900 text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:p-4 sm:text-sm sm:leading-6 text-sm my-4"
      >
        {{ audioChatStore.gptResponse }}
      </div>
      <div v-if="tokenizeStore.tokenLength" class="text-xs mt-1">
        Token length: {{ tokenizeStore.tokenLength }}
      </div>
    </div>
  </article>
  <div class="flex justify-end">
    <button @click="audioChatStore.clearChat()" class="button button-secondary">Clear</button>
  </div>
</template>

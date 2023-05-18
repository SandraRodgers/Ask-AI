<script setup>
import ChatWindow from '../components/ChatWindow.vue'
import TextBox from '../components/TextBox.vue'
import { useTextChatStore } from '../stores/textChat'
const textChatStore = useTextChatStore()
</script>

<template>
  <article class="grid grid-cols-2 gap-x-8">
    <div class="mt-4">
      <h3>Enter the text you would like to ask questions about.</h3>
      <section>
        <text-box />
      </section>
    </div>
    <div>
      <chat-window page="text" />
      <div
        class="block w-full rounded-md border-0 bg-green-50 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:p-4 sm:text-sm sm:leading-6 text-sm my-4"
      >
        {{ textChatStore.gptResponse }}
      </div>
    </div>
  </article>
</template>

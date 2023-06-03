<script setup>
import { useTextChatStore } from '../stores/textChat'

const textChatStore = useTextChatStore()
</script>

<template>
  <textarea
    rows="20"
    v-model="textChatStore.text"
    class="block w-full rounded-md border-0 text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:p-1.5 sm:text-sm sm:leading-6 text-sm my-4"
  />
</template>

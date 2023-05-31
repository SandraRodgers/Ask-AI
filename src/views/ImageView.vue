<script setup>
import ChatWindowImage from '../components/ChatWindowImage.vue'
import { useImageChatStore } from '../stores/imageChat'
const imageChatStore = useImageChatStore()
</script>

<template>
  <article class="grid grid-cols-2 gap-x-8">
    <div class="mt-4">
      <h3>Add an image URL that you would like to ask questions about.</h3>
      <section class="my-4">
        <input v-model="imageChatStore.imageURL" />
      </section>

      <img class="w-80 mt-10" :src="imageChatStore.imageURL" />
    </div>
    <div>
      <chat-window-image />

      <div
        v-if="imageChatStore.description.length > 0"
        class="block w-full rounded-md border-0 bg-green-900 text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:p-4 sm:text-sm sm:leading-6 text-sm my-4"
      >
        {{ imageChatStore.description }}
      </div>
    </div>
  </article>
</template>

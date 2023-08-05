<script setup>
import ChatWindowImage from '../components/ChatWindowImage.vue'
import { useImageChatStore } from '../stores/imageChat'
const imageChatStore = useImageChatStore()
</script>

<template>
  <article class="grid grid-cols-1 lg:grid-cols-2 gap-x-8">
    <div class="mt-4">
      <h3>Add an image URL that you would like to ask questions about.</h3>
      <section class="my-4">
        <input v-model="imageChatStore.imageURL" />
      </section>

      <img class="w-80 mt-10" :src="imageChatStore.imageURL" />
    </div>
    <div class="min-h-80 flex flex-col justify-between">
      <chat-window-image />
      <div class="flex justify-end">
        <button @click="imageChatStore.clearChat()" class="button button-secondary">Clear</button>
      </div>
    </div>
  </article>
</template>

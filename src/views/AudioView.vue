<script setup>
import Transcriber from '../components/Transcriber.vue'
import Uploader from '../components/Uploader.vue'
import ChatWindow from '../components/ChatWindow.vue'
</script>

<template>
  <article class="grid grid-cols-2 gap-x-8">
    <div class="mt-4">
      <h3>Choose an audio file that contains human speech</h3>
      <section class="my-4"><uploader fileType="audio/*" /></section>

      <transcriber />
    </div>
    <div><chat-window page="audio" /></div>
  </article>
</template>

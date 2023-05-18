<script setup>
import Uploader from '../components/Uploader.vue'
import ChatWindow from '../components/ChatWindow.vue'
</script>

<template>
  <article class="grid grid-cols-2 gap-x-8">
    <div class="mt-4">
      <h3>Choose an image file</h3>
      <section class="my-4"><uploader fileType="image/*" /></section>

      <transcriber />
    </div>
    <div><chat-window page="image" /></div>
  </article>
</template>

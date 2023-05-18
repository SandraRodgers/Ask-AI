<script setup>
import ChatWindow from '../components/ChatWindow.vue'
import TextBox from '../components/TextBox.vue'
</script>

<template>
  <h3 class="mt-4">Enter the text you would like to ask questions about.</h3>
  <div class="grid grid-cols-2 gap-x-8">
    <div>
      <text-box />
    </div>
    <div><chat-window /></div>
  </div>
</template>

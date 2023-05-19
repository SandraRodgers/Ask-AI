<script setup>
import { useAudioChatStore } from '../stores/audioChat'
const audioChatStore = useAudioChatStore()
</script>

<template>
  <div>
    <h3 class="mb-4">Transcribe the speech to text:</h3>
    <button @click="audioChatStore.transcribeFile()" class="button button-primary">
      Transcribe
    </button>
  </div>
</template>

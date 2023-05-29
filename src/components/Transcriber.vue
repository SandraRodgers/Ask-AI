<script setup>
import { useAudioChatStore } from '../stores/audioChat'
import Loading from './Loading.vue'
const audioChatStore = useAudioChatStore()
</script>

<template>
  <div>
    <h3 class="mb-4">Transcribe the speech to text:</h3>
    <button @click="audioChatStore.transcribeFile()" class="button button-primary">
      Transcribe
    </button>
    <loading :loadingState="audioChatStore.isTranscribing" loadingMessage="Transcribing..." />
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useFileDialog } from '@vueuse/core'
import { useAudioChatStore } from '../stores/audioChat'
import { storeToRefs } from 'pinia'
const audioChatStore = useAudioChatStore()
const { files, open, reset, onChange } = useFileDialog()
const { clearFile } = storeToRefs(audioChatStore)

watch(clearFile, () => {
  resetFile()
})

onChange((file) => {
  audioChatStore.file.value = file[0]
  audioChatStore.clearFile = false
})

function resetFile() {
  reset()
  audioChatStore.clearChat()
  audioChatStore.clearFile = false
}
</script>

<template>
  <div class="flex flex-col h-36">
    <div class="flex">
      <button type="button" name="file" @click="open()" class="button button-primary w-36 mr-2">
        Choose file
      </button>
      <button
        type="button"
        :disabled="!files"
        @click="resetFile()"
        class="button button-secondary w-36"
      >
        Reset
      </button>
    </div>

    <div class="mt-6" v-if="files">
      <li
        class="list-none font-semibold my-2 text-purple-300"
        v-for="file of files"
        :key="file.name"
      >
        {{ file.name }}
      </li>
    </div>
  </div>
</template>

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TextView from '../views/TextView.vue'
import AudioView from '../views/AudioView.vue'
import ImageView from '../views/ImageView.vue'
import { useTokenizeStore } from '../stores/tokenize'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/text',
      name: 'text',
      component: TextView
    },
    {
      path: '/audio',
      name: 'audio',
      component: AudioView
    },
    {
      path: '/image',
      name: 'image',
      component: ImageView
    }
  ]
})

export default router

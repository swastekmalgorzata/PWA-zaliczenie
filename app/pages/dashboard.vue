<template>
  <div class="max-w-5xl mx-auto">

    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl mb-2 font-medium">Welcome back, {{ auth.user?.name }}!</h1>
        <p class="text-gray-600">Track your academic progress</p>
      </div>
      <div class="flex items-center gap-3">
        
        <button
          class="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-200 bg-white text-red-500 hover:shadow-sm transition-all text-sm"
          @click="handleLogout"
        >
          <LogOut class="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>

    <!-- Cards -->
    <div class="flex justify-center">
      <div class="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 w-fit">
        <template v-for="card in navigationCards" :key="card.title">
          <NuxtLink v-if="card.active" :to="card.link">
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer h-full w-44">
              <div class="flex items-center justify-center mb-2">
                <div :class="['w-12 h-12 rounded-lg flex items-center justify-center', card.color]">
                  <component :is="card.icon" :class="['w-6 h-6', card.iconColor]" />
                </div>
              </div>
              <h3 class="text-center text-base font-medium min-h-[3rem] flex items-center justify-center">
                {{ card.title }}
              </h3>
              <p class="text-center text-xs text-gray-500 min-h-[2.5rem] leading-tight">{{ card.description }}</p>
            </div>
          </NuxtLink>

          <div v-else class="bg-white rounded-xl shadow-sm border border-gray-200 p-5 h-full w-44 opacity-50 cursor-not-allowed">
            <div class="flex items-center justify-center mb-2">
              <div :class="['w-12 h-12 rounded-lg flex items-center justify-center', card.color]">
                <component :is="card.icon" :class="['w-6 h-6', card.iconColor]" />
              </div>
            </div>
            <h3 class="text-center text-base font-medium min-h-[3rem] flex items-center justify-center">
              {{ card.title }}
            </h3>
            <p class="text-center text-xs text-gray-500 min-h-[2.5rem] leading-tight">{{ card.description }}</p>
          </div>
        </template>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import {
  Award, BookOpen, Building2, User, Bell, CreditCard,
  FileText, Newspaper, Library, ChevronLeft, LogOut,
} from 'lucide-vue-next'

definePageMeta({ middleware: 'auth' })

const auth = useAuthStore()
const router = useRouter()

function handleLogout() {
  auth.logout()
  router.push('/')
}

const navigationCards = [
  { title: 'Profile', description: 'Personal information and program details', icon: User, link: '/profile', color: 'bg-orange-50', iconColor: 'text-orange-600', active: true },
  { title: 'Grades', description: 'View grades and statistics', icon: Award, link: '/grades', color: 'bg-blue-50', iconColor: 'text-primary', active: true },
  { title: 'Subjects', description: 'View enrolled courses and lecturers', icon: BookOpen, link: '/subjects', color: 'bg-purple-50', iconColor: 'text-purple-600', active: false },
  { title: 'Student Service Office', description: 'Connect with university administration', icon: Building2, link: '/student-service', color: 'bg-green-50', iconColor: 'text-green-600', active: false },
  { title: 'Notifications', description: 'Academic announcements and alerts', icon: Bell, link: '/notifications', color: 'bg-red-50', iconColor: 'text-red-600', active: false },
  { title: 'Payments', description: 'Tuition fees and payment history', icon: CreditCard, link: '/payments', color: 'bg-yellow-50', iconColor: 'text-yellow-600', active: false },
  { title: 'Documents', description: 'Academic certificates and transcripts', icon: FileText, link: '/documents', color: 'bg-indigo-50', iconColor: 'text-indigo-600', active: false },
  { title: 'News', description: 'Campus updates and announcements', icon: Newspaper, link: '/news', color: 'bg-cyan-50', iconColor: 'text-cyan-600', active: false },
  { title: 'Library', description: 'Digital resources and book catalog', icon: Library, link: '/library', color: 'bg-pink-50', iconColor: 'text-pink-600', active: false },
]
</script>
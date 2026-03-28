<template>
  <div class="container mx-auto px-4 py-12 max-w-6xl">
    <div class="text-center mb-12">
      <div class="flex justify-center mb-6">
        <div class="bg-primary p-4 rounded-2xl shadow-lg">
          <GraduationCap class="w-16 h-16 text-white" />
        </div>
      </div>
      <h1 class="text-5xl mb-4 font-medium">Merito Goł</h1>
      <p class="text-xl text-gray-600">Student Marks Management System</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <div
        v-for="feature in features"
        :key="feature.title"
        class="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div class="flex justify-center mb-3">
          <div class="bg-blue-100 p-3 rounded-lg">
            <component :is="feature.icon" class="w-6 h-6 text-primary" />
          </div>
        </div>
        <h3 class="text-center font-medium mb-2">{{ feature.title }}</h3>
        <p class="text-center text-sm text-gray-500">{{ feature.description }}</p>
      </div>
    </div>

    <div class="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
      <NuxtLink to="/login" class="w-full sm:w-auto">
        <button class="w-full sm:w-auto px-8 py-3 text-lg bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Sign In
        </button>
      </NuxtLink>
      <NuxtLink to="/register" class="w-full sm:w-auto">
        <button class="w-full sm:w-auto px-8 py-3 text-lg bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
          Create Account
        </button>
      </NuxtLink>
    </div>

    <div class="mt-12 text-center">
      <div class="bg-white/50 border border-primary/20 rounded-xl p-6">
        <p class="text-sm text-gray-600">
          <strong>Demo Access:</strong> Use student@gdansk.merito.pl / student123 or teacher@gdansk.merito.pl / teacher123 to explore the system
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GraduationCap, BookOpen, Users, BarChart3 } from 'lucide-vue-next'

definePageMeta({
  layout: 'auth',
})

const features = [
  { title: 'For Students', icon: BookOpen, description: 'View your marks, track your progress, and monitor your academic performance' },
  { title: 'For Teachers', icon: Users, description: 'Manage student marks, add new assessments, and track class performance' },
  { title: 'Analytics', icon: BarChart3, description: 'Real-time statistics, grade calculations, and comprehensive performance reports' },
]
</script>

<style lang="scss" scoped>
</style>

<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <div class="text-center">
      <div class="w-24 h-24 rounded-full ring-4 ring-primary/20 bg-primary flex items-center justify-center mx-auto mb-4">
        <span class="text-white text-2xl font-medium">{{ initials }}</span>
      </div>
      <h2 class="text-xl font-medium">{{ user?.name }}</h2>
      <span class="inline-block mt-2 text-xs px-2.5 py-1 rounded-full font-medium bg-blue-100 text-primary capitalize">
        {{ user?.role }}
      </span>
    </div>

    <div class="space-y-3 pt-4 mt-4 border-t border-gray-200">
      <div class="flex items-center gap-3 text-sm">
        <Mail class="w-4 h-4 text-gray-400 shrink-0" />
        <span class="text-gray-600 truncate">{{ user?.email }}</span>
      </div>
      <div class="flex items-center gap-3 text-sm">
        <Phone class="w-4 h-4 text-gray-400 shrink-0" />
        <span class="text-gray-600">{{ phone }}</span>
      </div>
      <div class="flex items-center gap-3 text-sm">
        <MapPin class="w-4 h-4 text-gray-400 shrink-0" />
        <span class="text-gray-600">Gdańsk, Poland</span>
      </div>
    </div>

    <div v-if="isStudent" class="space-y-3 pt-4 mt-4 border-t border-gray-200">
      <div class="flex justify-between text-sm">
        <span class="text-gray-600">Student ID:</span>
        <span class="font-medium">{{ studentId }}</span>
      </div>
      <div class="flex justify-between text-sm">
        <span class="text-gray-600">Program:</span>
        <span class="font-medium">{{ program }}</span>
      </div>
      <div class="flex justify-between text-sm">
        <span class="text-gray-600">Year:</span>
        <span class="font-medium">{{ yearOfStudy }}</span>
      </div>
      <div class="flex justify-between text-sm">
        <span class="text-gray-600">Enrolled:</span>
        <span class="font-medium">{{ enrollmentDate }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Mail, Phone, MapPin } from 'lucide-vue-next'
import type { User } from '~/types'

defineProps<{
  user: User | null
  initials: string
  phone: string
  studentId: string
  program: string
  yearOfStudy: string
  enrollmentDate: string
  isStudent: boolean
}>()
</script>

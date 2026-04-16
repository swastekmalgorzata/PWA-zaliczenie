<template>
  <nav class="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
    <div class="grid grid-cols-4 gap-1 p-2">
      <NuxtLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="flex flex-col items-center py-2 gap-1 rounded-lg text-gray-600 transition-colors"
        :class="route.path.startsWith(item.to) ? item.activeColor : 'hover:text-primary'"
      >
        <component :is="item.icon" class="w-5 h-5" />
        <span class="text-xs">{{ item.label }}</span>
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { BarChart3, Award, BookOpen, User } from 'lucide-vue-next'

const auth = useAuthStore()
const route = useRoute()

const isStudent = computed(() => auth.user?.role === 'student')

const navItems = computed(() => [
  { to: '/dashboard', label: 'Dashboard', icon: BarChart3, activeColor: 'text-primary' },
  { to: '/grades', label: 'Grades', icon: Award, activeColor: 'text-primary' },
  { to: '/subjects', label: 'Subjects', icon: BookOpen, activeColor: 'text-purple-600' },
  { to: '/profile', label: 'Profile', icon: User, activeColor: 'text-primary' },
])
</script>

<style lang="scss" scoped>
</style>

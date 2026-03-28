<template>
  <nav class="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
    <div class="grid grid-cols-3 gap-1 p-2">
      <NuxtLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="flex flex-col items-center py-2 gap-1 rounded-lg text-gray-600 hover:text-primary transition-colors"
        :class="{ 'text-primary': route.path === item.to }"
      >
        <component :is="item.icon" class="w-5 h-5" />
        <span class="text-xs">{{ item.label }}</span>
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { BarChart3, Award, User } from 'lucide-vue-next'

const auth = useAuthStore()
const route = useRoute()

const isStudent = computed(() => auth.user?.role === 'student')

const navItems = computed(() => [
  { to: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  { to: '/grades', label: 'Grades', icon: Award },
  { to: '/profile', label: 'Profile', icon: User },
])
</script>

<style lang="scss" scoped>
</style>

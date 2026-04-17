<template>
  <div class="w-full max-w-md p-4">
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div class="text-center mb-6">
        <div class="flex justify-center mb-4">
          <div class="bg-primary p-3 rounded-full">
            <GraduationCap class="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 class="text-2xl font-medium">Create Account</h1>
        <p class="text-sm text-gray-500 mt-1">Register as a student or teacher</p>
      </div>

      <form class="space-y-4" @submit.prevent="handleSubmit">
        <div class="space-y-2">
          <label for="name" class="text-sm font-medium">Full Name</label>
          <input id="name" v-model="name" type="text" placeholder="Enter your full name" class="form-input">
        </div>
        <div class="space-y-2">
          <label for="email" class="text-sm font-medium">Email</label>
          <input id="email" v-model="email" type="email" placeholder="Enter your email" class="form-input">
        </div>
        <div class="space-y-2">
          <label for="password" class="text-sm font-medium">Password</label>
          <input id="password" v-model="password" type="password" placeholder="Create a password (min 6 characters)" class="form-input">
        </div>
        <div class="space-y-2">
          <label for="phone" class="text-sm font-medium">Phone Number</label>
          <input id="phone" v-model="phone" type="tel" placeholder="Enter your phone number" class="form-input">
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium">I am a:</label>
          <div class="flex gap-4">
            <label class="flex items-center gap-2 cursor-pointer">
              <input v-model="role" type="radio" value="student" class="accent-primary">
              <span class="text-sm">Student</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input v-model="role" type="radio" value="teacher" class="accent-primary">
              <span class="text-sm">Teacher</span>
            </label>
          </div>
        </div>

        <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
          {{ error }}
        </div>
        <div v-if="success" class="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-700">
          Registration successful! Redirecting to login...
        </div>

        <button type="submit" class="w-full bg-primary text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Register
        </button>
      </form>

      <div class="text-center text-sm mt-4">
        Already have an account?
        <NuxtLink to="/login" class="text-primary hover:underline">Sign in here</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GraduationCap } from 'lucide-vue-next'
import type { UserRole } from '~/types'

definePageMeta({
  layout: 'auth',
})

const auth = useAuthStore()
const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const phone = ref('')
const role = ref<UserRole>('student')
const error = ref('')
const success = ref(false)

function handleSubmit() {
  error.value = ''
  success.value = false

  if (!email.value || !password.value || !name.value) {
    error.value = 'Please fill in all fields'
    return
  }
  if (password.value.length < 6) {
    error.value = 'Password must be at least 6 characters'
    return
  }

  const registered = auth.register(email.value, password.value, name.value, role.value, phone.value)
  if (registered) {
    success.value = true
    setTimeout(() => router.push('/login'), 2000)
  } else {
    error.value = 'Email already exists. Please use a different email.'
  }
}
</script>

<style lang="scss" scoped>
.form-input {
  @apply w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors;
}
</style>

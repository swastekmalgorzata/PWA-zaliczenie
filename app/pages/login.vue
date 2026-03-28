<template>
  <div class="w-full max-w-md p-4">
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div class="text-center mb-6">
        <div class="flex justify-center mb-4">
          <div class="bg-primary p-3 rounded-full">
            <GraduationCap class="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 class="text-2xl font-medium">Merito Goł</h1>
        <p class="text-sm text-gray-500 mt-1">Sign in to view or manage student marks</p>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div class="flex items-start gap-2">
          <Info class="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          <div class="text-sm">
            <div class="font-medium mb-1">Demo Credentials:</div>
            <div><strong>Student:</strong> student@gdansk.merito.pl / student123</div>
            <div><strong>Teacher:</strong> teacher@gdansk.merito.pl / teacher123</div>
          </div>
        </div>
      </div>

      <form class="space-y-4" @submit.prevent="handleSubmit">
        <div class="space-y-2">
          <label for="email" class="text-sm font-medium">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="Enter your email"
            class="form-input"
          >
        </div>
        <div class="space-y-2">
          <label for="password" class="text-sm font-medium">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Enter your password"
            class="form-input"
          >
        </div>

        <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
          {{ error }}
        </div>

        <button type="submit" class="w-full bg-primary text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Sign In
        </button>
      </form>

      <div class="text-center text-sm mt-4">
        Don't have an account?
        <NuxtLink to="/register" class="text-primary hover:underline">Register here</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GraduationCap, Info } from 'lucide-vue-next'

definePageMeta({
  layout: 'auth',
})

const auth = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')

function handleSubmit() {
  error.value = ''
  if (!email.value || !password.value) {
    error.value = 'Please enter both email and password'
    return
  }
  const success = auth.login(email.value, password.value)
  if (success) {
    router.push('/dashboard')
  } else {
    error.value = 'Invalid email or password'
  }
}
</script>

<style lang="scss" scoped>
.form-input {
  @apply w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors;
}
</style>

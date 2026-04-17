<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200">
    <div class="p-6 border-b border-gray-200">
      <h3 class="text-xl font-medium">Account Settings</h3>
      <p class="text-sm text-gray-500">Manage your account preferences</p>
    </div>
    <div class="p-6 space-y-3">
      <button 
        class="w-full text-left px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:shadow-sm transition-all text-sm"
        @click="$emit('changePassword')"
      >
        Change Password
      </button>
      <button
        class="w-full text-left px-4 py-2 rounded-lg border border-red-200 bg-white text-red-500 hover:shadow-sm transition-all text-sm"
        @click="$emit('logout')"
      >
        Logout
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  logout: []
  changePassword: []
}>()
</script>

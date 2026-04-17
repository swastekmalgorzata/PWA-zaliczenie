<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      @click.self="$emit('close')"
    >
      <div class="bg-white rounded-xl shadow-xl w-full max-w-sm mx-4">
        <div class="p-6 border-b border-gray-200">
          <h3 class="text-lg font-medium">Change Password</h3>
        </div>
        <div class="p-6 space-y-4">
          <div class="space-y-1.5">
            <label class="text-sm font-medium text-gray-700">New Password</label>
            <input
              v-model="newPassword"
              type="password"
              placeholder="Enter new password"
              class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-300"
            />
          </div>
          <div class="flex justify-end gap-2 pt-2">
            <button
              class="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:shadow-sm transition-all text-sm"
              @click="$emit('close')"
            >
              Cancel
            </button>
            <button
              class="px-4 py-2 rounded-lg bg-primary text-white hover:bg-blue-700 transition-all text-sm disabled:opacity-50"
              :disabled="newPassword.length < 6"
              @click="handleSave"
            >
              Save Password
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  close: []
  save: [password: string]
}>()

const newPassword = ref('')

watch(() => props.open, (val) => {
  if (!val) {
    newPassword.value = ''
  }
})

function handleSave() {
  if (newPassword.value.length >= 6) {
    emit('save', newPassword.value)
  }
}
</script>

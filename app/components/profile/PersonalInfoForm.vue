<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200">
    <div class="p-6 border-b border-gray-200 flex items-center justify-between">
      <div>
        <h3 class="text-xl font-medium">Personal Information</h3>
        <p class="text-sm text-gray-500">Manage your personal details</p>
      </div>
      <div v-if="!isEditing">
        <button
          class="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 hover:shadow-sm transition-all text-sm"
          @click="$emit('update:isEditing', true)"
        >
          <Edit2 class="w-4 h-4" />
          Edit
        </button>
      </div>
      <div v-else class="flex gap-2">
        <button
          class="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 hover:shadow-sm transition-all text-sm"
          @click="$emit('cancel')"
        >
          <X class="w-4 h-4" />
          Cancel
        </button>
        <button
          class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary text-white hover:bg-blue-700 transition-all text-sm"
          @click="$emit('save')"
        >
          <Save class="w-4 h-4" />
          Save
        </button>
      </div>
    </div>
    <div class="p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="space-y-1.5">
          <label class="text-sm font-medium text-gray-700">Full Name</label>
          <input
            :value="modelValue.name"
            :disabled="!isEditing"
            class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-300 disabled:bg-gray-50 disabled:text-gray-500"
            @input="emit('update:modelValue', { ...modelValue, name: ($event.target as HTMLInputElement).value })"
          />
        </div>
        <div class="space-y-1.5">
          <label class="text-sm font-medium text-gray-700">Email Address</label>
          <input
            :value="modelValue.email"
            type="email"
            :disabled="!isEditing"
            class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-300 disabled:bg-gray-50 disabled:text-gray-500"
            @input="emit('update:modelValue', { ...modelValue, email: ($event.target as HTMLInputElement).value })"
          />
        </div>
        <div class="space-y-1.5">
          <label class="text-sm font-medium text-gray-700">Phone Number</label>
          <input
            :value="modelValue.phone"
            :disabled="!isEditing"
            class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-300 disabled:bg-gray-50 disabled:text-gray-500"
            @input="emit('update:modelValue', { ...modelValue, phone: ($event.target as HTMLInputElement).value })"
          />
        </div>
        <div class="space-y-1.5">
          <label class="text-sm font-medium text-gray-700">Address</label>
          <input
            value="Gdańsk, Poland"
            disabled
            class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-500"
          />
        </div>
      </div>

      <div v-if="isStudent" class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 mt-4 border-t border-gray-200">
        <div class="space-y-1.5">
          <label class="text-sm font-medium text-gray-700">Student ID</label>
          <input
            :value="modelValue.studentId"
            disabled
            class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-500"
          />
        </div>
        <div class="space-y-1.5">
          <label class="text-sm font-medium text-gray-700">Program</label>
          <input
            :value="modelValue.program"
            disabled
            class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-500"
          />
        </div>
        <div class="space-y-1.5">
          <label class="text-sm font-medium text-gray-700">Year of Study</label>
          <input
            :value="modelValue.yearOfStudy"
            disabled
            class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-500"
          />
        </div>
        <div class="space-y-1.5">
          <label class="text-sm font-medium text-gray-700">Enrollment Date</label>
          <input
            :value="modelValue.enrollmentDate"
            disabled
            class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-500"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Edit2, Save, X } from 'lucide-vue-next'

interface FormData {
  name: string
  email: string
  phone: string
  address: string
  studentId: string
  program: string
  yearOfStudy: string
  enrollmentDate: string
}

defineProps<{
  modelValue: FormData
  isEditing: boolean
  isStudent: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: FormData]
  'update:isEditing': [value: boolean]
  save: []
  cancel: []
}>()
</script>

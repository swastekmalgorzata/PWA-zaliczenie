<template>
  <div class="max-w-5xl mx-auto">

    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl mb-2 font-medium">My Profile</h1>
        <p class="text-gray-600">Manage your personal information</p>
      </div>
      <button
        class="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:shadow-sm transition-all text-sm"
        @click="router.back()"
      >
        <ChevronLeft class="w-4 h-4" />
        Back
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

      <div class="lg:col-span-1 space-y-6">
        <ProfileCard
          :user="auth.user"
          :initials="initials"
          :phone="formData.phone"
          :student-id="formData.studentId"
          :program="formData.program"
          :year-of-study="formData.yearOfStudy"
          :enrollment-date="formData.enrollmentDate"
          :is-student="isStudent"
        />
      </div>

      <div class="lg:col-span-2 space-y-6">
        <ProfilePersonalInfoForm
          :model-value="formData"
          :is-editing="isEditing"
          :is-student="isStudent"
          @update:model-value="Object.assign(formData, $event)"
          @update:is-editing="isEditing = $event"
          @save="handleSave"
          @cancel="handleCancel"
        />

        <ProfileAccountSettings 
          @logout="handleLogout" 
          @change-password="isPasswordDialogOpen = true"
        />
      </div>
    </div>


    <ProfilePasswordDialog
      :open="isPasswordDialogOpen"
      @close="isPasswordDialogOpen = false"
      @save="handleChangePassword"
    />

    <div
      v-if="showSuccessMessage"
      class="fixed bottom-20 right-4 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 transition-opacity"
    >
      <span class="font-medium">Profile updated successfully!</span>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ChevronLeft } from 'lucide-vue-next'

definePageMeta({ middleware: 'auth' })

const auth = useAuthStore()
const router = useRouter()

const isEditing = ref(false)
const isPasswordDialogOpen = ref(false)
const showSuccessMessage = ref(false)

const formData = reactive({
  name: auth.user?.name || '',
  email: auth.user?.email || '',
  phone: auth.user?.phone || '+48 123 456 789',
  address: auth.user?.address || 'Gdańsk, Poland',
  studentId: auth.user?.studentId || 'MRT2024001',
  program: auth.user?.program || 'Computer Science',
  yearOfStudy: auth.user?.yearOfStudy || '2nd Year',
  enrollmentDate: auth.user?.enrollmentDate || 'September 2023',
})

const isStudent = computed(() => auth.user?.role === 'student')

const initials = computed(() =>
  (auth.user?.name || '')
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
)


function handleSave() {
  auth.updateUser({
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    address: formData.address,
    program: formData.program,
  })
  isEditing.value = false
  
  showSuccessMessage.value = true
  setTimeout(() => {
    showSuccessMessage.value = false
  }, 3000)
}

function handleCancel() {
  formData.name = auth.user?.name || ''
  formData.email = auth.user?.email || ''
  formData.phone = auth.user?.phone || '+48 123 456 789'
  formData.address = auth.user?.address || 'Gdańsk, Poland'
  formData.program = auth.user?.program || 'Computer Science'
  isEditing.value = false
}


function handleChangePassword(newPassword: string) {
  auth.changePassword(newPassword)
  isPasswordDialogOpen.value = false
  
  showSuccessMessage.value = true
  setTimeout(() => {
    showSuccessMessage.value = false
  }, 3000)
}

function handleLogout() {
  auth.logout()
  router.push('/')
}
</script>

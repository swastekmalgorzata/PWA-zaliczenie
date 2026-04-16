<template>
  <div class="max-w-2xl mx-auto">

    <div v-if="!subject" class="text-center py-16">
      <h2 class="text-2xl font-medium text-gray-900">Subject not found</h2>
      <button class="mt-4 px-4 py-2 bg-[#0069FF] text-white rounded-lg text-sm" @click="router.push('/subjects')">
        Back to Subjects
      </button>
    </div>

    <div v-else class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      <h1 class="text-2xl font-medium text-[#1A1A2E] mb-6">Edit Subject</h1>

      <form class="space-y-5" @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">Subject Name</label>
          <input id="name" v-model="form.name" type="text" required />
        </div>

        <div class="form-group">
          <label for="code">Subject Code</label>
          <input id="code" v-model="form.code" type="text" required placeholder="e.g. CS201" />
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea id="description" v-model="form.description" rows="3" />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="form-group">
            <label for="credits">ECTS Credits</label>
            <select id="credits" v-model.number="form.credits">
              <option v-for="c in 10" :key="c" :value="c">{{ c }}</option>
            </select>
          </div>
          <div class="form-group">
            <label for="semester">Semester</label>
            <select id="semester" v-model="form.semester">
              <option value="Semester 1">Semester 1</option>
              <option value="Semester 2">Semester 2</option>
              <option value="Semester 3">Semester 3</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="form-group">
            <label for="schedule">Schedule</label>
            <input id="schedule" v-model="form.schedule" type="text" placeholder="e.g. Mon 10:00-11:30" />
          </div>
          <div class="form-group">
            <label for="room">Room</label>
            <input id="room" v-model="form.room" type="text" placeholder="e.g. Room 204" />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Accent Color</label>
          <div class="flex gap-3">
            <button
              v-for="c in colors"
              :key="c.name"
              type="button"
              class="w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              :class="{ 'ring-2 ring-offset-2 ring-gray-900': form.color === c.name }"
              :style="{ backgroundColor: c.hex }"
              @click="form.color = c.name"
            />
          </div>
        </div>

        <div class="pt-4 flex flex-col gap-3">
          <button
            type="submit"
            class="w-full h-11 bg-[#0069FF] hover:bg-[#0050CC] text-white rounded-lg text-base font-medium transition-colors"
          >
            Save Subject
          </button>
          <button
            type="button"
            class="w-full h-11 text-gray-500 hover:text-gray-700 rounded-lg text-base transition-colors"
            @click="router.back()"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>

  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const route = useRoute()
const router = useRouter()
const subjectsStore = useSubjectsStore()

const subject = computed(() => subjectsStore.getById(route.params.id as string))

const colors = [
  { name: 'blue', hex: '#3b82f6' },
  { name: 'purple', hex: '#a855f7' },
  { name: 'green', hex: '#22c55e' },
  { name: 'orange', hex: '#f97316' },
  { name: 'red', hex: '#ef4444' },
  { name: 'cyan', hex: '#06b6d4' },
  { name: 'indigo', hex: '#6366f1' },
  { name: 'pink', hex: '#ec4899' },
]

const form = reactive({
  name: '',
  code: '',
  description: '',
  credits: 3,
  schedule: '',
  room: '',
  color: 'blue',
  semester: 'Semester 1',
  lecturer: '',
})

watchEffect(() => {
  if (subject.value) {
    form.name = subject.value.name
    form.code = subject.value.code
    form.description = subject.value.description
    form.credits = subject.value.credits
    form.schedule = subject.value.schedule
    form.room = subject.value.room
    form.color = subject.value.color
    form.semester = subject.value.semester
    form.lecturer = subject.value.lecturer
  }
})

function handleSubmit() {
  subjectsStore.updateSubject(route.params.id as string, { ...form })
  router.push('/subjects')
}
</script>

<template>
  <div class="max-w-5xl mx-auto">

    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl mb-2 font-medium">{{ isTeacher ? 'My Courses' : 'My Subjects' }}</h1>
        <p class="text-gray-600">{{ isTeacher ? 'Courses you teach this semester' : 'Your enrolled courses this semester' }}</p>
      </div>
      <div class="flex items-center gap-3">
        <button
          v-if="isTeacher"
          class="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0069FF] text-white hover:bg-[#0050CC] transition-all text-sm font-medium"
          @click="router.push('/subjects/new')"
        >
          <Plus class="w-4 h-4" />
          Add Subject
        </button>
        <button
          class="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:shadow-sm transition-all text-sm"
          @click="router.push('/dashboard')"
        >
          <ChevronLeft class="w-4 h-4" />
          Back
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <p class="text-sm text-gray-600 mb-1">{{ isTeacher ? 'Total Courses' : 'Total Subjects' }}</p>
        <p class="text-3xl font-medium">{{ filteredSubjects.length }}</p>
      </div>
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <p class="text-sm text-gray-600 mb-1">Total ECTS</p>
        <p class="text-3xl font-medium">{{ totalECTS }}</p>
      </div>
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <p class="text-sm text-gray-600 mb-1">This Week</p>
        <p class="text-3xl font-medium">{{ filteredSubjects.length }}</p>
      </div>
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <p class="text-sm text-gray-600 mb-1">{{ isTeacher ? 'Total Students' : 'Lecturers' }}</p>
        <p class="text-3xl font-medium">{{ isTeacher ? filteredSubjects.length * 32 : uniqueLecturers }}</p>
      </div>
    </div>

    <!-- Filter Bar -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6 flex flex-wrap gap-3 items-center">
      <div class="relative flex-1 min-w-[200px]">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          v-model="search"
          type="text"
          :placeholder="isTeacher ? 'Search course or code...' : 'Search subject, lecturer, or room...'"
          class="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm outline-none focus:border-[#0069FF] focus:ring-[0_0_0_3px_rgba(0,105,255,0.15)]"
        />
      </div>

      <select v-model="semesterFilter" class="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#0069FF]">
        <option value="All">All Semesters</option>
        <option value="Semester 1">Semester 1</option>
        <option value="Semester 2">Semester 2</option>
      </select>

      <select v-if="!isTeacher" v-model="dayFilter" class="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#0069FF]">
        <option value="All">All days</option>
        <option value="Mon">Monday</option>
        <option value="Tue">Tuesday</option>
        <option value="Wed">Wednesday</option>
        <option value="Thu">Thursday</option>
        <option value="Fri">Friday</option>
      </select>

      <select v-model="sortBy" class="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#0069FF]">
        <option value="name">Name A-Z</option>
        <option value="ects">ECTS High-Low</option>
        <option value="schedule">Schedule</option>
      </select>
    </div>

    <!-- Subject Cards Grid -->
    <div v-if="filteredSubjects.length === 0" class="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
      <BookOpen class="w-12 h-12 mx-auto text-gray-300 mb-3" />
      <p class="text-gray-500 font-medium">No subjects match your filters</p>
      <button class="text-[#0069FF] text-sm mt-2 hover:underline" @click="clearFilters">Clear filters</button>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div
        v-for="subject in filteredSubjects"
        :key="subject.id"
        class="group relative bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer overflow-hidden flex flex-col h-full"
        @click="router.push(`/subjects/${subject.id}`)"
      >
        <!-- Color accent strip -->
        <div class="absolute left-0 top-0 bottom-0 w-1" :class="colorClass(subject.color)" />

        <div class="p-5 pl-6 flex-1 flex flex-col">
          <div class="flex justify-between items-start mb-3">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <h3 class="text-base font-medium text-[#1A1A2E]">{{ subject.name }}</h3>
                <span class="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-md">
                  {{ subject.code }}
                </span>
              </div>
              <div class="flex items-center text-sm text-gray-500">
                <template v-if="isTeacher">
                  <Users class="w-3.5 h-3.5 mr-1.5" /> 32 students
                </template>
                <template v-else>
                  <User class="w-3.5 h-3.5 mr-1.5" /> {{ subject.lecturer }}
                </template>
              </div>
            </div>

            <!-- Teacher quick actions -->
            <div v-if="isTeacher" class="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
              <button
                class="w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-600 flex items-center justify-center"
                @click.stop="router.push(`/subjects/${subject.id}/edit`)"
              >
                <Pencil class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <!-- Info pills -->
          <div class="mt-auto pt-4 flex flex-wrap gap-2">
            <div class="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full flex items-center gap-1.5">
              <BookOpen class="w-3 h-3" /> {{ subject.credits }} ECTS
            </div>
            <div class="px-2.5 py-1 bg-gray-50 text-gray-700 border border-gray-100 text-xs font-medium rounded-full flex items-center gap-1.5">
              <Clock class="w-3 h-3" /> {{ subject.schedule }}
            </div>
            <div class="px-2.5 py-1 bg-gray-50 text-gray-700 border border-gray-100 text-xs font-medium rounded-full flex items-center gap-1.5">
              <MapPin class="w-3 h-3" /> {{ subject.room }}
            </div>
          </div>

          <!-- Teacher extra info -->
          <div v-if="isTeacher" class="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
            <span class="text-xs font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full">Active Course</span>
            <span class="text-xs text-gray-500 font-medium">Avg Grade: 3.8</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { BookOpen, ChevronLeft, Clock, MapPin, Pencil, Plus, Search, User, Users } from 'lucide-vue-next'

definePageMeta({ middleware: 'auth' })

const router = useRouter()
const auth = useAuthStore()
const subjectsStore = useSubjectsStore()

const isTeacher = computed(() => auth.user?.role === 'teacher')

const search = ref('')
const semesterFilter = ref('All')
const dayFilter = ref('All')
const sortBy = ref('name')

const colorMap: Record<string, string> = {
  blue: 'bg-blue-500',
  purple: 'bg-purple-500',
  green: 'bg-green-500',
  red: 'bg-red-500',
  orange: 'bg-orange-500',
  indigo: 'bg-indigo-500',
  cyan: 'bg-cyan-500',
  pink: 'bg-pink-500',
}

function colorClass(color: string) {
  return colorMap[color] || 'bg-blue-500'
}

const filteredSubjects = computed(() => {
  let result = [...subjectsStore.subjects]

  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.code.toLowerCase().includes(q) ||
      s.lecturer.toLowerCase().includes(q) ||
      s.room.toLowerCase().includes(q)
    )
  }

  if (semesterFilter.value !== 'All') {
    result = result.filter(s => s.semester === semesterFilter.value)
  }

  if (dayFilter.value !== 'All') {
    result = result.filter(s => s.schedule.startsWith(dayFilter.value))
  }

  if (sortBy.value === 'name') result.sort((a, b) => a.name.localeCompare(b.name))
  if (sortBy.value === 'ects') result.sort((a, b) => b.credits - a.credits)
  if (sortBy.value === 'schedule') result.sort((a, b) => a.schedule.localeCompare(b.schedule))

  return result
})

const totalECTS = computed(() => filteredSubjects.value.reduce((sum, s) => sum + s.credits, 0))
const uniqueLecturers = computed(() => new Set(filteredSubjects.value.map(s => s.lecturer)).size)

function clearFilters() {
  search.value = ''
  semesterFilter.value = 'All'
  dayFilter.value = 'All'
  sortBy.value = 'name'
}
</script>

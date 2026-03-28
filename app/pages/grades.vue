<template>
  <div class="max-w-5xl mx-auto">

    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl mb-2 font-medium">My Grades</h1>
        <p class="text-gray-600">Track your academic performance</p>
      </div>
      <button
        class="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:shadow-sm transition-all text-sm"
        @click="router.back()"
      >
        <ChevronLeft class="w-4 h-4" />
        Back
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <p class="text-sm text-gray-600 mb-1">Total Subjects</p>
        <p class="text-3xl font-medium">{{ grades.length }}</p>
      </div>
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <p class="text-sm text-gray-600 mb-1">Average Grade</p>
        <p class="text-3xl font-medium">{{ averageGrade }}</p>
      </div>
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <p class="text-sm text-gray-600 mb-1">Best Grade</p>
        <p class="text-3xl font-medium">{{ bestGrade }}</p>
      </div>
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <p class="text-sm text-gray-600 mb-1">Passed</p>
        <p class="text-3xl font-medium">{{ passedCount }} / {{ grades.length }}</p>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6 flex flex-wrap gap-3 items-center">
      <input
        v-model="search"
        type="text"
        placeholder="Search subject or lecturer..."
        class="border border-gray-200 rounded-lg px-3 py-2 text-sm flex-1 min-w-[200px] outline-none focus:border-blue-300"
      />

      <select v-model="filterStatus" class="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-300">
        <option value="all">All statuses</option>
        <option value="pass">Pass</option>
        <option value="fail">Fail</option>
      </select>

      <select v-model="sortBy" class="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-300">
        <option value="date-desc">Newest first</option>
        <option value="date-asc">Oldest first</option>
        <option value="grade-desc">Grade: High to Low</option>
        <option value="grade-asc">Grade: Low to High</option>
        <option value="subject">Subject A-Z</option>
      </select>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200">
      <div class="p-6 border-b border-gray-200 flex items-center justify-between">
        <h2 class="text-xl font-medium">All Grades</h2>
        <span class="text-sm text-gray-500">{{ filteredGrades.length }} results</span>
      </div>
      <div class="p-6">
        <div v-if="filteredGrades.length === 0" class="text-center py-8 text-gray-500">
          No grades match your filters
        </div>
        <div v-else class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-gray-200">
                <th class="text-left py-3 px-4 font-medium text-gray-600">Subject</th>
                <th class="text-left py-3 px-4 font-medium text-gray-600">Lecturer</th>
                <th class="text-left py-3 px-4 font-medium text-gray-600">ECTS</th>
                <th class="text-left py-3 px-4 font-medium text-gray-600">Grade</th>
                <th class="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                <th class="text-left py-3 px-4 font-medium text-gray-600">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="g in filteredGrades" :key="g.id" class="border-b border-gray-100 hover:bg-gray-50">
                <td class="py-3 px-4 font-medium">{{ g.subject }}</td>
                <td class="py-3 px-4 text-gray-600">{{ g.lecturer }}</td>
                <td class="py-3 px-4 text-gray-600">{{ g.ects }}</td>
                <td class="py-3 px-4">
                  <span :class="['grade-badge', gradeClass(g.grade)]">
                    {{ g.grade.toFixed(1) }}
                  </span>
                </td>
                <td class="py-3 px-4">
                  <span :class="[
                    'text-xs px-2.5 py-1 rounded-full font-medium',
                    g.grade >= 3 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                  ]">
                    {{ g.grade >= 3 ? 'Pass' : 'Fail' }}
                  </span>
                </td>
                <td class="py-3 px-4 text-gray-600">{{ new Date(g.date).toLocaleDateString() }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ChevronLeft } from 'lucide-vue-next'

definePageMeta({ middleware: 'auth' })

const router = useRouter()

const grades = ref([
  { id: '1', subject: 'Mathematics', lecturer: 'dr. Kowalski', ects: 6, grade: 5.0, date: '2026-01-15' },
  { id: '2', subject: 'Physics', lecturer: 'prof. Nowak', ects: 5, grade: 4.5, date: '2026-01-20' },
  { id: '3', subject: 'History', lecturer: 'dr. Wiśniewska', ects: 3, grade: 3.5, date: '2026-02-05' },
  { id: '4', subject: 'English', lecturer: 'mgr. Smith', ects: 2, grade: 4.0, date: '2026-02-10' },
  { id: '5', subject: 'Computer Science', lecturer: 'dr. Zając', ects: 6, grade: 5.0, date: '2026-02-18' },
  { id: '6', subject: 'Statistics', lecturer: 'prof. Dąbrowska', ects: 4, grade: 2.0, date: '2026-03-01' },
  { id: '7', subject: 'Philosophy', lecturer: 'dr. Lewandowski', ects: 2, grade: 3.0, date: '2026-03-10' },
  { id: '8', subject: 'Economics', lecturer: 'prof. Kamińska', ects: 5, grade: 4.5, date: '2026-03-15' },
])

const search = ref('')
const filterStatus = ref('all')
const sortBy = ref('date-desc')

const passedCount = computed(() => grades.value.filter(g => g.grade >= 3).length)

const averageGrade = computed(() => {
  if (grades.value.length === 0) return '—'
  return (grades.value.reduce((acc, g) => acc + g.grade, 0) / grades.value.length).toFixed(1)
})

const bestGrade = computed(() => {
  if (grades.value.length === 0) return '—'
  return Math.max(...grades.value.map(g => g.grade)).toFixed(1)
})

const filteredGrades = computed(() => {
  let result = [...grades.value]

  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter(g =>
      g.subject.toLowerCase().includes(q) ||
      g.lecturer.toLowerCase().includes(q)
    )
  }

  if (filterStatus.value === 'pass') result = result.filter(g => g.grade >= 3)
  if (filterStatus.value === 'fail') result = result.filter(g => g.grade < 3)

  if (sortBy.value === 'date-desc') result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  if (sortBy.value === 'date-asc') result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  if (sortBy.value === 'grade-desc') result.sort((a, b) => b.grade - a.grade)
  if (sortBy.value === 'grade-asc') result.sort((a, b) => a.grade - b.grade)
  if (sortBy.value === 'subject') result.sort((a, b) => a.subject.localeCompare(b.subject))

  return result
})

function gradeClass(grade: number) {
  if (grade >= 4) return 'grade-badge--high'
  if (grade >= 3) return 'grade-badge--mid'
  return 'grade-badge--low'
}
</script>
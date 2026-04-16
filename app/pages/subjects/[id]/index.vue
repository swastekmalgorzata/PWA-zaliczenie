<template>
  <div class="max-w-5xl mx-auto">

    <!-- Not Found -->
    <div v-if="!subject" class="text-center py-16">
      <h2 class="text-2xl font-medium text-gray-900">Subject not found</h2>
      <button class="mt-4 px-4 py-2 bg-[#0069FF] text-white rounded-lg text-sm" @click="router.push('/subjects')">
        Back to Subjects
      </button>
    </div>

    <template v-else>
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 gap-4">
        <div class="flex items-start gap-4">
          <button
            class="mt-1 shrink-0 w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:shadow-sm transition-all"
            @click="router.push('/subjects')"
          >
            <ChevronLeft class="w-4 h-4" />
          </button>
          <div>
            <div class="flex items-center gap-3 mb-1">
              <h1 class="text-3xl font-medium text-[#1A1A2E]">{{ subject.name }}</h1>
              <span class="px-2.5 py-1 bg-gray-100 text-gray-600 text-sm font-medium rounded-md">
                {{ subject.code }}
              </span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full" :class="colorClass(subject.color)" />
              <span class="text-gray-500">Merito University &bull; {{ subject.semester }}</span>
            </div>
          </div>
        </div>

        <!-- Teacher action buttons -->
        <div v-if="isTeacher" class="flex gap-2">
          <button
            class="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:shadow-sm transition-all text-sm"
            @click="router.push(`/subjects/${subject.id}/edit`)"
          >
            <Pencil class="w-4 h-4" /> Edit Course
          </button>
          <button
            class="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:shadow-sm transition-all text-sm"
          >
            <Users class="w-4 h-4" /> Manage Students
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-6">

          <!-- About this course -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200">
            <div class="p-6">
              <div class="flex items-center gap-2 mb-4">
                <Info class="w-5 h-5 text-gray-400" />
                <h2 class="text-xl font-medium text-[#1A1A2E]">About this course</h2>
              </div>
              <p class="text-gray-600 leading-relaxed text-sm">
                {{ subject.description || 'No description provided for this course.' }}
              </p>
            </div>
          </div>

          <!-- Teacher: Enrolled Students -->
          <div v-if="isTeacher" class="bg-white rounded-xl shadow-sm border border-gray-200">
            <div class="p-6">
              <div class="flex justify-between items-center mb-4">
                <div class="flex items-center gap-2">
                  <Users class="w-5 h-5 text-gray-400" />
                  <h2 class="text-xl font-medium text-[#1A1A2E]">Enrolled Students</h2>
                  <span class="ml-2 px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                    {{ enrolledStudents.length }} Total
                  </span>
                </div>
              </div>

              <div class="mb-4 relative">
                <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  v-model="studentSearch"
                  type="text"
                  placeholder="Search students..."
                  class="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm bg-gray-50 outline-none focus:border-[#0069FF]"
                />
              </div>

              <div class="overflow-x-auto border rounded-lg">
                <table class="w-full text-sm">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="text-left py-3 px-4 font-medium text-gray-600">Name</th>
                      <th class="text-left py-3 px-4 font-medium text-gray-600">Email</th>
                      <th class="text-left py-3 px-4 font-medium text-gray-600">Grade</th>
                      <th class="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                      <th class="text-left py-3 px-4 font-medium text-gray-600">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="student in filteredStudents" :key="student.id" class="border-b border-gray-100 hover:bg-gray-50">
                      <td class="py-3 px-4 font-medium">{{ student.name }}</td>
                      <td class="py-3 px-4 text-gray-500">{{ student.email }}</td>
                      <td class="py-3 px-4">
                        <span v-if="student.grade" :class="['grade-badge', gradeClass(student.grade)]">
                          {{ student.grade.toFixed(1) }}
                        </span>
                        <span v-else class="text-gray-400">&mdash;</span>
                      </td>
                      <td class="py-3 px-4">
                        <span v-if="student.grade" class="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Graded</span>
                        <span v-else class="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">Pending</span>
                      </td>
                      <td class="py-3 px-4">
                        <button class="text-[#0069FF] hover:text-[#0050CC] text-sm font-medium">
                          {{ student.grade ? 'Edit Grade' : 'Add Grade' }}
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Student: Grade Preview -->
          <div v-else class="bg-white rounded-xl shadow-sm border border-gray-200">
            <div class="p-6">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-xl font-medium text-[#1A1A2E]">My Grade</h2>
                <button class="text-[#0069FF] text-sm hover:underline px-0" @click="router.push('/grades')">
                  View Full Transcript
                </button>
              </div>
              <div v-if="studentGrade" class="flex items-center gap-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
                <div class="flex-1">
                  <p class="text-sm text-gray-500 mb-1">Grade</p>
                  <p class="text-xl font-medium">
                    <span :class="['grade-badge', gradeClass(studentGrade)]">{{ studentGrade.toFixed(1) }}</span>
                  </p>
                </div>
                <div class="w-px h-12 bg-gray-200" />
                <div class="flex-1 pl-4">
                  <p class="text-sm text-gray-500 mb-1">Status</p>
                  <p class="text-xl font-medium">
                    <span :class="[
                      'text-xs px-2.5 py-1 rounded-full font-medium',
                      studentGrade >= 3 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                    ]">
                      {{ studentGrade >= 3 ? 'Pass' : 'Fail' }}
                    </span>
                  </p>
                </div>
              </div>
              <div v-else class="bg-gray-50 p-6 rounded-lg border border-dashed border-gray-300 text-center">
                <p class="text-gray-500">No grade has been published yet.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div class="p-5 border-b border-gray-100">
              <h3 class="font-medium text-[#1A1A2E] mb-4">Course Info</h3>
              <div class="space-y-4">
                <div class="flex items-start gap-3">
                  <User class="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <p class="text-sm text-gray-500">Lecturer</p>
                    <p class="text-sm font-medium text-[#1A1A2E]">{{ subject.lecturer }}</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <Clock class="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <p class="text-sm text-gray-500">Schedule</p>
                    <p class="text-sm font-medium text-[#1A1A2E]">{{ subject.schedule }}</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <MapPin class="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <p class="text-sm text-gray-500">Location</p>
                    <p class="text-sm font-medium text-[#1A1A2E]">{{ subject.room }}</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <BookOpen class="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <p class="text-sm text-gray-500">Credits</p>
                    <p class="text-sm font-medium text-[#1A1A2E]">{{ subject.credits }} ECTS</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <Calendar class="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <p class="text-sm text-gray-500">Semester</p>
                    <p class="text-sm font-medium text-[#1A1A2E]">{{ subject.semester }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Teacher: Course Statistics -->
            <div v-if="isTeacher" class="p-5 bg-gray-50">
              <h3 class="font-medium text-[#1A1A2E] mb-3">Course Statistics</h3>
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span class="text-sm text-gray-500">Average Grade</span>
                  <span class="text-sm font-medium">3.8</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm text-gray-500">Pass Rate</span>
                  <span class="text-sm font-medium text-green-600">94%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                  <div class="bg-green-500 h-1.5 rounded-full" style="width: 94%" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

  </div>
</template>

<script setup lang="ts">
import { BookOpen, Calendar, ChevronLeft, Clock, Info, MapPin, Pencil, Search, User, Users } from 'lucide-vue-next'

definePageMeta({ middleware: 'auth' })

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const subjectsStore = useSubjectsStore()

const isTeacher = computed(() => auth.user?.role === 'teacher')
const subject = computed(() => subjectsStore.getById(route.params.id as string))

// Mock grade data matching the grades page
const gradesData: Record<string, number> = {
  'Mathematics': 5.0,
  'Physics': 4.5,
  'History': 3.5,
  'English': 4.0,
  'Computer Science': 5.0,
  'Statistics': 2.0,
  'Philosophy': 3.0,
  'Economics': 4.5,
}

const studentGrade = computed(() => {
  if (!subject.value) return null
  return gradesData[subject.value.name] ?? null
})

// Teacher: enrolled students mock data
const studentSearch = ref('')

const enrolledStudents = [
  { id: '1', name: 'Alice Smith', email: 'alice@student.merito.pl', grade: 4.5 as number | null },
  { id: '2', name: 'Bob Jones', email: 'bob@student.merito.pl', grade: 3.0 as number | null },
  { id: '3', name: 'Charlie Brown', email: 'charlie@student.merito.pl', grade: null as number | null },
  { id: '4', name: 'Diana Ross', email: 'diana@student.merito.pl', grade: 5.0 as number | null },
  { id: '5', name: 'Edward Park', email: 'edward@student.merito.pl', grade: null as number | null },
]

const filteredStudents = computed(() =>
  enrolledStudents.filter(s => s.name.toLowerCase().includes(studentSearch.value.toLowerCase()))
)

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

function gradeClass(grade: number) {
  if (grade >= 4) return 'grade-badge--high'
  if (grade >= 3) return 'grade-badge--mid'
  return 'grade-badge--low'
}
</script>

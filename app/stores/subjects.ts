import { defineStore } from 'pinia'
import type { Subject } from '~/types'

const defaultSubjects: Subject[] = [
    { id: '1', name: 'Mathematics', code: 'MAT101', lecturer: 'dr. Kowalski', credits: 6, color: 'blue', schedule: 'Mon 10:00-11:30', room: 'Room 204', description: 'Fundamentals of calculus and linear algebra.', semester: 'Semester 1' },
    { id: '2', name: 'Physics', code: 'PHY201', lecturer: 'prof. Nowak', credits: 5, color: 'purple', schedule: 'Tue 08:30-10:00', room: 'Lab 3B', description: 'Classical mechanics and thermodynamics.', semester: 'Semester 2' },
    { id: '3', name: 'Computer Science', code: 'CS301', lecturer: 'dr. Zajac', credits: 6, color: 'green', schedule: 'Wed 14:00-15:30', room: 'Lab 1A', description: 'Introduction to programming and algorithms.', semester: 'Semester 1' },
    { id: '4', name: 'English', code: 'ENG102', lecturer: 'mgr. Smith', credits: 2, color: 'red', schedule: 'Thu 12:00-13:30', room: 'Room 112', description: 'Academic reading and writing.', semester: 'Semester 1' },
    { id: '5', name: 'Statistics', code: 'STAT201', lecturer: 'prof. Dabrowska', credits: 4, color: 'orange', schedule: 'Fri 10:00-11:30', room: 'Room 305', description: 'Probability and statistical inference.', semester: 'Semester 2' },
    { id: '6', name: 'History', code: 'HIS101', lecturer: 'dr. Wisniewska', credits: 3, color: 'indigo', schedule: 'Mon 14:00-15:30', room: 'Room 118', description: 'World history overview.', semester: 'Semester 1' },
    { id: '7', name: 'Philosophy', code: 'PHIL101', lecturer: 'dr. Lewandowski', credits: 2, color: 'cyan', schedule: 'Wed 08:30-10:00', room: 'Room 210', description: 'Introduction to philosophical thought.', semester: 'Semester 1' },
    { id: '8', name: 'Economics', code: 'ECON201', lecturer: 'prof. Kaminska', credits: 5, color: 'pink', schedule: 'Thu 14:00-15:30', room: 'Room 301', description: 'Micro and macro economics principles.', semester: 'Semester 2' },
]

export const useSubjectsStore = defineStore('subjects', {
    state: () => ({
        subjects: [...defaultSubjects] as Subject[],
    }),

    getters: {
        getById: (state) => (id: string) => state.subjects.find(s => s.id === id),
        totalECTS: (state) => state.subjects.reduce((sum, s) => sum + s.credits, 0),
        uniqueLecturers: (state) => new Set(state.subjects.map(s => s.lecturer)).size,
    },

    actions: {
        addSubject(subject: Omit<Subject, 'id'>) {
            this.subjects.push({ ...subject, id: Math.random().toString(36).substr(2, 9) })
        },

        updateSubject(id: string, updates: Partial<Omit<Subject, 'id'>>) {
            const subject = this.subjects.find(s => s.id === id)
            if (subject) {
                Object.assign(subject, updates)
            }
        },

        deleteSubject(id: string) {
            this.subjects = this.subjects.filter(s => s.id !== id)
        },
    },
})

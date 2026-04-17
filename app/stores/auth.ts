import { defineStore } from 'pinia'
import type { User, UserRole, UserWithPassword } from '~/types'

const PREDEFINED_USERS: UserWithPassword[] = [
    {
        id: 'student1',
        email: 'student@gdansk.merito.pl',
        password: 'student123',
        name: 'John Smith',
        role: 'student',
    },
    {
        id: 'teacher1',
        email: 'teacher@gdansk.merito.pl',
        password: 'teacher123',
        name: 'Ms. Johnson',
        role: 'teacher',
    },
]

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as User | null,
        registeredUsers: [] as UserWithPassword[],
    }),

    getters: {
        students: (state) => {
            const all = [...PREDEFINED_USERS, ...state.registeredUsers]
            return all.filter(u => u.role === 'student').map(({ password: _, ...rest }) => rest)
        },
    },

    actions: {
        login(email: string, password: string): boolean {
            const allUsers = [...PREDEFINED_USERS, ...this.registeredUsers]
            const found = allUsers.find(u => u.email === email && u.password === password)
            if (!found) return false

            const { password: _, ...userWithoutPassword } = found
            this.user = userWithoutPassword
            return true
        },

        logout() {
            this.user = null
        },

        register(email: string, password: string, name: string, role: UserRole, phone?: string): boolean {
            const allUsers = [...PREDEFINED_USERS, ...this.registeredUsers]
            if (allUsers.some(u => u.email === email)) return false

            const newUser: UserWithPassword = {
                id: `user_${Date.now()}`,
                email,
                password,
                name,
                role,
                phone,
            }
            this.registeredUsers.push(newUser)
            return true
        },

        updateUser(updates: Partial<User>) {
            if (this.user) {
                this.user = { ...this.user, ...updates }
            }
        },

        changePassword(newPassword: string) {
            if (this.user) {
                // In a real app we'd update the backend. Here we update the registeredUsers array if the user is there.
                const userInDb = this.registeredUsers.find(u => u.id === this.user?.id)
                if (userInDb) {
                    userInDb.password = newPassword
                }
            }
        },
    },
})

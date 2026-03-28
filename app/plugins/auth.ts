import type { User, UserWithPassword } from '~/types'

export default defineNuxtPlugin(() => {
    const auth = useAuthStore()

    const userCookie = useCookie<User | null>('auth-user', {
        default: () => null,
        watch: true,
        maxAge: 60 * 60 * 24 * 7,
    })

    const registeredCookie = useCookie<UserWithPassword[]>('registered-users', {
        default: () => [],
        watch: true,
        maxAge: 60 * 60 * 24 * 30,
    })

    if (userCookie.value) {
        auth.user = userCookie.value
    }
    if (registeredCookie.value && registeredCookie.value.length > 0) {
        auth.registeredUsers = registeredCookie.value
    }

    watch(() => auth.user, (val) => {
        userCookie.value = val
    }, { deep: true })

    watch(() => auth.registeredUsers, (val) => {
        registeredCookie.value = val
    }, { deep: true })
})

import type { Config } from 'tailwindcss'

export default {
    content: [
        './app/**/*.{vue,ts}',
        './components/**/*.{vue,ts}',
        './layouts/**/*.{vue,ts}',
        './pages/**/*.{vue,ts}',
        './stores/**/*.ts',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#0069FF',
                    foreground: '#ffffff',
                },
            },
            borderRadius: {
                DEFAULT: '0.625rem',
            },
        },
    },
    plugins: [],
} satisfies Config

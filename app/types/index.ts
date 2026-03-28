export type UserRole = 'student' | 'teacher'

export interface User {
    id: string
    email: string
    name: string
    role: UserRole
    phone?: string
    address?: string
    studentId?: string
    program?: string
    yearOfStudy?: string
    enrollmentDate?: string
    profileImage?: string
}

export interface UserWithPassword extends User {
    password: string
}

export interface Grade {
    id: string
    studentId: string
    studentName: string
    subject: string
    grade: number
    date: string
}

export interface Subject {
    id: string
    name: string
    code: string
    lecturer: string
    credits: number
    color: string
    schedule: string
    room: string
    description: string
}

export interface Payment {
    id: string
    description: string
    amount: number
    dueDate: string
    paidDate?: string
    status: 'paid' | 'pending' | 'overdue'
    invoiceNumber: string
}

export interface AppDocument {
    id: string
    name: string
    type: string
    category: 'academic' | 'personal' | 'administrative'
    issueDate: string
    status: 'available' | 'pending' | 'processing'
    size: string
}

export interface AppNotification {
    id: string
    title: string
    message: string
    type: 'info' | 'success' | 'warning' | 'announcement'
    category: 'academic' | 'administrative' | 'payment' | 'general'
    timestamp: string
    read: boolean
}

export interface NewsArticle {
    id: string
    title: string
    excerpt: string
    content: string
    category: 'academic' | 'events' | 'achievements' | 'career'
    author: string
    date: string
    readTime: string
    image: string
    likes: number
    featured?: boolean
}

export interface LibraryResource {
    id: string
    title: string
    author: string
    type: 'book' | 'journal' | 'video' | 'audio' | 'ebook'
    category: string
    description: string
    available: boolean
    dueDate?: string
    rating: number
    downloads?: number
    cover: string
}

export interface Ticket {
    id: string
    subject: string
    description: string
    category: 'enrollment' | 'financial' | 'academic' | 'technical' | 'other'
    status: 'open' | 'in-progress' | 'resolved'
    createdDate: string
    lastUpdated: string
    response?: string
}

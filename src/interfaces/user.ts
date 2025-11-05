export interface IUser {
    id: number
    name: string
    avatar: string
    type: 'admin' | 'user' | 'company'
    badge: string
    phone: string
    national_id: string
}
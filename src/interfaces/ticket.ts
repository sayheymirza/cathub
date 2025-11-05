import { IUser } from "./user"

export interface ITicketMessage {
    id: number
    type: 'text' | 'image' | 'file'
    content: any
    user_id: number
    user: IUser
    sent?: boolean
    createdAt: string
}
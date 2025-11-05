import { prisma } from './prisma';

const createConsultation = (data: any) => {
    return prisma.consultation.create({ data });
}

const getAllConsultations = (page: number = 0, limit: number = 20) => {
    return prisma.consultation.findMany({
        skip: page * limit,
        take: limit,
        orderBy: {
            createdAt: 'desc'
        }
    });
}

const createOrder = (data: any) => {
    return prisma.order.create({
        data: {
            ...data,
            confirm: undefined,
            user_id: undefined,
            user: {
                connect: { id: data.user_id }
            }
        }
    });
}

const getAllOrders = (page: number = 0, limit: number = 20) => {
    return prisma.order.findMany({
        skip: page * limit,
        take: limit,
        orderBy: {
            createdAt: 'desc'
        }
    });
}

const getOrdersByUserId = (userId: number) => {
    return prisma.order.findMany({
        where: {
            user_id: userId,
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
}


const getUserByPhone = (phone: string) => {
    return prisma.user.findUnique({ where: { phone } });
}

const getUserById = (id: number) => {
    return prisma.user.findUnique({ where: { id } });
}

const createUser = (data: any) => {
    return prisma.user.create({ data });
}

const updateUser = (id: number, data: any) => {
    return prisma.user.update({ where: { id }, data });
}

const getAllUsers = (except: number) => {
    return prisma.user.findMany({
        where: {
            id: {
                not: except,
            }
        }
    });
}

const createTicket = (data: any) => {
    return prisma.ticket.create({ data });
}

const createTicketMessage = (data: any) => {
    return prisma.ticket_message.create({ data });
}

const getTicketById = (id: number) => {
    return prisma.ticket.findUnique({ where: { id } });
}

const getTicketMessagesByTicketId = (ticketId: number, page: number = 0, limit: number = 20) => {
    return prisma.ticket_message.findMany({
        where: { ticket_id: ticketId },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    type: true,
                }
            }
        },
        skip: page * limit,
        take: limit,
    });
}

const getTicketsByUserId = (userId: number) => {
    return prisma.ticket.findMany({
        where: { user_id: userId },
        include: {
            ticket_message: {
                orderBy: { createdAt: 'desc' },
                take: 1,
            }
        },
        orderBy: { updatedAt: 'desc' }
    });
}

const getAllTickets = (page: number = 0, limit: number = 20) => {
    return prisma.ticket.findMany({
        skip: page * limit,
        take: limit,
        include: {
            user: {
                select: {
                    name: true,
                    type: true,
                }
            },
            ticket_message: {
                orderBy: { createdAt: 'desc' },
                take: 1,
            }
        },
        orderBy: { updatedAt: 'desc' }
    });
}

const changeTicketStatus = (id: number, status: string) => {
    return prisma.ticket.update({
        where: { id },
        data: { status }
    });
}

export default {
    createConsultation,
    getAllConsultations,
    createOrder,
    getAllOrders,
    getOrdersByUserId,
    getUserByPhone,
    getUserById,
    createUser,
    updateUser,
    getAllUsers,
    createTicket,
    createTicketMessage,
    getTicketById,
    getTicketMessagesByTicketId,
    getTicketsByUserId,
    getAllTickets,
    changeTicketStatus,
}
import { Request, Response } from "express";
import database from "./database";
import functions from "./functions";
import storage from "./storage";
import { prisma } from "./prisma";
import debug from "./debug";


const createConsultation = async (req: Request, res: Response) => {
    try {
        const consultation = await database.createConsultation({
            name: req.body.name,
            phone: functions.convertPersianToEnglish(req.body.phone),
            message: req.body.message,
        });

        return res.json({
            ok: true,
            status: 200,
            code: 'CONSULTATION_CREATED',
            consultation,
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            status: 500,
            code: 'INTERNAL_SERVER_ERROR'
        })
    }
}

const allConsultations = async (req: Request, res: Response) => {
    try {
        const consultations = await database.getAllConsultations();

        return res.json({
            ok: true,
            status: 200,
            code: 'CONSULTATIONS_FETCHED',
            meta: {
                total: consultations.length,
            },
            consultations,
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            status: 500,
            code: 'INTERNAL_SERVER_ERROR'
        })
    }
}

const otpRequest = async (req: Request, res: Response) => {
    try {
        let { phone } = req.body;

        phone = functions.convertPersianToEnglish(phone);

        const user = await database.getUserByPhone(phone);

        if (!user) {
            return res.status(404).json({
                ok: false,
                status: 404,
                code: 'USER_NOT_FOUND',
            });
        }

        // check for existing OTP
        const existingOtp = storage.get(`otp_${phone}`);

        if (existingOtp) {
            return res.status(200).json({
                ok: true,
                status: 200,
                code: 'OTP_SENT_BEFORE',
                result: {
                    phone,
                    ttl: existingOtp.ttl,
                    length: existingOtp.length,
                    generated_at: existingOtp.generated_at,
                    expired_at: existingOtp.expired_at,
                    code: debug ? existingOtp.code : undefined,
                }
            });
        }

        const length = 4;

        const code = functions.generateRandomOTP(length);

        const result = await functions.sendOTP(phone, code);

        if (result) {
            const ttl = 3 * 60; // 3 minutes
            const generated_at = Date.now();
            const expired_at = Date.now() + ttl * 1000;
            // save to storage
            storage.set(`otp_${phone}`, {
                phone,
                code,
                ttl,
                generated_at,
                expired_at,
                length,
            }, { ttl: ttl * 1000 });

            return res.json({
                ok: true,
                status: 200,
                code: 'OTP_SENT',
                result: {
                    phone,
                    ttl,
                    length,
                    generated_at,
                    expired_at,
                    code: debug ? code : undefined,
                }
            });
        }

        // failed to send OTP
        return res.status(500).json({
            ok: false,
            status: 500,
            code: 'OTP_SEND_FAILED',
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            ok: false,
            status: 500,
            code: 'INTERNAL_SERVER_ERROR'
        });
    }
}

const otpVerify = async (req: Request, res: Response) => {
    try {
        let { phone, code } = req.body;

        phone = functions.convertPersianToEnglish(phone);

        const storedCode = storage.get(`otp_${phone}`);

        if (storedCode && storedCode.code == code) {
            // find the user by phone
            const user = await database.getUserByPhone(phone);

            const token = functions.generateToken(user);

            // delete otp storage
            storage.delete(`otp_${phone}`);

            // OTP is valid
            return res.json({
                ok: true,
                status: 200,
                code: 'AUTHED',
                token,
            });
        }

        return res.status(400).json({
            ok: false,
            status: 400,
            code: 'INVALID_OTP',
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            status: 500,
            code: 'INTERNAL_SERVER_ERROR'
        });
    }
}

export const setup = async (req: Request, res: Response) => {
    try {

        const users = await prisma.user.findMany({ where: { type: 'admin' } });

        if (users.length != 0) {
            return res.status(400).json({
                ok: false,
                status: 400,
                code: 'SETUP_ALREADY_COMPLETED',
            });
        }

        let { phone, name, national_id } = req.body;

        phone = functions.convertPersianToEnglish(phone);

        if (!national_id) {
            national_id = phone;
        }

        const user = await database.createUser({ phone, name, national_id, type: 'admin' });

        return res.json({
            ok: true,
            status: 201,
            user,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            ok: false,
            status: 500,
            code: 'INTERNAL_SERVER_ERROR'
        });
    }
}

const me = async (req: Request, res: Response) => {
    try {
        const user = await database.getUserById((req as any).user.id);

        return res.json({
            ok: true,
            status: 200,
            code: "THIS_IS_YOU",
            user
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            status: 500,
            code: 'INTERNAL_SERVER_ERROR'
        });
    }
}

const allUsers = async (req: Request, res: Response) => {
    try {
        const users = await database.getAllUsers((req as any).user.id);

        return res.json({
            ok: true,
            status: 200,
            code: "USERS_FETCHED",
            meta: {
                total: users.length,
            },
            users
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            status: 500,
            code: 'INTERNAL_SERVER_ERROR'
        });
    }
}

const createUser = async (req: Request, res: Response) => {
    try {
        let { phone, name, national_id, type } = req.body;

        const existingUser = await database.getUserByPhone(phone);

        if (existingUser) {
            return res.status(400).json({
                ok: false,
                status: 400,
                code: 'USER_ALREADY_EXISTS',
            });
        }

        phone = functions.convertPersianToEnglish(phone);

        const user = await database.createUser({ phone, name, national_id, type });

        return res.json({
            ok: true,
            status: 201,
            code: 'USER_CREATED',
            user,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            ok: false,
            status: 500,
            code: 'INTERNAL_SERVER_ERROR'
        });
    }
}

const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (id == (req as any).user.id) {
            return res.status(403).json({
                ok: false,
                status: 403,
                code: 'CANNOT_UPDATE_OWN_PROFILE',
            });
        }

        const updateData = req.body;

        const existingUser = await database.getUserById(parseInt(id));

        if (!existingUser) {
            return res.status(404).json({
                ok: false,
                status: 404,
                code: 'USER_NOT_FOUND',
            });
        }

        updateData.phone = functions.convertPersianToEnglish(updateData.phone);

        const updatedUser = await database.updateUser(parseInt(id), updateData);

        return res.json({
            ok: true,
            status: 200,
            code: 'USER_UPDATED',
            user: updatedUser,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            ok: false,
            status: 500,
            code: 'INTERNAL_SERVER_ERROR'
        });
    }
}

const createTicket = async (req: Request, res: Response) => {
    try {
        const { title, department, priority } = req.body;
        // const user_id = (req as any).user.id;
        let { id: user_id, type: user_type } = (req as any).user;

        if (user_type == 'admin') {
            user_id = req.body.user_id;

            if (!user_id) {
                return res.status(400).json({
                    ok: false,
                    status: 400,
                    code: 'USER_ID_REQUIRED_FOR_ADMIN',
                });
            }
        }

        const ticket = await database.createTicket({
            title,
            department,
            priority,
            user_id,
            status: 'open'
        });

        return res.json({
            ok: true,
            status: 201,
            code: 'TICKET_CREATED',
            ticket,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            ok: false,
            status: 500,
            code: 'INTERNAL_SERVER_ERROR'
        });
    }
}

const allTickets = async (req: Request, res: Response) => {
    try {
        const { id: user_id, type: user_type } = (req as any).user;

        const tickets = user_type == 'admin' ? await database.getAllTickets() : await database.getTicketsByUserId(user_id);

        return res.json({
            ok: true,
            status: 200,
            code: 'TICKETS_FETCHED',
            meta: {
                total: tickets.length,
            },
            tickets: tickets.map((item: any) => ({
                ...item,
                ticket_message: item.ticket_message.map((msg: any) => ({
                    ...msg,
                    content: JSON.parse(msg.content),
                })),
            })),
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            status: 500,
            code: 'INTERNAL_SERVER_ERROR'
        });
    }
}

const createTicketMessage = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { id: user_id, type: user_type } = (req as any).user;

        const { type, content } = req.body;

        const ticket = await database.getTicketById(parseInt(id));

        if (!ticket) {
            return res.status(404).json({
                ok: false,
                status: 404,
                code: 'TICKET_NOT_FOUND',
            });
        }

        if (ticket.user_id != user_id && user_type != 'admin') {
            return res.status(403).json({
                ok: false,
                status: 403,
                code: 'FORBIDDEN',
            });
        }

        const message = await database.createTicketMessage({
            ticket_id: ticket.id,
            type,
            content: JSON.stringify(content),
            user_id: user_id,
        });

        return res.json({
            ok: true,
            status: 201,
            code: 'TICKET_MESSAGE_CREATED',
            message: {
                ...message,
                content: JSON.parse(message.content),
            },
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            ok: false,
            status: 500,
            code: 'INTERNAL_SERVER_ERROR'
        });
    }
}

const getTicketById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { id: user_id, type: user_type } = (req as any).user;

        const ticket = await database.getTicketById(parseInt(id));

        if (!ticket) {
            return res.status(404).json({
                ok: false,
                status: 404,
                code: 'TICKET_NOT_FOUND',
            });
        }

        if (ticket.user_id != user_id && user_type != 'admin') {
            return res.status(403).json({
                ok: false,
                status: 403,
                code: 'FORBIDDEN',
            });
        }

        const messages = await database.getTicketMessagesByTicketId(ticket.id);

        return res.json({
            ok: true,
            status: 200,
            code: 'TICKET_FETCHED',
            ticket,
            messages: messages.map((item: any) => ({
                ...item,
                content: JSON.parse(item.content),
            })),
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            ok: false,
            status: 500,
            code: 'INTERNAL_SERVER_ERROR'
        });
    }
}

const changeTicketStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { type: userType, id: userId } = (req as any).user;

        const { status } = req.body;

        if (userType != 'admin' && status != 'closed') {
            return res.status(403).json({
                ok: false,
                status: 403,
                code: 'FIRBIDDEN'
            });
        }

        const ticket = await database.getTicketById(parseInt(id));

        if (!ticket) {
            return res.status(404).json({
                ok: false,
                status: 404,
                code: 'TICKET_NOT_FOUND',
            });
        }

        if (ticket.user_id != userId && userType != 'admin') {
            return res.status(403).json({
                ok: false,
                status: 403,
                code: 'FORBIDDEN',
            });
        }

        const updatedTicket = await database.changeTicketStatus(ticket.id, status);

        return res.json({
            ok: true,
            status: 200,
            code: 'TICKET_STATUS_UPDATED',
            ticket: updatedTicket,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            ok: false,
            status: 500,
            code: 'INTERNAL_SERVER_ERROR'
        });
    }
}

const createOrder = async (req: Request, res: Response) => {
    try {
        const user_id = (req as any).user.id;

        const order = await database.createOrder({
            user_id,
            ...req.body
        });

        return res.json({
            ok: true,
            status: 201,
            code: 'ORDER_CREATED',
            order,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            ok: false,
            status: 500,
            code: 'INTERNAL_SERVER_ERROR'
        });
    }
}

const allOrders = async (req: Request, res: Response) => {
    try {
        const { id: user_id, type: user_type } = (req as any).user;

        let orders;
        if (user_type === 'admin') {
            orders = await database.getAllOrders();
        } else {
            orders = await database.getOrdersByUserId(user_id);
        }

        return res.json({
            ok: true,
            status: 200,
            code: 'ORDERS_FETCHED',
            meta: {
                total: orders.length,
            },
            orders,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            ok: false,
            status: 500,
            code: 'INTERNAL_SERVER_ERROR'
        });
    }
}

// آپلود فایل تکی
const uploadSingle = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                ok: false,
                status: 400,
                code: 'NO_FILE_UPLOADED',
            });
        }

        const fileInfo = {
            filename: req.file.filename,
            mimetype: req.file.mimetype,
            size: req.file.size,
            url: `/uploads/${req.file.filename}`,
        };

        return res.json({
            ok: true,
            status: 200,
            code: 'FILE_UPLOADED_SUCCESSFULLY',
            file: fileInfo,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            status: 500,
            code: 'INTERNAL_SERVER_ERROR'
        });
    }
}

export default {
    setup,
    otpRequest,
    otpVerify,
    me,
    allUsers,
    createConsultation,
    allConsultations,
    createUser,
    updateUser,
    createTicket,
    allTickets,
    createTicketMessage,
    getTicketById,
    changeTicketStatus,
    createOrder,
    allOrders,
    uploadSingle,
}
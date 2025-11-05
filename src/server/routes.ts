import express, { Router } from "express";
import path from "path";
import middlewares from "./middlewares";
import validators from "./validators";
import controllers from "./controllers";
import upload from "./upload";

const router = Router();

router.use(express.json());

// سرو فایل‌های آپلود شده
router.use('/uploads', express.static(path.join(process.cwd(), 'volume/uploads')));

// auth
router.post('/auth/request', middlewares.captcha, middlewares.validate(validators.auth_request), controllers.otpRequest);
router.post('/auth/verify', middlewares.captcha, middlewares.validate(validators.auth_verify), controllers.otpVerify);
router.get('/auth/me', middlewares.auth(), controllers.me);

// ticket
router.post('/ticket', middlewares.auth(), middlewares.validate(validators.ticket), controllers.createTicket);
router.post('/ticket/:id/message', middlewares.auth(), middlewares.validate(validators.ticket_message), controllers.createTicketMessage);
router.post('/ticket/:id/status', middlewares.auth(), middlewares.admin, middlewares.validate(validators.ticket_status), controllers.changeTicketStatus);
router.get('/ticket', middlewares.auth(), middlewares.validate(validators.pagination), controllers.allTickets);
router.get('/ticket/:id', middlewares.auth(), controllers.getTicketById);

// user
router.post('/user', middlewares.auth(), middlewares.admin, middlewares.validate(validators.user), controllers.createUser);
router.post('/user/:id', middlewares.auth(), middlewares.admin, middlewares.validate(validators.user), controllers.updateUser);
router.get('/user', middlewares.auth(), middlewares.admin, controllers.allUsers);

// order
router.post('/order', middlewares.captcha, middlewares.auth(true), middlewares.validate(validators.order), controllers.createOrder);
router.get('/order', middlewares.auth(), middlewares.admin, controllers.allOrders);

// consultation
router.post('/consultation', middlewares.captcha, middlewares.auth(true), middlewares.validate(validators.consultation), controllers.createConsultation);
router.get('/consultation', middlewares.auth(), middlewares.admin, controllers.allConsultations);

// setup
router.post('/setup', middlewares.validate(validators.setup), controllers.setup);

// upload
router.post('/upload', middlewares.auth(), upload, controllers.uploadSingle);


export default router;
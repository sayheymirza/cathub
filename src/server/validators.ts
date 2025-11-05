import Validator from 'fastest-validator';

const v = new Validator();

const consultation = v.compile({
    name: { type: "string", min: 3, max: 100, optional: false },
    // iranian phone number regex
    phone: { type: "string", pattern: /^(?:\+98|0)?9\d{9}$/, optional: false },
    message: { type: "string", min: 10, max: 1000, optional: true },
});

const order = v.compile({
    company: { type: "boolean", optional: true, default: false },
    firstname: { type: "string", min: 1, max: 100, optional: false },
    lastname: { type: "string", min: 1, max: 100, optional: true },
    phone: { type: "string", pattern: /^(?:\+98|0)?9\d{9}$/, optional: false },
    national_id: { type: "string", max: 10, optional: false },
    email: { type: "email", optional: false },
    address: { type: "string", min: 4, max: 500, optional: false },
    province: { type: "string", min: 2, max: 50, optional: false },
    city: { type: "string", min: 2, max: 50, optional: false },
    postal_code: { type: "string", optional: true },
    company_name: { type: "string", max: 200, optional: true },
    company_phone: { type: "string", optional: true },
    company_register_number: { type: "string", max: 50, optional: true },
    company_economic_code: { type: "string", max: 50, optional: true },
    service_category: { type: "enum", values: ['چت اختصاصی'] },
    service_subcategory: {
        type: "enum",
        values: [
            'سازمان ها',
            'استارتاپ ها',
            'تیم های پشتیبانی',
            'شبکه های اجتماعی',
        ]
    },
    service_description: { type: "string", min: 10, max: 1000, optional: false }
});

const ticket = v.compile({
    title: { type: "string", min: 3, optional: false },
    department: { type: "enum", values: ["sales", "support", "technical"] },
    priority: { type: "enum", values: ["low", "medium", "high"], },
    user_id: { type: "number", optional: true, convert: true },
});

const ticket_message = v.compile({
    type: { type: "enum", values: ["text", "image", "file"] },
    content: { type: "object", convert: true },
});

const ticket_status = v.compile({
    status: { type: "enum", values: ["open", "closed", "waiting-for-response", "resolved"], optional: false },
});

const user = v.compile({
    name: { type: "string", min: 3 },
    type: { type: "enum", values: ['admin', 'company', 'user'] },
    phone: { type: "string", pattern: /^(?:\+98|0)?9\d{9}$/, optional: false },
    national_id: { type: "string" },
});

const auth_request = v.compile({
    phone: { type: "string", pattern: /^(?:\+98|0)?9\d{9}$/, optional: false },
});

const auth_verify = v.compile({
    phone: { type: "string", pattern: /^(?:\+98|0)?9\d{9}$/, optional: false },
    code: { type: "string", min: 4, max: 4, optional: false },
});

const setup = v.compile({
    name: { type: "string", min: 3 },
    phone: { type: "string", pattern: /^(?:\+98|0)?9\d{9}$/, optional: false },
});

const pagination = v.compile({
    page: { type: "number", min: 1, optional: true, default: 1, convert: true },
    limit: { type: "number", min: 1, max: 100, optional: true, default: 10, convert: true },
});

export default {
    consultation,
    order,
    ticket,
    ticket_message,
    ticket_status,
    user,
    auth_request,
    auth_verify,
    setup,
    pagination,
}
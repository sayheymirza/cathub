import jwt from 'jsonwebtoken';
import axios from 'axios';
import debug from './debug';

const JWT_SECRET = process.env['JWT_SECRET'] || 'default_secret';
const JWT_ISSUER = process.env['JWT_ISSUER'] || 'default_issuer';

const OTP_PROVIDER = process.env['OTP_PROVIDER'] || 'default_provider';
const OTP_TEMPLATE = process.env['OTP_TEMPLATE'] || 'default_template';
const OTP_API_KEY = process.env['OTP_API_KEY'] || 'default_api_key';

const {
    CAPTCHA_PROVIDER,
    CAPTCHA_SITE_KEY,
    CAPTCHA_SECRET_KEY
} = process.env;

const generateToken = (user: any) => {
    return jwt.sign({ id: user.id, type: user.type }, JWT_SECRET, { expiresIn: '30d', issuer: JWT_ISSUER, algorithm: 'HS256' });
};

const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, JWT_SECRET, { issuer: JWT_ISSUER, algorithms: ['HS256'] });
    } catch (err) {
        console.error(err);
        return null;
    }
};

const sendOTP = async (phone: string, code: string) => {
    try {
        if (debug) {
            return true;
        }

        switch (OTP_PROVIDER) {
            case 'ghasedak':
                const response = await axios.post(
                    'https://api.ghasedak.me/v2/verification/send/simple',
                    `receptor=${phone}&template=${OTP_TEMPLATE}&type=1&param1=${code}`,
                    {
                        headers: {
                            'apikey': OTP_API_KEY,
                            'cache-control': 'no-cache',
                            'content-type': 'application/x-www-form-urlencoded'
                        }
                    }
                );

                return response.status == 200;

            default:
                return false;
        }
    } catch (error) {
        console.error((error as any).response?.data);
        return false;
    }
}

const verifyRecaptcha = async (token: string) => {
    try {
        switch (CAPTCHA_PROVIDER) {
            case 'arcaptcha':
                const arcaptcha_api = "https://api.arcaptcha.ir/arcaptcha/api/verify";

                const result = await axios.post(arcaptcha_api, {
                    challenge_id: token,
                    site_key: CAPTCHA_SITE_KEY,
                    secret_key: CAPTCHA_SECRET_KEY,
                });

                return result.data.success;
            default:
                return false;
        }
    } catch (error) {
        return false;
    }
}

const generateRandomOTP = (length: number) => {
    let otp = '';

    for (let i = 0; i < length; i++) {
        otp += Math.floor(Math.random() * 10).toString();
    }

    return otp;
}

const convertPersianToEnglish = (str: string): string => {
    const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let result = str;
    for (let i = 0; i < persianNumbers.length; i++) {
        result = result.replace(new RegExp(persianNumbers[i], 'g'), englishNumbers[i]);
    }

    return result;
};

export default {
    generateToken,
    verifyToken,
    sendOTP,
    verifyRecaptcha,
    generateRandomOTP,
    convertPersianToEnglish,
}
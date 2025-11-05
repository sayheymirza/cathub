import { NextFunction, Request, Response } from "express";
import { AsyncCheckFunction, SyncCheckFunction } from "fastest-validator";
import functions from "./functions";
import debug from "./debug";

const auth = (guest: boolean = false) => (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined = req.headers["authorization"] || req.query['token'] || req.body.token;    

    if (!token && !guest) {
        return res.status(401).json({
            ok: false,
            status: 401,
            code: 'NO_TOKEN',
        });
    }

    if (token) {
        token = token.replace('Bearer ', '');

        const verified = functions.verifyToken(token as string);

        if (!verified) {
            return res.status(401).json({
                ok: false,
                status: 401,
                code: 'INVALID_TOKEN',
                token,
            });
        }

        (req as any).user = verified;
    }

    return next();
}

const admin = (req: Request, res: Response, next: NextFunction) => {
    if ((req as any).user.type == 'admin') {
        next();
    } else {
        res.status(403).json({
            ok: false,
            status: 403,
            code: 'FORBIDDEN',
        });
    }
}

const validate = (check: SyncCheckFunction | AsyncCheckFunction) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body || req.query;

        if (body == undefined) {
            return res.status(400).json({
                ok: false,
                status: 400,
                code: 'NO_DATA',
            });
        }

        const result = await check(body);

        if (typeof result == 'boolean' && result == true) {
            return next();
        }

        return res.status(400).json({
            ok: false,
            status: 400,
            code: 'BAD_DATA',
            data: result
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            status: 500,
            code: 'INTERNAL_SERVER_ERROR'
        })
    }
}

const captcha = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (debug) {
            return next();
        }

        const token = req.body?.captcha || req.query['captcha'] || req.headers['x-captcha-token'];

        if (!token) {
            return res.status(400).json({
                ok: false,
                status: 400,
                code: 'NO_CAPTCHA_TOKEN',
            });
        }

        const verified = await functions.verifyRecaptcha(token as string);

        if (!verified) {
            return res.status(400).json({
                ok: false,
                status: 400,
                code: 'INVALID_CAPTCHA',
            });
        }

        return next();
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            ok: false,
            status: 500,
            code: 'INTERNAL_SERVER_ERROR'
        })
    }
}

export default {
    auth,
    admin,
    validate,
    captcha,
}
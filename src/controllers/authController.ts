import type { Request, Response, NextFunction } from "express";
import { login, register } from "../services/authUsers";
import { loginSchema, registerSchema } from "../utils/validators";

async function registerController(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const validRegister = registerSchema.parse(req.body);
        const user = await register(
            validRegister.username,
            validRegister.email,
            validRegister.password
        );

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}
async function loginController(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const validLogin = loginSchema.parse(req.body);
        const result = await login(validLogin.email, validLogin.password);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

export { loginController, registerController };

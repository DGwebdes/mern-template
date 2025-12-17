import z from "zod";

export const registerSchema = z
    .object({
        username: z.string().min(6, "Username must be at least 6 characters"),
        email: z.email("Invalid email format"),
        password: z.string().min(12, "Password must be at least 12 characters"),
        passConfirm: z.string(),
    })
    .refine((data) => data.password === data.passConfirm, {
        message: "Passwords don't match",
        path: ["passConfirm"],
    });
export const loginSchema = z.object({
    email: z.email("Wrong credentials"),
    password: z.string().min(1, "Missing credentials"),
});
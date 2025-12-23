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
    password: z
        .string("Missing credentials")
        .min(12, "Password must be at least 12 characters"),
});
export const updateProfileSchema = z
    .object({
        username: z.string().min(6).optional(),
        email: z.email(),
    })
    .refine((data) => data.username || data.email, {
        message: "At least one field must provided",
    });

export const changePasswordSchema = z
    .object({
        oldPassword: z.string().min(12),
        newPass: z.string().min(12, "Password must be at least 12 characters"),
        newPassConfirm: z.string().min(1),
    })
    .refine((data) => data.newPass === data.newPassConfirm, {
        message: "Passwords do not match",
        path: ["newPassConfirm"],
    })
    .refine((data) => data.newPass !== data.oldPassword, {
        message: "New password cannot be equal to current password",
        path: ["newPass"],
    });
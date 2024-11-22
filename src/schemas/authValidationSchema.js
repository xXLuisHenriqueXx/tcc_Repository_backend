const { z } = require("zod");

const registerSchema = z.object({
    name: z.string().trim().min(1, { message: "Name must have at least 1 character" }),
    email: z.string().trim().email({ message: "Invalid email format" }).min(1, { message: "Email must have at least 1 character" }),
    password: z.string().trim().min(8, { message: "Password must have at least 8 character" }),
    confirmPassword: z.string().trim().min(8, { message: "Password must have at least 8 character" }),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});

const loginSchema = z.object({
    email: z.string().trim().email({ message: "Invalid email format" }).min(1, { message: "Email must have at least 1 character" }),
    password: z.string().trim().min(8, { message: "Password must have at least 8 character" }),
});

module.exports = {
    registerSchema,
    loginSchema
}
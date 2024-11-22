const { z } = require("zod");

const updateUserValidationSchema = z.object({
    name: z.string().trim().min(1, { message: "Name must have at least 1 character" }),
    email: z.string().trim().email({ message: "Invalid email format" }).min(1, { message: "Email must have at least 1 character" })
});

const updatePasswordValidationSchema = z.object({
    password: z.string().trim().min(8, { message: "Password must have at least 8 character" }),
    newPassword: z.string().trim().min(8, { message: "Password must have at least 8 character" }),
    confirmNewPassword: z.string().trim().min(8, { message: "Password must have at least 8 character" }),
}).refine(data => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"]
});

module.exports = {
    updateUserValidationSchema,
    updatePasswordValidationSchema
};
const { z } = require("zod");

const createNoteValidationSchema = z.object({
    title: z.string().trim().min(1, { message: "Title must have at least 1 character" }).max(40, { message: "Title must have at most 40 characters" }),
    content: z.string().trim().min(1, { message: "Content must have at least 1 character" })
});

const updateNoteValidationSchema = z.object({
    title: z.string().trim().min(1, { message: "Title must have at least 1 character" }).max(40, { message: "Title must have at most 40 characters" }),
    content: z.string().trim().min(1, { message: "Content must have at least 1 character" })
});

module.exports = {
    createNoteValidationSchema,
    updateNoteValidationSchema
}
const { z } = require("zod");

const taskSchema = z.object({
    title: z.string().trim().min(1, { message: "Task title must have at least 1 character" }),
    done: z.boolean(),
});

const createTodoValidationSchema = z.object({
    title: z.string().trim().min(1, { message: "Title must have at least 1 character" }).max(40, { message: "Title must have at most 40 characters" }),
    tasks: z.array(taskSchema).optional(), 
});

const updateTodoValidationSchema = z.object({
    title: z.string().trim().min(1, { message: "Title must have at least 1 character" }).max(40, { message: "Title must have at most 40 characters" }),
    tasks: z.array(taskSchema).optional(), 
});

module.exports = {
    createTodoValidationSchema,
    updateTodoValidationSchema,
};

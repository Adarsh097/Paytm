import {z}  from "zod";

const userSchema = z.object({
    firstName: z.string().min(1).max(100).optional(),
    lastName: z.string().min(1).max(100).optional(),
    email: z.email().optional(),
    password: z.string().min(6).max(15).optional(),
});

export default userSchema;
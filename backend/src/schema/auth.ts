import { z } from "zod"


export const signupBody = z.object({
    email: z.email().min(6).max(50),
    password: z.string().min(6).max(50),
    firstName: z.string().max(30),
    lastName: z.string().max(30),
    adminKey: z.string().optional()
})

export const loginBody = z.object({
    email: z.email().min(3).max(30),
    password: z.string().min(3).max(10),
})

export const updateBody = z.object({
    email: z.email().optional(),
    currentPassword: z.string().min(6).optional(),
    newPassword: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional()
})
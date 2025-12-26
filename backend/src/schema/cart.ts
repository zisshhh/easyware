import { z } from "zod"

export const addToCartBody = z.object({
    productId: z.string(),
    quantity: z.number().min(1).default(1)
})

export const updateCartBody = addToCartBody.partial();
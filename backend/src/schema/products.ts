import { z } from "zod"

export const productBody = z.object({
    name: z.string().min(1),
    price: z.number().nonnegative(),
    brand: z.string(),
    description: z.string(),
    category: z.string(),
    imageURL: z.array(z.string())
})

export const updateProductBody = productBody.partial();
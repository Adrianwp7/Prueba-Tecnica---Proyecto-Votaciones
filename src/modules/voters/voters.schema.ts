import z, { email } from "zod";

export const createVoterSchema = z.object({
    name: z.string().min(1),
    email: z.string().email()
})

export const voterParamsSchema = z.object({
    id: z.coerce.number().int().positive(),
})

export const searchVoterSchema = z.object({
    name: z.string().min(1)
})
export type CreateVoterInput = z.infer<typeof createVoterSchema>
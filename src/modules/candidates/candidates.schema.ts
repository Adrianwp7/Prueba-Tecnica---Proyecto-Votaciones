import z, { email } from "zod";

export const createCandidateSchema = z.object({
    name: z.string().min(1),
    party: z.string().min(1).optional()
})

export const candidateParamsSchema = z.object({
    id: z.coerce.number().int().positive(),
})

export type CreateCandidateInput = z.infer<typeof createCandidateSchema>
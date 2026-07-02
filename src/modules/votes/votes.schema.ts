import z from "zod";

export const createVoteSchema = z.object({
    voterId: z.number(),
    candidateId: z.number()
})

export type CreateVoteInput = z.infer<typeof createVoteSchema>
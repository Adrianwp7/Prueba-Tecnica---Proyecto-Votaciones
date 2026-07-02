import type { FastifyInstance } from "fastify";
import { CandidatesRepository } from "./candidates.repository";
import { CandidatesServices } from "./candidates.services";
import { CandidatesController } from "./candidates.controller";


export async function candidateRoutes(fastify:FastifyInstance){
    const repository = new CandidatesRepository(fastify.pg)
    const service = new CandidatesServices(repository)
    const controller = new CandidatesController(service)
    fastify.post("/",controller.create)
    fastify.get("/",controller.getAll)
    fastify.get("/:id",controller.getById)
    fastify.delete("/:id",controller.delete)
}
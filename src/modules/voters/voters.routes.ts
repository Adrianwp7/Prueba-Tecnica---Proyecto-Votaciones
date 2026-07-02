import type { FastifyInstance } from "fastify";
import { VotersRepository } from "./voters.repository";
import { VotersServices } from "./voters.services";
import { VotersController } from "./voters.controller";

export async function votersRoutes(fastify:FastifyInstance){
    const repository = new VotersRepository(fastify.pg)
    const service = new VotersServices(repository)
    const controller = new VotersController(service)
    fastify.post("/",controller.create)
    fastify.get("/",controller.getAll)
    fastify.get("/:id",controller.getById)
    fastify.delete("/:id",controller.delete)
    fastify.get("/search",controller.getByName)
}
import type { FastifyInstance } from "fastify";
import { VotesRepository } from "./votes.repository";
import { VotesServices } from "./votes.service";
import { VotesController } from "./votes.controller";


export async function votesRoutes(fastify:FastifyInstance){
    const repository = new VotesRepository(fastify.pg)
    const service = new VotesServices(repository)
    const controller = new VotesController(service)
    fastify.post("/",controller.create)
    fastify.get("/",controller.getAll)
    fastify.get("/statistics",controller.getStatisticsVotes)
}
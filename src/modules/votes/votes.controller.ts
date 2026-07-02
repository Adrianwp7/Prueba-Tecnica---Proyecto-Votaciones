import { FastifyReply, FastifyRequest } from "fastify";
import { VotesServices } from "./votes.service";
import { createVoteSchema } from "./votes.schema";
import { searchVoterSchema, voterParamsSchema } from "../voters/voters.schema";

export class VotesController{
    constructor(private service: VotesServices){}

    create = async(request:FastifyRequest, reply: FastifyReply)=>{
        const data = createVoteSchema.parse(request.body)
        const vote = await this.service.createVote(data.voterId, data.candidateId)
        return reply.status(201).send(vote)
    }

    getAll = async(_request:FastifyRequest, reply: FastifyReply)=>{
        const votes = await this.service.getAllVotes()
        return reply.send(votes)
    }

    getStatisticsVotes = async(_request:FastifyRequest, reply: FastifyReply)=>{
        const statisticsVotes = await this.service.getStatisticsVotes()
        return reply.send(statisticsVotes)
    }
}
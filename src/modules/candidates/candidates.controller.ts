import { FastifyReply, FastifyRequest } from "fastify";
import { candidateParamsSchema, createCandidateSchema } from "./candidates.schema";
import { CandidatesServices } from "./candidates.services";

export class CandidatesController{
    constructor(private service: CandidatesServices){}

    create = async(request:FastifyRequest, reply: FastifyReply)=>{
        const data = createCandidateSchema.parse(request.body)
        const candidate = await this.service.createCandidate(data.name, data.party||"")
        return reply.status(201).send(candidate)
    }

    getAll = async(_request:FastifyRequest, reply: FastifyReply)=>{
        const voters = await this.service.getAllCandidates()
        return reply.send(voters)
    }

    getById = async(request:FastifyRequest, reply: FastifyReply)=>{
        const {id} = candidateParamsSchema.parse(request.params)
        const voter = await this.service.getCandidateById(id)
        return reply.send(voter)
    }

    delete = async(request:FastifyRequest, reply: FastifyReply)=>{
        const {id} = candidateParamsSchema.parse(request.params)
        await this.service.deleteCandidate(id)
        return reply.status(204).send()
    }
}
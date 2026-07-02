import { FastifyReply, FastifyRequest } from "fastify";
import { VotersServices } from "./voters.services";
import { createVoterSchema, searchVoterSchema, voterParamsSchema } from "./voters.schema";

export class VotersController{
    constructor(private service: VotersServices){}

    create = async(request:FastifyRequest, reply: FastifyReply)=>{
        const data = createVoterSchema.parse(request.body)
        const voter = await this.service.createVoter(data.name, data.email)
        return reply.status(201).send(voter)
    }

    getAll = async(_request:FastifyRequest, reply: FastifyReply)=>{
        const voters = await this.service.getAllVoters()
        return reply.send(voters)
    }

    getById = async(request:FastifyRequest, reply: FastifyReply)=>{
        const {id} = voterParamsSchema.parse(request.params)
        const voter = await this.service.getVoterById(id)
        return reply.send(voter)
    }

    getByName = async(request:FastifyRequest, reply: FastifyReply)=>{
        const {name} = searchVoterSchema.parse(request.query)
        const voter = await this.service.getVoterByName(name)
        return reply.send(voter)
    }

    delete = async(request:FastifyRequest, reply: FastifyReply)=>{
        const {id} = voterParamsSchema.parse(request.params)
        await this.service.deleteVoters(id)
        return reply.status(204).send()
    }
}
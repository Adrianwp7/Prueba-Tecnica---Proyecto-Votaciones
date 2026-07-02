import { AppError } from "../../common/errors";
import { VotesRepository } from "./votes.repository";

export class VotesServices{
    constructor(private repository: VotesRepository){}
    async createVote(voterId:number, candidateId:number){
        const existingVoter = await this.repository.findVoterById(voterId)
        if(!existingVoter){
            throw new AppError(404, "votante no encontrado")
        }
        if(existingVoter.has_voted){
            throw new AppError(409, "Ya se registro un votante con esa identificación")
        }
        const existingCandidate = await this.repository.findCandidateById(candidateId)
        if(!existingCandidate){
            throw new AppError(404, "candidato no encontrado")
        }
        return await this.repository.createVote(voterId,candidateId)
    }

    async getAllVotes(){
        return await this.repository.getAllVotes()
    }

    async getStatisticsVotes(){
        return await this.repository.getStatistics()
    }
}
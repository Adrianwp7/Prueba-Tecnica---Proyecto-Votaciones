import { AppError } from "../../common/errors";
import { CandidatesRepository } from "./candidates.repository";


export class CandidatesServices{
    constructor(private repository: CandidatesRepository){}
    async createCandidate(name:string, party:string){
        return await this.repository.create(name,party)
    }

    async getAllCandidates(){
        return await this.repository.findAll()
    }

    async getCandidateById(id:number){
        const candidate = await this.repository.findById(id)
        if(!candidate){
            throw new AppError(404, "Candidato no encontrado")
        }
        return candidate
    }

    async deleteCandidate(id:number){
        const candidate = await this.repository.delete(id)
        if(!candidate){
            throw new AppError(404, "Candidato no encontrado")
        }
        return candidate
    }

}
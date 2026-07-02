import { AppError } from "../../common/errors";
import { VotersRepository } from "./voters.repository";

export class VotersServices{
    constructor(private repository: VotersRepository){}
    async createVoter(name:string, email:string){
        const existing = await this.repository.findByEmail(email)
        if(existing){
            throw new AppError(409, "ya existe un votante con ese correo electronico")
        }
        return await this.repository.create(name,email)
    }

    async getAllVoters(){
        return await this.repository.findAll()
    }

    async getVoterById(id:number){
        const voter = await this.repository.findById(id)
        if(!voter){
            throw new AppError(404, "Votante no encontrado")
        }
        return voter
    }

    async getVoterByName(name:string){
        const voters = await this.repository.findByName(name)
        if(voters.length<0){
            throw new AppError(404, "No hay ningun votante con ese nombre")
        }
        return voters
    }

    async deleteVoters(id:number){
        const voter = await this.repository.delete(id)
        if(!voter){
            throw new AppError(404, "Votante no encontrado")
        }
        return voter
    }

}
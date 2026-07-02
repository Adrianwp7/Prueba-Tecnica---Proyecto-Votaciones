import { Pool } from "pg";

export class VotesRepository{
    constructor(private pool: Pool){}
    async createVote(voterId:number, candidateId:number){
        const client = await this.pool.connect()
        try {
            await client.query("BEGIN")
            await client.query("UPDATE voters SET has_voted = true WHERE id = $1",[voterId])
            await client.query("UPDATE candidates SET votes = votes + 1 WHERE id = $1",[candidateId])
            const result = await client.query("INSERT INTO votes(voter_id,candidate_id) VALUES($1,$2) RETURNING *",[voterId,candidateId])
            await client.query("COMMIT")
            return result.rows[0]
        } catch (error) {
            await client.query("ROLLBACK")
            throw error
        }
        finally{
            client.release()
        }
    }

    async getAllVotes(){
        const result = await this.pool.query("SELECT * FROM votes ORDER BY created_at DESC")
        return result.rows
    }

    async findVoterById(voterId:number){
        const result = await this.pool.query("SELECT * FROM voters WHERE id = $1",[voterId])
        return result.rows[0]
    }

    async findCandidateById(candidateId:number){
        const result = await this.pool.query("SELECT * FROM candidates WHERE id = $1",[candidateId])
        return result.rows[0]
    }

    async getStatistics(){
        const totalVotersResult = await this.pool.query("SELECT COUNT(*) FROM voters")
        const votedResult = await this.pool.query("SELECT COUNT(*) FROM voters WHERE has_voted = true")
        const candidatesResult = await this.pool.query("SELECT id,name,party,votes FROM candidates ORDER BY votes DESC")
        const totalVotes = candidatesResult.rows.reduce((sum,c)=>sum+c.votes,0)
        return {
            total_voters:Number(totalVotersResult.rows[0].count),
            voted_count:Number(votedResult.rows[0].count),
            total_votes:totalVotes,
            candidates:candidatesResult.rows.map((c)=>({
                ...c,
                percentage:totalVotes>0?((c.votes/totalVotes)*100).toFixed(2):"0.00"
            }))
        }
    }
}
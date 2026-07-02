import { Pool } from "pg";

export class CandidatesRepository{
    constructor(private pool: Pool){}

    async create(name: string, party: string){
        const result = await this.pool.query(
            "INSERT INTO candidates (name,party) VALUES ($1,$2) RETURNING *",
            [name,party]
        )
        return result.rows[0]
    }

    async findAll(){
        const result = await this.pool.query("SELECT * FROM candidates ORDER BY id")
        return result.rows
    }

    async findById(id:number){
        const result = await this.pool.query("SELECT * FROM candidates WHERE id = $1", [id])
        return result.rows[0]
    }

    async delete(id:number){
        const result = await this.pool.query("DELETE FROM candidates WHERE id = $1 RETURNING *", [id])
        return result.rows[0]
    }
}

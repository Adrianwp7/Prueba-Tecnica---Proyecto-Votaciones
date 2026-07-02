import { Pool } from "pg";

export class VotersRepository{
    constructor(private pool: Pool){}

    async create(name: string, email: string){
        const result = await this.pool.query(
            "INSERT INTO voters (name,email) VALUES ($1,$2) RETURNING *",
            [name,email]
        )
        return result.rows[0]
    }

    async findAll(){
        const result = await this.pool.query("SELECT * FROM voters ORDER BY id")
        return result.rows
    }

    async findById(id:number){
        const result = await this.pool.query("SELECT * FROM voters WHERE id = $1", [id])
        return result.rows[0]
    }

    async findByEmail(email:string){
        const result = await this.pool.query("SELECT * FROM voters WHERE email = $1", [email])
        return result.rows[0]
    }

    async findByName(name:string){
        const result = await this.pool.query("SELECT * FROM voters WHERE name ILIKE $1 ORDER BY name",[`%${name}%`])
        return result.rows
    }

    async delete(id:number){
        const result = await this.pool.query("DELETE FROM voters WHERE id = $1 RETURNING *", [id])
        return result.rows[0]
    }
}


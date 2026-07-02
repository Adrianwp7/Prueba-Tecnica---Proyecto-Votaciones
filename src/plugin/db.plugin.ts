import fp from "fastify-plugin"
import type {FastifyInstance} from "fastify"
import { Pool } from "pg";

declare module "fastify"{
    interface FastifyInstance {
        pg: Pool 
    }
}
export default fp(async (fastify:FastifyInstance)=>{
    const pool = new Pool({connectionString:process.env.DATABASE_URL})
    fastify.decorate("pg",pool)
    fastify.addHook("onClose",async(instance)=>{
        await instance.pg.end()
    })
})
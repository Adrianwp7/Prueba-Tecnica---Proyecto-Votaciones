import fp from "fastify-plugin"
import { AppError } from "../common/errors"

export default fp(async (fastify)=>{
    fastify.setErrorHandler((error,request,reply)=>{
        if(error instanceof AppError){
            return reply.status(error.statusCode).send({error:error.message})
        }
        request.log.error(error)
        return reply.status(500).send({error:"error interno del servidor"})
    })
})
import Fastify from "fastify";
import errorHandlerPlugin from "./plugin/error-handler.plugin";
import dbPlugin from "./plugin/db.plugin";
import swaggerPlugin from "./plugin/swagger.plugin";
import { votersRoutes } from "./modules/voters/voters.routes";
import { candidateRoutes } from "./modules/candidates/candidate.routes";
import { votesRoutes } from "./modules/votes/votes.routes";

export function buildApp(){
    const app = Fastify({logger:true})
    app.register(errorHandlerPlugin)
    app.register(dbPlugin)
    app.register(swaggerPlugin)
    app.register(votersRoutes,{prefix:"/voters"})
    app.register(candidateRoutes,{prefix:"/candidates"})
    app.register(votesRoutes, {prefix:"/votes"})
    return app
}
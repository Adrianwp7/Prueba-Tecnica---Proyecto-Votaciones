import "dotenv/config"
import { buildApp } from "./app"
import { env } from "node:process"

const app = buildApp()
app.listen({port:Number(env.PORT),host:"0.0.0.0"},(err)=>{
    if(err){
        app.log.error(err)
        process.exit(1)
    }
})
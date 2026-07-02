import { error } from "console";
import "dotenv/config"
import fs from "fs";
import path from "path";
import { Pool } from "pg";

const pool = new Pool({connectionString:process.env.DATABASE_URL})
async function migrate() {
    const dir = path.join(__dirname,"../db/migrations")
    const files = fs.readdirSync(dir).sort()
    for(const file of files){
        const sql = fs.readFileSync(path.join(dir,file),"utf-8")
        console.log(`aplicando ${file}...`)
        await pool.query(sql)
    }
    console.log("migraciones completas")
    await pool.end()
}
migrate().catch((err)=>{
    console.error(err)
    process.exit(1)
})
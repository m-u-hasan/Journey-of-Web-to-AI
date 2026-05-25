import dotenv from "dotenv"
import { env } from "process"

dotenv.config({quiet:true})

const config={
   // port: process.env.PORT
   port: env.PORT,
   database_url: env.DATABASE_URL

}

export default config
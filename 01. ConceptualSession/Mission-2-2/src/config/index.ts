import dotenv from "dotenv"
import { env } from "process"

dotenv.config({ quiet: true })

const config = {
    // port: process.env.PORT
    port: env.PORT as string,
    database_url: env.DATABASE_URL as string,
    node_env: env.NODE_ENV,
    jwt_secrete: env.JWT_SECRETE as string,
    refresh_secrete: env.REFRESH_SECRETE as string
}


export default config
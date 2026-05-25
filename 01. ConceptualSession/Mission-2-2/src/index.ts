import app from "./app"
import config from "./config";
import { initDB } from "./db";

const main = async () => {
    //check database url from congir->env
    //console.log(config.database_url);
    initDB();
    app.listen(config.port, () => {

        console.log(`Server runnig at ${config.port}`);
    })
}

main()
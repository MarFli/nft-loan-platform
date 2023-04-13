//==================================================================================================
// Imports
//==================================================================================================
// Standard Library
import http from "http";

// Third Party
import * as dotenv from 'dotenv';

// Application
import { MySqlApi } from "./src/services/mySql.api";
import { AlchemyApi } from "./src/services/alchemy.api";

import { NftRouter } from "./src/routes/nft.rou";
import { NftModel } from "./src/models/nft.mod";
import { NftController } from "./src/controllers/nft.con";
import { UserRouter } from "./src/routes/user.rou";
import { UserModel } from "./src/models/user.mod";
import { UserController } from "./src/controllers/user.con";

import { App } from "./src/app";


//==================================================================================================
// Server
//==================================================================================================
dotenv.config()

// Prepare Variables
const port: number              = Number(process.env.PORT!);
const app_CorsOrigin: string    = process.env.APP_CORS_ORIGIN!;

const alchemy_ApiKey: string    = process.env.ALCHEMY_API_KEY!;
const alchemy_Network: string   = process.env.ALCHEMY_NETWORK!;

const mySql_Host: string        = process.env.MYSQL_HOST!;
const mySql_User: string        = process.env.MYSQL_USER!;
const mySql_Password: string    = process.env.MYSQL_PASSWORD!;
const mySql_Database: string    = process.env.MYSQL_DATABASE!;

// Prepare Objects
const alchemyApi                = new AlchemyApi(alchemy_ApiKey, alchemy_Network);
const mySqlApi                  = new MySqlApi(mySql_Host, mySql_User, mySql_Password, mySql_Database);

const nftModel                  = new NftModel(alchemyApi, mySqlApi);
const nftController             = new NftController(nftModel);
const nftRouter                 = new NftRouter(nftController);
const userModel                 = new UserModel(alchemyApi, mySqlApi);
const userController            = new UserController(userModel);
const userRouter                = new UserRouter(userController);

const app                       = new App(app_CorsOrigin, nftRouter, userRouter);
const server                    = http.createServer(app.getApp());

// Server
function startServer(): void {
    // TODO Initializations

    server.listen(port, () => {
        console.log(`Listening on port ${port}...`);
    });
}


//==================================================================================================
// Init
//==================================================================================================
startServer();

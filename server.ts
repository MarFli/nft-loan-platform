//==================================================================================================
// Imports
//==================================================================================================
// Standard Library
import http from "http";

// Third Party
import { Express } from "express";
import * as dotenv from "dotenv";

// Application
import { AlchemyApi } from "./src/services/alchemy.api";
import { LendingApi } from "./src/services/lending.api";
import { MySqlApi } from "./src/services/mySql.api";

import { LoanModel } from "./src/models/loan.mod";
import { LoanController } from "./src/controllers/loan.con";
import { LoanRouter } from "./src/routes/loan.rou";
import { NftModel } from "./src/models/nft.mod";
import { NftController } from "./src/controllers/nft.con";
import { NftRouter } from "./src/routes/nft.rou";
import { UserModel } from "./src/models/user.mod";
import { UserController } from "./src/controllers/user.con";
import { UserRouter } from "./src/routes/user.rou";

import { App } from "./src/app";


//==================================================================================================
// Intrerface
//==================================================================================================
interface IServer {
    startServer(): void;
    stopServer(): void;
    getApp(): Express;
}


//==================================================================================================
// Class
//==================================================================================================
class Server implements IServer {
    //--------------------------
    // Propeties
    //--------------------------
    protected dotEnv: dotenv.DotenvConfigOutput     = dotenv.config();

    protected port: number                          = parseInt(process.env.PORT!);
    protected app_CorsOrigin: string                = process.env.APP_CORS_ORIGIN!;

    protected alchemy_ApiKey: string                = process.env.ALCHEMY_API_KEY!;
    protected alchemy_Network: string               = process.env.ALCHEMY_NETWORK!;

    protected lending_apiUrl: string                = process.env.LENDING_API_URL!;

    protected mySql_Host: string                    = process.env.MYSQL_HOST!;
    protected mySql_User: string                    = process.env.MYSQL_USER!;
    protected mySql_Password: string                = process.env.MYSQL_PASSWORD!;
    protected mySql_Database: string                = process.env.MYSQL_DATABASE!;

    protected alchemyApi: AlchemyApi                = new AlchemyApi(this.alchemy_ApiKey, this.alchemy_Network);
    protected lendingApi : LendingApi               = new LendingApi(this.lending_apiUrl);
    protected mySqlApi: MySqlApi                    = new MySqlApi(this.mySql_Host, this.mySql_User, this.mySql_Password, this.mySql_Database);

    protected loanModel: LoanModel                  = new LoanModel(this.lendingApi, this.mySqlApi);
    protected loanController: LoanController        = new LoanController(this.loanModel);
    protected loanRouter: LoanRouter                = new LoanRouter(this.loanController);
    protected nftModel: NftModel                    = new NftModel(this.alchemyApi, this.mySqlApi);
    protected nftController: NftController          = new NftController(this.nftModel);
    protected nftRouter: NftRouter                  = new NftRouter(this.nftController);
    protected userModel: UserModel                  = new UserModel(this.alchemyApi, this.mySqlApi);
    protected userController: UserController        = new UserController(this.userModel);
    protected userRouter: UserRouter                = new UserRouter(this.userController);

    protected app: App                              = new App(this.app_CorsOrigin, this.loanRouter, this.nftRouter, this.userRouter);
    protected server: http.Server                   = http.createServer(this.app.getApp());


    //--------------------------
    // Ctor
    //--------------------------
    constructor() {}


    //--------------------------
    // Private Functions
    //--------------------------


    //--------------------------
    // Public Functions
    //--------------------------
    public startServer(): void {
        this.server.listen(this.port, () => {
            console.log(`Listening on port ${this.port}...`);
        });
    }

    public stopServer(): void {
        this.server.close();
    }

    public getApp(): Express {
        return this.app.getApp();
    }
}


//==================================================================================================
// Init
//==================================================================================================
const server: Server = new Server();

server.startServer();


//==================================================================================================
// Exports
//==================================================================================================
export default server;

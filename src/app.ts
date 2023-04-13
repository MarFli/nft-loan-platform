//==================================================================================================
// Imports
//==================================================================================================
// Standard Library

// Third Party
import express, { Express, Request, Response } from "express";
import cors from "cors";

// Application
import { NftRouter } from "./routes/nft.rou";
import { UserRouter } from "./routes/user.rou";


//==================================================================================================
// Class
//==================================================================================================
class App {
    //--------------------------
    // Propeties
    //--------------------------
    protected corsOrigin: string;
    protected nftRouter: NftRouter;
    protected userRouter: UserRouter;
    protected app: Express;


    //--------------------------
    // Ctor
    //--------------------------
    constructor(corsOrigin: string, nftRouter: NftRouter, userRouter: UserRouter) {
        this.corsOrigin = corsOrigin;
        this.nftRouter = nftRouter;
        this.userRouter = userRouter;
        this.app = express();

        this._configApp();
    }


    //--------------------------
    // Private Functions
    //--------------------------
    private _configApp(): void {
        // Middleware
        this.app.use(cors({ origin: this.corsOrigin }));     // MF: https://www.npmjs.com/package/cors
        this.app.use(express.json());

        // Endpoints
        this.app.use("/user", this.userRouter.getRouter());
        this.app.use("/nft", this.nftRouter.getRouter());
        // TODO Here comes other routes
        this.app.get("/*", (req: Request, res: Response) => {
            res.status(200).send("Home")
        });
    }

    //--------------------------
    // Public Functions
    //--------------------------
    public getApp(): Express {
        return this.app;
    }
}


//==================================================================================================
// Exports
//==================================================================================================
export { App };

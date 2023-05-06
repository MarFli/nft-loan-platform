//==================================================================================================
// Imports
//==================================================================================================
// Standard Library

// Third Party
import express, { Express, Request, Response } from "express";
import cors from "cors";

// Application
import { LoanRouter } from "./routes/loan.rou";
import { NftRouter } from "./routes/nft.rou";
import { UserRouter } from "./routes/user.rou";


//==================================================================================================
// Intrerface
//==================================================================================================
interface IApp {
    getApp(): Express;
}


//==================================================================================================
// Class
//==================================================================================================
class App implements IApp {
    //--------------------------
    // Propeties
    //--------------------------
    protected corsOrigin: string;
    protected loanRouter: LoanRouter;
    protected nftRouter: NftRouter;
    protected userRouter: UserRouter;
    protected app: Express;


    //--------------------------
    // Ctor
    //--------------------------
    constructor(corsOrigin: string, loanRouter: LoanRouter, nftRouter: NftRouter, userRouter: UserRouter) {
        this.corsOrigin = corsOrigin;
        this.loanRouter = loanRouter;
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
        this.app.use("/loan", this.loanRouter.getRouter());
        this.app.use("/nft", this.nftRouter.getRouter());
        this.app.use("/user", this.userRouter.getRouter());
        // TODO Here comes other routes
        this.app.get("/*", (req: Request, res: Response) => {
            res.status(200).send("Hello CircleCI Updated");
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

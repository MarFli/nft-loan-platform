//==================================================================================================
// Imports
//==================================================================================================
// Standard Library

// Third Party
import { Router, Request, Response } from "express";

// Application
import { NftController } from "../controllers/nft.con";


//==================================================================================================
// Intrerface
//==================================================================================================
interface INftRouter {
    getRouter(): Router;
}


//==================================================================================================
// Class
//==================================================================================================
class NftRouter implements INftRouter {
    //--------------------------
    // Propeties
    //--------------------------
    protected nftController: NftController;
    protected usersRouter: Router;


    //--------------------------
    // Ctor
    //--------------------------
    constructor(userController: NftController) {
        this.nftController = userController;
        this.usersRouter = Router();

        this._configRoutes();
    }


    //--------------------------
    // Private Functions
    //--------------------------
    private _configRoutes(): void {
        this.usersRouter.get("/", (req: Request, res: Response) => {
            this.nftController.httpGetNftAll(req, res);
        });
        this.usersRouter.get("/:nftId", (req: Request, res: Response) => {
            this.nftController.httpGetNft(req, res);
        });
        this.usersRouter.get("/userAddr/:userAddr", (req: Request, res: Response) => {
            this.nftController.httpgetNftForAddrAll(req, res);
        });
    }

    //--------------------------
    // Public Functions
    //--------------------------
    public getRouter(): Router {
        return this.usersRouter;
    }
}


//==================================================================================================
// Exports
//==================================================================================================
export {
    NftRouter
};

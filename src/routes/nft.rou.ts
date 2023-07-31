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
    protected nftRouter: Router;


    //--------------------------
    // Ctor
    //--------------------------
    constructor(nftController: NftController) {
        this.nftController = nftController;
        this.nftRouter = Router();

        this._configRoutes();
    }


    //--------------------------
    // Private Functions
    //--------------------------
    private _configRoutes(): void {
        this.nftRouter.get("/", (req: Request, res: Response) => {
            this.nftController.httpGetNftAll(req, res);
        });
        this.nftRouter.get("/:nftId", (req: Request, res: Response) => {
            this.nftController.httpGetNft(req, res);
        });
        this.nftRouter.get("/userAddr/:userAddr", (req: Request, res: Response) => {
            this.nftController.httpgetNftForAddrAll(req, res);
        });
    }

    //--------------------------
    // Public Functions
    //--------------------------
    public getRouter(): Router {
        return this.nftRouter;
    }
}


//==================================================================================================
// Exports
//==================================================================================================
export {
    NftRouter
};

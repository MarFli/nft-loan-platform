//==================================================================================================
// Imports
//==================================================================================================
// Standard Library

// Third Party
import { Router, Request, Response } from "express";

// Application
import { LoanController } from "../controllers/loan.con";


//==================================================================================================
// Intrerface
//==================================================================================================
interface ILoanRouter {
    getRouter(): Router;
}


//==================================================================================================
// Class
//==================================================================================================
class LoanRouter implements ILoanRouter {
    //--------------------------
    // Propeties
    //--------------------------
    protected loanController: LoanController;
    protected loanRouter: Router;


    //--------------------------
    // Ctor
    //--------------------------
    constructor(loanController: LoanController) {
        this.loanController = loanController;
        this.loanRouter = Router();

        this._configRoutes();
    }


    //--------------------------
    // Private Functions
    //--------------------------
    private _configRoutes(): void {
        this.loanRouter.get("/", async (req: Request, res: Response) => {
            this.loanController.httpGetLoanAll(req, res);
        });
    }

    //--------------------------
    // Public Functions
    //--------------------------
    public getRouter(): Router {
        return this.loanRouter;
    }
}


//==================================================================================================
// Exports
//==================================================================================================
export { LoanRouter };

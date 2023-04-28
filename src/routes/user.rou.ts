//==================================================================================================
// Imports
//==================================================================================================
// Standard Library

// Third Party
import { Router, Request, Response } from "express";

// Application
import { UserController } from "../controllers/user.con";


//==================================================================================================
// Intrerface
//==================================================================================================
interface IUserRouter {
    getRouter(): Router;
}


//==================================================================================================
// Class
//==================================================================================================
class UserRouter implements IUserRouter {
    //--------------------------
    // Propeties
    //--------------------------
    protected userController: UserController;
    protected usersRouter: Router;


    //--------------------------
    // Ctor
    //--------------------------
    constructor(userController: UserController) {
        this.userController = userController;
        this.usersRouter = Router();

        this._configRoutes();
    }


    //--------------------------
    // Private Functions
    //--------------------------
    private _configRoutes(): void {
        this.usersRouter.get("/", async (req: Request, res: Response) => {
            this.userController.httpGetUserAll(req, res);
        });
        this.usersRouter.get("/:userId", async (req: Request, res: Response) => {
            this.userController.httpGetUser(req, res);
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
export { UserRouter };

//==================================================================================================
// Imports
//==================================================================================================
// Standard Library

// Third Party
import { Request, Response } from "express";

// Application
import { JsonFormatStatus, type JsonFormat, getResponse } from "../../lib/libRoot";

import { UserModel } from "../models/user.mod";
import { User_Functions } from "../types/user.types";


//==================================================================================================
// Intrerface
//==================================================================================================
interface IUserController {
    httpGetUserAll(req: Request, res: Response): Promise<void>;
    httpGetUser(req: Request, res: Response): Promise<void>;
}


//==================================================================================================
// Class
//==================================================================================================
class UserController implements IUserController {
    //--------------------------
    // Propeties
    //--------------------------
    protected userModel: UserModel;


    //--------------------------
    // Ctor
    //--------------------------
    constructor(userModel: UserModel) {
        this.userModel = userModel;
    }


    //--------------------------
    // Private Functions
    //--------------------------
    private async _requestHandler(req: Request, res: Response, func: User_Functions): Promise<void> {
        let response: JsonFormat = getResponse(JsonFormatStatus.ERROR, "", []);

        try {
            if (func === User_Functions.GetUserAll){
                const users = await this.userModel.getUserAll();

                response = getResponse(JsonFormatStatus.SUCCESS, "", users);
            } else if (func === User_Functions.GetUser) {
                const userId = Number(req.params.userId);
                const user = await this.userModel.getUser(userId)

                response = getResponse(JsonFormatStatus.SUCCESS, "", user);
            }

            res.status(200).json(response);
        } catch (err: any) {
            response = getResponse(JsonFormatStatus.ERROR, String(err.message), []);

            res.status(500).json(response);
        }
    }

    //--------------------------
    // Public Functions
    //--------------------------
    public async httpGetUserAll(req: Request, res: Response): Promise<void> {
        this._requestHandler(req, res, User_Functions.GetUserAll);
    }

    public async httpGetUser(req: Request, res: Response): Promise<void> {
        this._requestHandler(req, res, User_Functions.GetUser);
    }
}


//==================================================================================================
// Exports
//==================================================================================================
export {
    UserController
};

//==================================================================================================
// Imports
//==================================================================================================
// Standard Library

// Third Party
import { Request, Response } from "express";

// Application
import { JsonFormatStatus, JsonFormat, getResponse } from "../../lib/libRoot";

import { UserModel } from "../models/user.mod";


//==================================================================================================
// Functions
//==================================================================================================
class UserController {
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
    // Public Functions
    //--------------------------
    public async httpGetUserAll(req: Request, res: Response) {
        let response: JsonFormat;

        try {
            const users = await this.userModel.getUserAll();

            response = getResponse(JsonFormatStatus.SUCCESS, "", JSON.parse(users));

            return res.status(200).json(response);
        } catch (err: any) {
            response = getResponse(JsonFormatStatus.ERROR, String(err.message), []);

            return res.status(500).json(response);
        }
    }

    public async httpGetUser(req: Request, res: Response) {
        let response: JsonFormat;

        try {
            const userId = Number(req.params.userId);
            const user = await this.userModel.getUser(userId)

            response = getResponse(JsonFormatStatus.SUCCESS, "", JSON.parse(user));

            return res.status(200).json(response);
        } catch (err: any) {
            response = getResponse(JsonFormatStatus.ERROR, String(err.message), []);

            return res.status(500).json(response);
        }
    }
}


//==================================================================================================
// Exports
//==================================================================================================
export { UserController };

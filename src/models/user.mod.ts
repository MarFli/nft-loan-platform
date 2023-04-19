//==================================================================================================
// Imports
//==================================================================================================
// Standard Library

// Third Party

// Application
import { MySqlApi, MySqlApi_User } from "../services/mySql.api";
import { AlchemyApi } from "../services/alchemy.api";

import { User_Functions } from "../types/user.types";


//==================================================================================================
// Intrerface
//==================================================================================================
interface IUserModel {
    getUserAll(): Promise<MySqlApi_User[]>;
    getUser(userId: number): Promise<MySqlApi_User[]>;
}


//==================================================================================================
// Class
//==================================================================================================
class UserModel implements IUserModel{
    //--------------------------
    // Propeties
    //--------------------------
    protected alchemyApi: AlchemyApi;
    protected mySqlApi: MySqlApi;


    //--------------------------
    // Ctor
    //--------------------------
    constructor(alchemyApi: AlchemyApi, mySqlApi: MySqlApi) {
        this.alchemyApi = alchemyApi;
        this.mySqlApi = mySqlApi;
    }


    //--------------------------
    // Private Functions
    //--------------------------
    private async _requestHandler(func: User_Functions, userId: number = 0): Promise<MySqlApi_User[]> {
        let funcResponse: MySqlApi_User[] = [];

        try {
            if (func === User_Functions.GetUserAll){
                funcResponse = await this.mySqlApi.mySqlApi_readUserAll();
            } else if (func === User_Functions.GetUser) {
                funcResponse = await this.mySqlApi.mySqlApi_readUser(userId);
            }

            return funcResponse;
        } catch (err: any) {
            throw err;
        }
    }

    //--------------------------
    // Public Functions
    //--------------------------
    public async getUserAll(): Promise<MySqlApi_User[]> {
        return this._requestHandler(User_Functions.GetUserAll);
    }

    public async getUser(userId: number): Promise<MySqlApi_User[]> {
        return this._requestHandler(User_Functions.GetUser, userId)
    }
}


//==================================================================================================
// Exports
//==================================================================================================
export { UserModel };

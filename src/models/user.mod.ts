//==================================================================================================
// Imports
//==================================================================================================
// Standard Library

// Third Party

// Application
import { MySqlApi, MySqlApi_User } from "../services/mySql.api";
import { AlchemyApi } from "../services/alchemy.api";


//==================================================================================================
// Types
//==================================================================================================
const enum UserModel_Functions {
    getUserAll = 1,
    getUser = 2
}


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
    private async _requestHandler(func: UserModel_Functions, userId: number = 0): Promise<MySqlApi_User[]> {
        let funcResponse: MySqlApi_User[] = [];

        try {
            if (func === UserModel_Functions.getUserAll){
                funcResponse = await this.mySqlApi.mySqlApi_readUserAll();
                // const x = await this.mySqlApi.mySqlApi_readUserAll();
                // console.log(x);
            } else if (func === UserModel_Functions.getUser) {
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
        return this._requestHandler(UserModel_Functions.getUserAll);
    }

    public async getUser(userId: number): Promise<MySqlApi_User[]> {
        return this._requestHandler(UserModel_Functions.getUser, userId)
    }
}


//==================================================================================================
// Exports
//==================================================================================================
export { UserModel };

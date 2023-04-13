//==================================================================================================
// Imports
//==================================================================================================
// Standard Library

// Third Party

// Application
import { MySqlApi } from "../services/mySql.api";
import { AlchemyApi } from "../services/alchemy.api";


//==================================================================================================
// Types
//==================================================================================================
enum UserModel_Functions {
    getUserAll = 1,
    getUser = 2
}


//==================================================================================================
// Class
//==================================================================================================
class UserModel {
    //--------------------------
    // Propeties
    //--------------------------
    protected alchemyApi: AlchemyApi;
    protected mySqlApi: MySqlApi;


    //--------------------------
    // Ctor
    //--------------------------
    constructor(
        alchemyApi: AlchemyApi,
        mySqlApi: MySqlApi
    ) {
        this.alchemyApi = alchemyApi;
        this.mySqlApi = mySqlApi;
    }


    //--------------------------
    // Private Functions
    //--------------------------
    private async _requestHandler(func: UserModel_Functions, userId: number = 0): Promise<string> {
        let funcResponse: string = "";

        try {
            if (func === UserModel_Functions.getUserAll){
                funcResponse = await this.mySqlApi.mySqlApi_readUserAll()
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
    public async getUserAll(): Promise<string> {
        return this._requestHandler(UserModel_Functions.getUserAll);
    }

    public async getUser(userId: number): Promise<string> {
        return this._requestHandler(UserModel_Functions.getUser, userId)
    }
}


//==================================================================================================
// Exports
//==================================================================================================
export { UserModel };

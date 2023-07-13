//==================================================================================================
// Imports
//==================================================================================================
// Standard Library

// Third Party

// Application
import { Loan_Functions, Loan_PostBody } from "../types/loan.types";

import { LendingApi, LendingApi_Loan } from "../services/lending.api";
import { MySqlApi } from "../services/mySql.api";


//==================================================================================================
// Intrerface
//==================================================================================================
interface ILoanModel {
    getLoan(body: Loan_PostBody): Promise<LendingApi_Loan[]>
}


//==================================================================================================
// Class
//==================================================================================================
class LoanModel implements ILoanModel{
    //--------------------------
    // Propeties
    //--------------------------
    protected lendzApi: LendingApi;
    protected mySqlApi: MySqlApi;


    //--------------------------
    // Ctor
    //--------------------------
    constructor(lendzApi: LendingApi, mySqlApi: MySqlApi) {
        this.lendzApi = lendzApi;
        this.mySqlApi = mySqlApi;
    }


    //--------------------------
    // Private Functions
    //--------------------------
    private async _requestHandler(func: Loan_Functions, data: object = {}): Promise<LendingApi_Loan[]> {
        let funcResponse: LendingApi_Loan[] = [];

        try {
            if (func === Loan_Functions.GetLoan){
                funcResponse = await this.lendzApi.getLoan(data as Loan_PostBody);
            }

            return funcResponse;
        } catch (err: any) {
            throw err;
        }
    }

    //--------------------------
    // Public Functions
    //--------------------------
    public async getLoan(data: Loan_PostBody): Promise<LendingApi_Loan[]> {
        return this._requestHandler(Loan_Functions.GetLoan, data);
    }
}


//==================================================================================================
// Exports
//==================================================================================================
export {
    LoanModel
};

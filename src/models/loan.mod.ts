//==================================================================================================
// Imports
//==================================================================================================
// Standard Library

// Third Party

// Application
import { LendzApi, LendzApi_Loan } from "../services/lendz.api";
import { MySqlApi } from "../services/mySql.api";

import { Loan_Functions } from "../types/loan.types";


//==================================================================================================
// Intrerface
//==================================================================================================
interface ILoanModel {
    getLoanAll(): Promise<LendzApi_Loan[]>;
}


//==================================================================================================
// Class
//==================================================================================================
class LoanModel implements ILoanModel{
    //--------------------------
    // Propeties
    //--------------------------
    protected lendzApi: LendzApi;
    protected mySqlApi: MySqlApi;


    //--------------------------
    // Ctor
    //--------------------------
    constructor(lendzApi: LendzApi, mySqlApi: MySqlApi) {
        this.lendzApi = lendzApi;
        this.mySqlApi = mySqlApi;
    }


    //--------------------------
    // Private Functions
    //--------------------------
    private async _requestHandler(func: Loan_Functions, userId: number = 0): Promise<LendzApi_Loan[]> {
        let funcResponse: LendzApi_Loan[] = [];

        try {
            if (func === Loan_Functions.GetLoanAll){
                funcResponse = await this.lendzApi.getLoan();
            }

            return funcResponse;
        } catch (err: any) {
            throw err;
        }
    }

    //--------------------------
    // Public Functions
    //--------------------------
    public async getLoanAll(): Promise<LendzApi_Loan[]> {
        return this._requestHandler(Loan_Functions.GetLoanAll);
    }
}


//==================================================================================================
// Exports
//==================================================================================================
export { LoanModel };

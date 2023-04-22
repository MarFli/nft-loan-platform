//==================================================================================================
// Imports
//==================================================================================================
// Standard Library

// Third Party

// Application
import { Loan_Functions, Loan_PostBody } from "../types/loan.types";

import { LendzApi, LendzApi_Loan } from "../services/lendz.api";
import { MySqlApi } from "../services/mySql.api";


//==================================================================================================
// Intrerface
//==================================================================================================
interface ILoanModel {
    getLoan(body: Loan_PostBody): Promise<LendzApi_Loan[]>
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
    // private async _requestHandler(func: Loan_Functions, body: Loan_PostBody = { currency: [], collection: [], amount: 0, duration: [], apr: [] }): Promise<LendzApi_Loan[]> {
    private async _requestHandler(func: Loan_Functions, data: object = {}): Promise<LendzApi_Loan[]> {
        let funcResponse: LendzApi_Loan[] = [];

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
    public async getLoan(data: Loan_PostBody): Promise<LendzApi_Loan[]> {
        return this._requestHandler(Loan_Functions.GetLoan, data);
    }
}


//==================================================================================================
// Exports
//==================================================================================================
export { LoanModel };

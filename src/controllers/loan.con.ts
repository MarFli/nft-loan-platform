//==================================================================================================
// Imports
//==================================================================================================
// Standard Library

// Third Party
import { Request, Response } from "express";

// Application
import { LoanModel } from "../models/loan.mod";
import { Loan_Functions } from "../types/loan.types";

import { JsonFormatStatus, type JsonFormat, getResponse } from "../../lib/libRoot";


//==================================================================================================
// Intrerface
//==================================================================================================
interface ILoanController {
    httpGetLoan(req: Request, res: Response): Promise<void>;
}


//==================================================================================================
// Class
//==================================================================================================
class LoanController implements ILoanController {
    //--------------------------
    // Propeties
    //--------------------------
    protected loanModel: LoanModel;


    //--------------------------
    // Ctor
    //--------------------------
    constructor(loanModel: LoanModel) {
        this.loanModel = loanModel;
    }


    //--------------------------
    // Private Functions
    //--------------------------
    private async _requestHandler(req: Request, res: Response, func: Loan_Functions): Promise<void> {
        let response: JsonFormat = getResponse(JsonFormatStatus.ERROR, "", []);

        try {
            if (func === Loan_Functions.GetLoan){
                const loans = await this.loanModel.getLoan(req.body);

                response = getResponse(JsonFormatStatus.SUCCESS, "", loans);
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
    public async httpGetLoan(req: Request, res: Response): Promise<void> {
        this._requestHandler(req, res, Loan_Functions.GetLoan);
    }
}


//==================================================================================================
// Exports
//==================================================================================================
export { LoanController };

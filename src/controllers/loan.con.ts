//==================================================================================================
// Imports
//==================================================================================================
// Standard Library

// Third Party
import { Request, Response } from "express";

// Application
import { JsonFormatStatus, type JsonFormat, getResponse } from "../../lib/libRoot";

import { LoanModel } from "../models/loan.mod";
import { Loan_Functions } from "../types/loan.types";


//==================================================================================================
// Intrerface
//==================================================================================================
interface ILoanController {
    httpGetLoanAll(req: Request, res: Response): Promise<void>;
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
            if (func === Loan_Functions.GetLoanAll){
                const loans = await this.loanModel.getLoanAll();

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
    public async httpGetLoanAll(req: Request, res: Response): Promise<void> {
        this._requestHandler(req, res, Loan_Functions.GetLoanAll);
    }
}


//==================================================================================================
// Exports
//==================================================================================================
export { LoanController };

//==================================================================================================
// Imports
//==================================================================================================
// Standard Library

// Third Party
import axios from "axios";

// Application
import { Loan_Platform, Loan_Collections, Loan_PostBody } from "../types/loan.types";


//==================================================================================================
// Types
//==================================================================================================
interface LendzApi_Loan {
    id: string;
    nft: {
        id: string;
        collectionAddr: string;
        collectionName: string;
        collectionImgSrc: string;
    };
    loanTerms: {
        amount: number;
        repayment: number;
        duration: number;
        expiryDate: number;
        currency: string;
        interestRate: number;
        apr: number;
        sufficientBalance: boolean;
    };
    platform: {
        name: string;
        url: string;
        host: string;
    };
}


//==================================================================================================
// Intrerface
//==================================================================================================
interface ILendzApi {
    getLoan(data: Loan_PostBody): Promise<LendzApi_Loan[]>;
}


//==================================================================================================
// Class
//==================================================================================================
class LendzApi implements ILendzApi {
    //--------------------------
    // Propeties
    //--------------------------


    //--------------------------
    // Ctor
    //--------------------------
    constructor() {}


    //--------------------------
    // Private Functions
    //--------------------------
    private _getLoanFiltered(loans: LendzApi_Loan[], platform: Loan_Platform[]): LendzApi_Loan[] {
        let filteredLoans: LendzApi_Loan[] = []

        for (const pf of platform) {
            // Return if all loans
            if (pf === Loan_Platform.ALL) {
                return loans;
            }

            // Filter
            for (let i = 0; i < loans.length; i++) {
                if (loans[i].platform.name.toLowerCase() === pf) {
                    filteredLoans.push(loans[i]);
                }
            }
        }

        return filteredLoans;
    }

    private _getRequestUrl(data: Loan_PostBody): string {
        let collection: string[] = [];

        // Replace collection name with collection address in case name is used
        for (let i = 0; i < data.collection.length; i++) {
            const dummy: string = data.collection[i].replaceAll(" ", "").toLowerCase();

            if (dummy in Loan_Collections) {
                collection.push(Loan_Collections[dummy as keyof typeof Loan_Collections]);
            }
        }

        const url: string = `https://lendz.loan/api/borrower/v2/offers/list?options={
            "currency":${JSON.stringify(data.currency)},
            "collection":${JSON.stringify(collection)},
            "amount":${JSON.stringify(data.amount)},
            "duration":${JSON.stringify(data.duration)},
            "apr":${JSON.stringify(data.apr)}
        }`;

        return url;
    }

    //--------------------------
    // Public Functions
    //--------------------------
    public async getLoan(data: Loan_PostBody): Promise<LendzApi_Loan[]> {
        const url: string = this._getRequestUrl(data);

        try {
            const response = await axios.get<LendzApi_Loan[]>(url.toLowerCase());

            const loans: LendzApi_Loan[] = this._getLoanFiltered(response.data, data.platform);

            return loans;
        } catch (err: any) {
            throw err;
        }
    }
}


//==================================================================================================
// Exports
//==================================================================================================
export { LendzApi, LendzApi_Loan };

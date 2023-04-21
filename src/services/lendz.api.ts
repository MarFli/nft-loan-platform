//==================================================================================================
// Imports
//==================================================================================================
// Standard Library

// Third Party
import axios from "axios";

// Application


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
    getLoan(): Promise<LendzApi_Loan[]>;
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


    //--------------------------
    // Public Functions
    //--------------------------
    public async getLoan(): Promise<LendzApi_Loan[]> {
        try {
            const response = await axios.get<LendzApi_Loan[]>(`https://lendz.loan/api/borrower/v2/offers/list?options={
                "collection":["0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"],
                "duration":[1,90],
                "apr":[0,500]
            }`);

            return response.data;
        } catch (err: any) {
            throw err;
        }
    }
}


//==================================================================================================
// Exports
//==================================================================================================
export { LendzApi, LendzApi_Loan };

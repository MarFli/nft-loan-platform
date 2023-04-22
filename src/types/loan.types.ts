//==================================================================================================
// Types
//==================================================================================================
const enum Loan_Functions {
    GetLoanAll = 1,
    GetLoan = 2
}

const enum Loan_Platform {
    ALL = "all",
    X2Y2 = "x2y2",
    BENDDAO = "benddao",
    NFTFI = "nftfi",
    ARCADE = "arcade",
    ZHARTA = "zharta",
    PARASPACE = "paraspace"
}

interface Loan_PostBody {
    currency: string[];
    collection: string[];
    amount: number;
    duration: number[];
    apr: number[];
    platform: Loan_Platform[];
}


//==================================================================================================
// Objects
//==================================================================================================
const Loan_Collections = {
    boredapeyachtclub: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
    mutantapeyachtclub: "0x60E4d786628Fea6478F785A6d7e704777c86a7c6",
    // TODO
}


//==================================================================================================
// Exports
//==================================================================================================
export { Loan_Functions, Loan_Platform, Loan_PostBody, Loan_Collections };

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
    sortedByOffer: boolean;
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
    azuki: "0xED5AF388653567Af2F388E6224dC7C4b3241C544",
    boredapeyachtclub: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
    mutantapeyachtclub: "0x60E4d786628Fea6478F785A6d7e704777c86a7c6",
    moonbirds: "0x23581767a106ae21c074b2276D25e5C3e136a68b",
    meebits: "0x7Bd29408f11D2bFC23c34f18275bBf23bB716Bc7"
    // TODO
}


//==================================================================================================
// Exports
//==================================================================================================
export { Loan_Functions, Loan_Platform, Loan_PostBody, Loan_Collections };

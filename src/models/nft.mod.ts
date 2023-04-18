//==================================================================================================
// Imports
//==================================================================================================
// Standard Library

// Third Party

// Application
import { MySqlApi, MySqlApi_Nft } from "../services/mySql.api";
import { AlchemyApi, IGetNftsForOwner } from "../services/alchemy.api";


//==================================================================================================
// Intrerface
//==================================================================================================
interface INftModel {
    getNftAll(): Promise<MySqlApi_Nft[]>;
    getNft(userAddr: string): Promise<IGetNftsForOwner>;
}


//==================================================================================================
// Class
//==================================================================================================
class NftModel implements INftModel {
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
    // Public Functions
    //--------------------------
    public async getNftAll(): Promise<MySqlApi_Nft[]> {
        let funcResponse: MySqlApi_Nft[] = [];

        try {
            funcResponse = await this.mySqlApi.mySqlApi_readNftAll()

            return funcResponse;
        } catch (err: any) {
            throw err;
        }
    }

    public async getNft(userAddr: string): Promise<IGetNftsForOwner> {
        // Predpostavljamo da je user valid, kr se ne more majster vpisat na platformo z nevalid addresso
        const nftData = await this.alchemyApi.alchemyApi_getNftsForOwner(userAddr);
        const userData = await this.mySqlApi.mySqlApi_isUserInDatabase(userAddr);

        if (userData.isUserInDatabase === false) {
            const createUserId = await this.mySqlApi.mySqlApi_createUser(userAddr, nftData.numOfNfts);
            userData.id = createUserId;
        }

        for (let i = 0; i < nftData.numOfNfts; i++) {
            // Check if NFT is in data base
            const isNftInDatabase = await this.mySqlApi.mySqlApi_isNftInDatabase(
                nftData.nftAddrArr[i].nftAddr,
                nftData.nftAddrArr[i].tokenId
            );

            // Add NFT to DB if it doesn't exist
            if (!isNftInDatabase) {
                this.mySqlApi.mySqlApi_createNft(
                    nftData.nftAddrArr[i].nftAddr,
                    nftData.nftAddrArr[i].tokenId,
                    userData.id
                );
            }
        }
        // 1. poglej ce je v bazi
        // 2. ce ni ga dodaj
        // 3. ce je poglej ce je enak
        // 4. ce ni updejtaj

        //console.log(nftData);

        return nftData;
    }
}


//==================================================================================================
// Exports
//==================================================================================================
export { NftModel };

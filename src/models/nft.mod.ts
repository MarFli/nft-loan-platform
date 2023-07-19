//==================================================================================================
// Imports
//==================================================================================================
// Standard Library

// Third Party

// Application
import { MySqlApi, MySqlApi_UserCheck, MySqlApi_Nft } from "../services/mySql.api";
import { AlchemyApi, AlchemyApi_OwnerNfts } from "../services/alchemy.api";

import { Nft_Functions } from "../types/nft.types";


//==================================================================================================
// Intrerface
//==================================================================================================
interface INftModel {
    getNftAll(): Promise<MySqlApi_Nft[]>;
    getNft(nftId: number): Promise<MySqlApi_Nft[]>;

    getNftForAddrAll(userAddr: string): Promise<AlchemyApi_OwnerNfts>;
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
    // Private Functions
    //--------------------------
    private async _requestHandler(func: Nft_Functions, nftId: number = 0): Promise<MySqlApi_Nft[]> {
        let funcResponse: MySqlApi_Nft[] = [];

        try {
            if (func === Nft_Functions.GetNftAll){
                funcResponse = await this.mySqlApi.mySqlApi_readNftAll();
            } else if (func === Nft_Functions.GetNft) {
                funcResponse = await this.mySqlApi.mySqlApi_readNft(nftId);
            }

            return funcResponse;
        } catch (err: any) {
            throw err;
        }
    }

    //--------------------------
    // Public Functions
    //--------------------------
    public async getNftAll(): Promise<MySqlApi_Nft[]> {
        return this._requestHandler(Nft_Functions.GetNftAll);
    }

    public async getNft(nftId: number): Promise<MySqlApi_Nft[]> {
        return this._requestHandler(Nft_Functions.GetNft, nftId)
    }

    public async getNftForAddrAll(userAddr: string): Promise<AlchemyApi_OwnerNfts> {  // MF: TODO Algorithm doesn't work well (no updates of NFTs, users,...)
        // Predpostavljamo da je user valid, kr se ne more majster vpisat na platformo z nevalid addresso
        const nftData: AlchemyApi_OwnerNfts = await this.alchemyApi.alchemyApi_getNftsForOwner(userAddr);
        const userData: MySqlApi_UserCheck = await this.mySqlApi.mySqlApi_isUserInDatabase(userAddr);

        try {
            if (userData.isUserInDatabase === false) {
                const createUserId: number = await this.mySqlApi.mySqlApi_createUser(userAddr, nftData.numOfNfts);
                userData.id = createUserId;
            }

            for (let i = 0; i < nftData.numOfNfts; i++) {
                // Check if NFT is in data base
                const isNftInDatabase: boolean = await this.mySqlApi.mySqlApi_isNftInDatabase(
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
        } catch (err: any) {
            throw err;
        }
    }
}


//==================================================================================================
// Exports
//==================================================================================================
export {
    NftModel
};

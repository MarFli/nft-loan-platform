//==================================================================================================
// Imports
//==================================================================================================
// Standard Library

// Third Party
import { Alchemy, OwnedNftsResponse, AlchemySettings, Network } from "alchemy-sdk";

// Application


//==================================================================================================
// Types
//==================================================================================================
interface AlchemyApi_Nft {
    nftAddr: string;
    tokenId: string;
}

interface AlchemyApi_OwnerNfts {
    nftAddrArr: AlchemyApi_Nft[];
    numOfNfts: number;
}


//==================================================================================================
// Intrerface
//==================================================================================================
interface IAlchemyApi {
    alchemyApi_getNftsForOwner(nftAddr: string): Promise<AlchemyApi_OwnerNfts>;
}


//==================================================================================================
// Class
//==================================================================================================
class AlchemyApi implements IAlchemyApi {
    //--------------------------
    // Propeties
    //--------------------------
    protected apiKey: string;
    protected network: string;
    protected settings: AlchemySettings;
    protected alchemyObj;


    //--------------------------
    // Ctor
    //--------------------------
    constructor(apiKey: string, network: string) {
        this.apiKey = apiKey;
        this.network = network;
        this.settings = {
            apiKey: this.apiKey,
            network: this.network as Network
        }
        this.alchemyObj = new Alchemy(this.settings);
    }


    //--------------------------
    // Private Functions
    //--------------------------


    //--------------------------
    // Public Functions
    //--------------------------
    public async alchemyApi_getNftsForOwner(nftAddr: string): Promise<AlchemyApi_OwnerNfts> {
        const response: OwnedNftsResponse = await this.alchemyObj.nft.getNftsForOwner(nftAddr);

        const numOfNfts: number = Number(response["totalCount"]);
        let nftArr: AlchemyApi_Nft[] = [];

        for (let i = 0; i < numOfNfts; i++) {
            const dummy: AlchemyApi_Nft = {
                nftAddr: response["ownedNfts"][i]["contract"]["address"],
                tokenId: response["ownedNfts"][i]["tokenId"]
            };

            nftArr.push(dummy);
        }

        const data: AlchemyApi_OwnerNfts = {
            nftAddrArr: nftArr,
            numOfNfts: numOfNfts
        };

        return data;
    }
}


//==================================================================================================
// Exports
//==================================================================================================
export { AlchemyApi, AlchemyApi_OwnerNfts };

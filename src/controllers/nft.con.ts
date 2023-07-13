//==================================================================================================
// Imports
//==================================================================================================
// Standard Library

// Third Party
import { Request, Response } from "express";

// Application 
import { JsonFormatStatus, type JsonFormat, getResponse } from "../../lib/libRoot";

import { NftModel } from "../models/nft.mod";
import { Nft_Functions } from "../types/nft.types";


//==================================================================================================
// Intrerface
//==================================================================================================
interface INftController {
    httpGetNftAll(req: Request, res: Response): Promise<void>;
    httpGetNft(req: Request, res: Response): Promise<void>;
}


//==================================================================================================
// Class
//==================================================================================================
class NftController implements INftController {
    //--------------------------
    // Propeties
    //--------------------------
    protected nftModel: NftModel;


    //--------------------------
    // Ctor
    //--------------------------
    constructor(nftModel: NftModel) {
        this.nftModel = nftModel;
    }


    //--------------------------
    // Private Functions
    //--------------------------
    private async _requestHandler(req: Request, res: Response, func: Nft_Functions): Promise<void> {
        let response: JsonFormat = getResponse(JsonFormatStatus.ERROR, "", []);

        try {
            if (func === Nft_Functions.GetNftAll){
                const nfts = await this.nftModel.getNftAll();

                response = getResponse(JsonFormatStatus.SUCCESS, "", nfts);
            } else if (func === Nft_Functions.GetNft) {
                const userAddr = req.params.userAddr;
                const nft = await this.nftModel.getNft(userAddr)
    
                response = getResponse(JsonFormatStatus.SUCCESS, "", nft);
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
    public async httpGetNftAll(req: Request, res: Response): Promise<void> {
        this._requestHandler(req, res, Nft_Functions.GetNftAll);
    }

    public async httpGetNft(req: Request, res: Response): Promise<void> {
        this._requestHandler(req, res, Nft_Functions.GetNft);
    }

}


//==================================================================================================
// Exports
//==================================================================================================
export {
    NftController
};

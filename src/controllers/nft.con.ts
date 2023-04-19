//==================================================================================================
// Imports
//==================================================================================================
// Standard Library

// Third Party
import { Request, Response } from "express";

// Application 
import { JsonFormatStatus, type JsonFormat, getResponse } from "../../lib/libRoot";

import { NftModel } from "../models/nft.mod";


//==================================================================================================
// Intrerface
//==================================================================================================
interface INftController {
    httpGetNftAll(req: Request, res: Response): Promise<void>;
    httpGetNft(req: Request, res: Response): Promise<void>;
}


//==================================================================================================
// Functions
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
    // Public Functions
    //--------------------------
    public async httpGetNftAll(req: Request, res: Response): Promise<void> {
        let response: JsonFormat;

        try {
            const nfts = await this.nftModel.getNftAll();

            response = getResponse(JsonFormatStatus.SUCCESS, "", nfts);

            res.status(200).json(response);
        } catch (err: any) {
            response = getResponse(JsonFormatStatus.ERROR, String(err.message), []);

            res.status(500).json(response);
        }
    }

    public async httpGetNft(req: Request, res: Response): Promise<void> {
        let response: JsonFormat;

        try {
            const userAddr = req.params.userAddr;
            const nft = await this.nftModel.getNft(userAddr)

            response = getResponse(JsonFormatStatus.SUCCESS, "", nft);

            res.status(200).json(nft);
        } catch (err: any) {
            response = getResponse(JsonFormatStatus.ERROR, String(err.message), []);

            res.status(500).json(response);
        }
    }
}


//==================================================================================================
// Exports
//==================================================================================================
export { NftController };

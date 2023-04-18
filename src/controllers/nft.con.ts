//==================================================================================================
// Imports
//==================================================================================================
// Standard Library

// Third Party
import { Request, Response } from "express";

// Application 
import { JsonFormatStatus, JsonFormat, getResponse } from "../../lib/libRoot";

import { NftModel } from "../models/nft.mod";


//==================================================================================================
// Intrerface
//==================================================================================================
interface INftController {
    httpGetNftAll(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;   // MF: TODO Understand this return type
    httpGetNft(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
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
    public async httpGetNftAll(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        let response: JsonFormat;

        try {
            const nfts = await this.nftModel.getNftAll();

            response = getResponse(JsonFormatStatus.SUCCESS, "", JSON.parse(nfts));

            return res.status(200).json(response);
        } catch (err: any) {
            response = getResponse(JsonFormatStatus.ERROR, String(err.message), []);

            return res.status(500).json(response);
        }
    }

    public async httpGetNft(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {  // TODO
        const userAddr = req.params.userAddr;
        const nft = await this.nftModel.getNft(userAddr)

        return res.status(200).json(nft);
    }
}


//==================================================================================================
// Exports
//==================================================================================================
export { NftController };

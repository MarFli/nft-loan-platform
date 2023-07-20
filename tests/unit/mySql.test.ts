//==================================================================================================
// Imports
//==================================================================================================
// Standard Library

// Third Party
import { describe, expect, test } from "@jest/globals";
import * as dotenv from "dotenv";

// Application
import { MySqlApi, MySqlApi_User, MySqlApi_Nft } from "../../src/services/mySql.api";


//==================================================================================================
// Tests
//==================================================================================================
describe("Test - Unit - 'MySql Database'", () => {
    // Prepare Variables
    const dotEnv: dotenv.DotenvConfigOutput     = dotenv.config();
    const mySql_Host: string                    = process.env.MYSQL_HOST!;
    const mySql_User: string                    = process.env.MYSQL_USER!;
    const mySql_Password: string                = process.env.MYSQL_PASSWORD!;
    const mySql_Database: string                = process.env.MYSQL_DATABASE_TEST!;
    const mySqlApi: MySqlApi                    = new MySqlApi(mySql_Host, mySql_User, mySql_Password, mySql_Database);

    test("Check if DB connected", async () => {
        const result: boolean = await mySqlApi.mySqlApi_isConnected();

        expect(result).toBe(true);
    });

    test("Write and read 'User' data", async () => {
        const addr: string = "0xf90b32BC9108C49Ce236e0eE4ee6683fc89883e7";
        const numOfNfts: number = 3;
        const userId: number = await mySqlApi.mySqlApi_createUser(addr, numOfNfts);

        expect(userId).toBeGreaterThan(0);

        const user: MySqlApi_User[] = await mySqlApi.mySqlApi_readUser(userId);

        expect(user[0].id).toBe(userId);
        expect(user[0].address).toBe(addr);
        expect(user[0].num_nfts).toBe(numOfNfts);
    });

    test("Write and read 'Nft' data", async () => {
        const addr: string = "0x5660e206496808f7b5cdb8c56a696a96ae5e9b23";
        const tokenId: string = "12345";
        const ownerId: number = 1;
        const nftId: number = await mySqlApi.mySqlApi_createNft(addr, tokenId, ownerId);

        expect(nftId).toBeGreaterThan(0);

        const nft: MySqlApi_Nft[] = await mySqlApi.mySqlApi_readNft(nftId);

        expect(nft[0].id).toBe(nftId);
        expect(nft[0].address).toBe(addr);
        expect(nft[0].token_id).toBe(tokenId);
        expect(nft[0].owner_user_id).toBe(ownerId);
    });

    test("Insert wrong 'User' data and handle err", async () => {
        const wrongUserId: number = -4;
        let msg: string = "";

        try {
            const result: MySqlApi_User[] = await mySqlApi.mySqlApi_readUser(wrongUserId);
        } catch (err: any) {
            msg = err.message;
        }

        expect(msg).toBe(`User with an id '${wrongUserId}' doesn't exist`);
    });

    test("Insert wrong 'Nft' data and handle err", async () => {
        const wrongNftId: number = 3.4;
        let msg: string = "";

        try {
            const result: MySqlApi_Nft[] = await mySqlApi.mySqlApi_readNft(wrongNftId);
        } catch (err: any) {
            msg = err.message;
        }

        expect(msg).toBe(`Nft with an id '${wrongNftId}' doesn't exist`);
    });
});

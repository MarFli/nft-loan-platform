//==================================================================================================
// Imports
//==================================================================================================
// Standard Library

// Third Party
import { describe, expect, test } from "@jest/globals";
import request from "supertest";

// Application
import server from "../../server";


//==================================================================================================
// Tests
//==================================================================================================
describe("Test - Integration - 'nft' - GET", () => {
    afterEach(() => {
        server.stopServer();
    });

    test("Respond with 200", async () => {
        const response = await request(server.getApp())
            .get("/nft")
            .expect("Content-Type", /json/)
            .expect(200);

        expect(response.body.status).toBe(1);
    });

    test("Recieve the same ID as requested", async () => {
        const id: number = 2;

        const response = await request(server.getApp())
            .get(`/nft/${id}`)
            .expect("Content-Type", /json/)
            .expect(200);

        expect(response.body.status).toBe(1);
        expect(response.body.data[0].id).toBe(id);
    });

    test("Catch err while requesting single nft using nonexisting id", async () => {
        const id: number = 5.6;

        const responseErr = await request(server.getApp())
            .get(`/nft/${id}`)
            .expect("Content-Type", /json/)
            .expect(400);

        expect(responseErr.body.status).toBe(2);
        expect(responseErr.body.message).toBe(`Nft with an id '${id}' doesn't exist`);
    });

    test("Catch err while requesting nfts using nonexisting user address", async () => {
        const responseErr = await request(server.getApp())
            .get("/nft/userAddr/DUMMY")
            .expect("Content-Type", /json/)
            .expect(400);

        expect(responseErr.body.status).toBe(2);
        expect(responseErr.body.message).toBe("400: owner should be a valid address or ENS name");
    });
});

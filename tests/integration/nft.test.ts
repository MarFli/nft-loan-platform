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
});

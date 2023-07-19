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
describe("Test POST /loan", () => {
    afterEach(() => {
        server.stopServer();
    });

    test("Respond with 200", async () => {
        const response = await request(server.getApp())
            .post("/loan")
            .send({
                sortedByOffer:true,
                currency:[],
                collection:["boredapeyachtclub"],
                amount:0,
                duration:[1,120],
                apr:[0,500],
                platform:["all"]
            })
            .expect("Content-Type", /json/)
            .expect(200);

        expect(response.body.status).toBe(1);
        expect(response.body.data.length).toBeLessThanOrEqual(50);
    });
});

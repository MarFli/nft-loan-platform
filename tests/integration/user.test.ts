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
describe("Test - Integration - 'user' - GET", () => {
    afterEach(() => {
        server.stopServer();
    });

    test("Respond with 200", async () => {
        const response = await request(server.getApp())
            .get("/user")
            .expect("Content-Type", /json/)
            .expect(200);

        expect(response.body.status).toBe(1);
    });

    test("Recieve the same ID as requested", async () => {
        const id: number = 2;

        const response = await request(server.getApp())
            .get(`/user/${id}`)
            .expect("Content-Type", /json/)
            .expect(200);

        expect(response.body.status).toBe(1);
        expect(response.body.data[0].id).toBe(id);
    });

    test("Catch err while requesting data using nonexisting id", async () => {
        const id: number = 2;

        const response = await request(server.getApp())
            .get(`/user/`)
            .expect("Content-Type", /json/)
            .expect(200);

        const numOfUsers: number = response.body.data.length;

        const responseErr = await request(server.getApp())
            .get(`/user/${numOfUsers + 1}`)
            .expect("Content-Type", /json/)
            .expect(400);

        expect(responseErr.body.status).toBe(2);
    });
});

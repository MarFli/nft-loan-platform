//==================================================================================================
// Imports
//==================================================================================================
// Standard Library

// Third Party
import { describe, expect, test } from '@jest/globals';
import request from "supertest";

// Application
import server from '../../server';


//==================================================================================================
// Tests
//==================================================================================================
describe("Test GET /users", () => {
    test("Respond with 200", async () => {
        const response = await request(server.getApp())
            .get("/user")
            .expect('Content-Type', /json/)
            .expect(200);

        //expect(response.statusCode).toBe(200);
        server.stopServer();
    });
});

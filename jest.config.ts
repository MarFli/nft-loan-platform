//==================================================================================================
// Imports
//==================================================================================================
// Standard Library

// Third Party
import type { Config } from "jest"

// Application


//==================================================================================================
// Objects
//==================================================================================================
const config: Config = {
    preset: "ts-jest",
    verbose: true,
    testEnvironment: "node",
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: -10,
        },
    }
};


//==================================================================================================
// Exports
//==================================================================================================
export default config;
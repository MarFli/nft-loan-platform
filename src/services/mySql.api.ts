//==================================================================================================
// Imports
//==================================================================================================
// Standard Library

// Third Party
import mysql, { Pool, RowDataPacket, OkPacket } from "mysql2";

// Application


//==================================================================================================
// Intrerfaces
//==================================================================================================
interface IUsers extends RowDataPacket {
    id: number;
    address: string;
    num_nfts: number;
}

interface IUsersCheck extends RowDataPacket {
    id: number;
    address: string;
}

interface INftCheck extends RowDataPacket {
    address: string;
    token_id: string;
}

interface IsUserInDatabase {
    id: number;
    isUserInDatabase: boolean;
}

interface INfts extends RowDataPacket {
    id: number;
    address: string;
    token_id: string;
    owner_user_id: string;
    loan: boolean;
    expired: boolean;
}


//==================================================================================================
// Class
//==================================================================================================
class MySqlApi {
    //--------------------------
    // Propeties
    //--------------------------
    protected host: string;
    protected user: string;
    protected password: string;
    protected database: string;     // Might be string[] if we will have multiple databases
    protected pool: Pool


    //--------------------------
    // Ctor
    //--------------------------
    constructor(host: string, user: string,  password: string, database: string) {
        this.host = host;
        this.user = user;
        this.password = password;
        this.database = database;
        this.pool = mysql.createPool({
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database
        });
    }


    //--------------------------
    // Private Functions
    //--------------------------


    //--------------------------
    // Public Functions
    //--------------------------
    // "users" Table
    public mySqlApi_createUser(userAddr: string, num_nfts: number): Promise<number> {
        return new Promise((resolve, reject) => {
            this.pool.query<OkPacket>(
                `INSERT INTO users (address, num_nfts) VALUE(?, ?);`,
                [userAddr, num_nfts],
                (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results.insertId);
                    }
                }
            );
        });
    }

    public mySqlApi_readUserAll(): Promise<string> {    // Promise<IUsers[]>
        return new Promise((resolve, reject) => {
            this.pool.query<IUsers[]>(
                "SELECT * FROM users;",
                (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(JSON.stringify(results));
                    }
                }
            );
        });
    }

    public mySqlApi_readUser(userId: number): Promise<string> {   // Promise<IUsers[]>
        return new Promise((resolve, reject) => {
            this.pool.query<IUsers[]>(
                "SELECT * FROM users WHERE id = ?;",
                [userId],
                (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        if (results.length === 0) {
                            reject({message: `User with an id '${userId}' doesn't exist`})
                        } else {
                            resolve(JSON.stringify(results));
                        }
                    }
                }
            );
        });
    }

    public mySqlApi_isUserInDatabase(userAddr: string): Promise<IsUserInDatabase> {
        const data: IsUserInDatabase = {
            id: 0,
            isUserInDatabase: false
        };

        return new Promise((resolve, reject) => {
            this.pool.query<IUsersCheck[]>(
                `SELECT id, address FROM users WHERE address = ?;`,
                [userAddr],
                (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        if (results.length !== 0) {
                            if (results[0]["address"] === userAddr) {
                                data.id = Number(results[0]["id"]);
                                data.isUserInDatabase = true;
                            }
                        }
                        resolve(data);
                    }
                }
            );
        });
    }

    // "erc721_tokens" Table
    public mySqlApi_createNft(nftAddr: string, tokenId: string, userId: number): Promise<number> {
        return new Promise((resolve, reject) => {
            this.pool.query<OkPacket>(
                `INSERT INTO erc721_tokens (address, token_id, owner_user_id) VALUE(?, ?, ?);`,
                [nftAddr, tokenId, userId],
                (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results.insertId);
                    }
                }
            );
        });
    }

    public mySqlApi_readNftAll(): Promise<string> {    // Promise<INfts[]>
        return new Promise((resolve, reject) => {
            this.pool.query<INfts[]>(
                "SELECT * FROM erc721_tokens;",
                (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(JSON.stringify(results));
                    }
                }
            );
        });
    }

    public mySqlApi_isNftInDatabase(nftAddr: string, tokenId: string): Promise<boolean> {
        let isNftInDatabase: boolean = false

        return new Promise((resolve, reject) => {
            this.pool.query<INftCheck[]>(
                `SELECT address, token_id FROM erc721_tokens WHERE address = ?;`,
                [nftAddr, tokenId],
                (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        if (results.length !== 0) {
                            if ((results[0]["address"] === nftAddr) && (results[0]["token_id"] === tokenId)) {
                                isNftInDatabase = true;
                            }
                        }
                        resolve(isNftInDatabase);
                    }
                }
            );
        });
    }
}


//==================================================================================================
// Exports
//==================================================================================================
export { MySqlApi };

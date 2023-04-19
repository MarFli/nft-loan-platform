//==================================================================================================
// Imports
//==================================================================================================
// Standard Library

// Third Party
import mysql, { Pool, RowDataPacket, OkPacket } from "mysql2";

// Application


//==================================================================================================
// Types
//==================================================================================================
interface MySqlApi_User extends RowDataPacket {
    id: number;
    address: string;
    num_nfts: number;
}

interface MySqlApi_UserCheck extends RowDataPacket {
    id: number;
    address: string;
    isUserInDatabase: boolean;
}

interface MySqlApi_Nft extends RowDataPacket {
    id: number;
    address: string;
    token_id: string;
    owner_user_id: string;
    loan: boolean;
    expired: boolean;
}

interface MySqlApi_NftCheck extends RowDataPacket {
    address: string;
    token_id: string;
}


//==================================================================================================
// Intrerface
//==================================================================================================
interface IMySqlApi {
    // "users" Table
    mySqlApi_createUser(userAddr: string, num_nfts: number): Promise<number>;
    mySqlApi_readUserAll(): Promise<MySqlApi_User[]>;
    mySqlApi_readUser(userId: number): Promise<MySqlApi_User[]>;
    mySqlApi_isUserInDatabase(userAddr: string): Promise<MySqlApi_UserCheck>;

    // "erc721_tokens" Table
    mySqlApi_createNft(nftAddr: string, tokenId: string, userId: number): Promise<number>;
    mySqlApi_readNftAll(): Promise<MySqlApi_Nft[]>;
    mySqlApi_isNftInDatabase(nftAddr: string, tokenId: string): Promise<boolean>;
}


//==================================================================================================
// Class
//==================================================================================================
class MySqlApi implements IMySqlApi {
    //--------------------------
    // Propeties
    //--------------------------
    protected host: string;
    protected user: string;
    protected password: string;
    protected database: string;     // MF: Might be string[] if we will have multiple databases
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

    public mySqlApi_readUserAll(): Promise<MySqlApi_User[]> {
        return new Promise((resolve, reject) => {
            this.pool.query<MySqlApi_User[]>(
                "SELECT * FROM users;",
                (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                }
            );
        });
    }

    public mySqlApi_readUser(userId: number): Promise<MySqlApi_User[]> {
        return new Promise((resolve, reject) => {
            this.pool.query<MySqlApi_User[]>(
                "SELECT * FROM users WHERE id = ?;",
                [userId],
                (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        if (results.length === 0) {
                            reject({message: `User with an id '${userId}' doesn't exist`})
                        } else {
                            resolve(results);
                        }
                    }
                }
            );
        });
    }

    public mySqlApi_isUserInDatabase(userAddr: string): Promise<MySqlApi_UserCheck> {
        return new Promise((resolve, reject) => {
            this.pool.query<MySqlApi_UserCheck[]>(
                `SELECT id, address FROM users WHERE address = ?;`,
                [userAddr],
                (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        if (results.length !== 0) {
                            if (results[0]["address"] === userAddr) {
                                results[0]["isUserInDatabase"] = true;
                            }
                        } else {
                            results.push({
                                constructor: { name: "RowDataPacket"},
                                id: 0,
                                address: "",
                                isUserInDatabase: false
                            });
                        }
                        resolve(results[0]);
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

    public mySqlApi_readNftAll(): Promise<MySqlApi_Nft[]> {
        return new Promise((resolve, reject) => {
            this.pool.query<MySqlApi_Nft[]>(
                "SELECT * FROM erc721_tokens;",
                (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                }
            );
        });
    }

    public mySqlApi_isNftInDatabase(nftAddr: string, tokenId: string): Promise<boolean> {
        let isNftInDatabase: boolean = false

        return new Promise((resolve, reject) => {
            this.pool.query<MySqlApi_NftCheck[]>(
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
export { MySqlApi, MySqlApi_User, MySqlApi_UserCheck, MySqlApi_Nft };

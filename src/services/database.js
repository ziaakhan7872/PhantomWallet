import SQLite from 'react-native-sqlite-storage';
import { chainsArray } from '../constants/chains';

// Enable promise-based API
SQLite.enablePromise(true);

let dbInstance;

async function getDb() {
    if (dbInstance) return dbInstance;
    try {
        dbInstance = await SQLite.openDatabase({ name: 'PhantomWallet.db', location: 'default' });
        console.log('Database opened successfully');
        await createTables(dbInstance);
        return dbInstance;
    } catch (error) {
        console.log('SQL open error:', error);
        throw error;
    }
}

async function createTables(db) {
    if (!db) throw new Error('Database not initialized');

    // Create wallets table
    await db.executeSql(`
    CREATE TABLE IF NOT EXISTS WalletTbl (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                walletAddress TEXT UNIQUE,
                privateKey TEXT,
                seedPhrase TEXT,
                isActive INTEGER,
                name TEXT,
                username TEXT,
                logo TEXT,
                account INTEGER,
                btcWalletAddress TEXT,
                btcPrivateKey TEXT,
                solanaWalletAddress TEXT,
                solanaPrivateKey TEXT
            )
                `);

    // Create chains table
    await db.executeSql(`
        CREATE TABLE IF NOT EXISTS ChainsTbl (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                chainName TEXT,
                tokenName TEXT,
                type TEXT,
                tokenAddress TEXT,
                symbol TEXT,
                decimals INTEGER,
                cmcId TEXT,
                rpcUrl TEXT,
                logoURI TEXT,
                isActive INTEGER,
                isEvm INTEGER,
                walletId INTEGER,
                change24h TEXT,
                currentPriceUsd TEXT,
                balanceUsd TEXT,
                balance TEXT
            );
            `);

    // Create auth_settings table (disabled for now)
    // await db.executeSql(`
    //   CREATE TABLE IF NOT EXISTS auth_settings (
    //     id INTEGER PRIMARY KEY AUTOINCREMENT,
    //     pin TEXT NOT NULL,
    //     isFaceIdEnabled INTEGER DEFAULT 0,
    //     isWalletCreated INTEGER DEFAULT 0,
    //     createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    //     updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    //   );
    // `);

}

// get active wallet
export const getActiveWallet = async () => {
    const db = await getDb();
    try {
        const [results] = await db.executeSql('SELECT * FROM WalletTbl WHERE isActive=1', []);
        const activeWallet = results.rows.length > 0 ? results.rows.item(0) : null;
        return activeWallet;
    } catch (error) {
        console.log('Error fetching getActiveWallet:', error);
        throw error;
    }
};


// Insert wallets in database
export const insertWallet = async (
    name,
    seedPhrase,
    publicAddress,
    privateKey,
    btcWalletAddress,
    btcPrivateKey,
    solanaAddress,
    solanaPrivateKey,
) => {
    console.log('insertWallet payload', {
        name,
        seedPhrase,
        publicAddress,
        privateKey,
        btcWalletAddress,
        btcPrivateKey,
        solanaAddress,
        solanaPrivateKey,
    });

    const db = await getDb();
    try {
        // Deactivate any previously active wallet
        await db.executeSql('UPDATE WalletTbl set isActive=? where isActive=?', [0, 1]);

        // Insert the new active wallet
        const [insertResult] = await db.executeSql(
            'INSERT INTO WalletTbl(name,logo, account, isActive, seedPhrase, walletAddress, privateKey, btcWalletAddress, btcPrivateKey, solanaWalletAddress, solanaPrivateKey) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
            [
                name,
                '😍',
                0,
                1,
                seedPhrase,
                publicAddress,
                privateKey,
                btcWalletAddress,
                btcPrivateKey,
                solanaAddress,
                solanaPrivateKey,
            ],
        );

        if (insertResult && insertResult.rowsAffected > 0) {
            return insertResult.insertId;
        }
        throw new Error('Failed to insert wallet');
    } catch (error) {
        console.log('Error adding wallet:', error);
        throw error;
    }
};

// insert all blockchain Chains
export const InsertAllChains = async (waletid, chainsarray) => {
    const db = await getDb();
    try {
        // Sequential inserts to simplify error handling
        for (const item of chainsarray) {
            await db.executeSql(
                'INSERT INTO ChainsTbl(chainName, tokenName, type, tokenAddress, symbol, decimals, cmcId, rpcUrl, logoURI, isActive, isEvm, walletId, change24h, currentPriceUsd, balanceUsd, balance) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                [
                    item.chainName,
                    item.tokenName,
                    item.type,
                    item.tokenAddress,
                    item.symbol,
                    item.decimals,
                    item.rpcUrlname,
                    item.rpcUrl,
                    item.tokenImage,
                    item.isActive,
                    item.isEvm,
                    waletid,
                    0,
                    0,
                    0,
                    0,
                ],
            );
        }
        return 'chains inserted';
    } catch (error) {
        console.log('Error inserting chains:', error);
        throw error;
    }
};

// Get all wallets from WalletTbl
export const getAllWallets = async () => {
    const db = await getDb();
    try {
        const [results] = await db.executeSql('SELECT * FROM WalletTbl', []);
        const wallets = [];
        for (let i = 0; i < results.rows.length; i++) {
            const wallet = results.rows.item(i);
            wallets.push(wallet);
        }
        return wallets;
    } catch (error) {
        console.log('Error fetching all wallets:', error);
        throw error;
    }
};

export const getActiveWalletsWithTokenData = async () => {
    const db = await getDb();
    try {
        const [walletResult] = await db.executeSql(
            'SELECT * FROM WalletTbl WHERE isActive = 1',
            []
        );

        if (walletResult.rows.length === 0) return [];

        for (let i = 0; i < walletResult.rows.length; i++) {
            const wallet = walletResult.rows.item(i);

            // Fetch tokens for this wallet
            const [tokenResult] = await db.executeSql(
                'SELECT * FROM ChainsTbl WHERE walletId = ? AND isActive = 1',
                [wallet.id]
            );

            const tokens = [];
            for (let j = 0; j < tokenResult.rows.length; j++) {
                tokens.push(tokenResult.rows.item(j));
            }

            return {
                ...wallet,
                tokens,
            }
        }

    } catch (error) {
        console.log('Error fetching active wallets with token data:', error);
        throw error;
    }
};

// Get active wallet from WalletTbl
export const getWallet = async () => {
    const db = await getDb();
    try {
        const [results] = await db.executeSql('SELECT * FROM WalletTbl WHERE isActive=1 LIMIT 1', []);
        if (results.rows.length > 0) {
            const wallet = results.rows.item(0);
            return wallet
        }
        return null;
    } catch (error) {
        console.log('Error fetching wallet:', error);
        throw error;
    }
};

// get wallet by address
export const getWalletByAddress = async (address) => {
    const db = await getDb();
    try {
        const [results] = await db.executeSql('SELECT * FROM WalletTbl WHERE LOWER(walletAddress)=?', [address.toLowerCase()]);

        if (results.rows.length > 0) {
            const wallet = results.rows.item(0);
            return wallet
        }
        return null;
    } catch (error) {
        console.log('Error fetching getWalletByAddress:', error);
        throw error;
    }
};

// Check if username already exists
export const checkUsernameExists = async (username, excludeWalletId = null) => {
    const db = await getDb();
    try {
        let query = 'SELECT id FROM WalletTbl WHERE LOWER(username) = LOWER(?)';
        let params = [username];

        if (excludeWalletId) {
            query += ' AND id != ?';
            params.push(excludeWalletId);
        }

        const [results] = await db.executeSql(query, params);
        return results.rows.length > 0;
    } catch (error) {
        console.log('Error checking username:', error);
        throw error;
    }
};

// Update wallet name
export const updateWalletName = async (walletId, newName) => {
    const db = await getDb();
    try {
        const [results] = await db.executeSql(
            'UPDATE WalletTbl SET username = ? WHERE id = ?',
            [newName, walletId]
        );

        if (results.rowsAffected > 0) {
            return true;
        }
        throw new Error('Failed to update wallet name');
    } catch (error) {
        console.log('Error updating wallet name:', error);
        throw error;
    }
};

// Update wallet name
export const updateWalletAccountName = async (walletId, newName) => {
    const db = await getDb();
    try {
        const [results] = await db.executeSql(
            'UPDATE WalletTbl SET name = ? WHERE id = ?',
            [newName, walletId]
        );

        if (results.rowsAffected > 0) {
            return true;
        }
        throw new Error('Failed to update wallet account name');
    } catch (error) {
        console.log('Error updating wallet account name:', error);
        throw error;
    }
};

// Update wallet logo
export const updateWalletLogo = async (walletId, logo) => {
    const db = await getDb();
    try {
        const [results] = await db.executeSql(
            'UPDATE WalletTbl SET logo = ? WHERE id = ?',
            [logo, walletId]
        );

        if (results.rowsAffected > 0) {
            return true;
        }
        throw new Error('Failed to update wallet logo');
    } catch (error) {
        console.log('Error updating wallet logo:', error);
        throw error;
    }
};

// update token and coin balance
export const UpdateTokenAndCoinBalance = async (newBalance, id) => {
    const db = await getDb();
    try {
        const [results] = await db.executeSql(
            'UPDATE ChainsTbl SET balance = ? WHERE id = ?',
            [newBalance, id]
        );
        if (results.rowsAffected > 0) {
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error in UpdateTokenAndCoinBalance:', error);
        throw error;
    }
};

// save coin current prices and change24h
export const UpdateCoinCurrentPrices = async (tokendata) => {
    const db = await getDb();
    try {
        const [results] = await db.executeSql(
            `UPDATE ChainsTbl SET change24h = ?, currentPriceUsd = ? WHERE cmcId = ? AND type = ?`,
            [
                tokendata?.change24hr ?? 0,
                tokendata?.curentprice ?? 0,
                tokendata?.cmcId,
                'chain',
            ]
        );

        if (results.rowsAffected > 0) {
            return true;
        }

        return false;
    } catch (error) {
        console.error('Error in UpdateCoinCurrentPrices:', error);
        throw error;
    }
};

// save token current prices and change24h
export const UpdateTokenCurrentPrices = async (tokendata) => {
    const db = await getDb();
    try {
        const [results] = await db.executeSql(
            `UPDATE ChainsTbl SET change24h = ?, currentPriceUsd = ? WHERE LOWER(tokenAddress) = LOWER(?)`,
            [
                tokendata?.change24hr ?? 0,
                tokendata?.curentprice ?? 0,
                tokendata?.tokenAddress ?? '',
            ]
        );

        if (results.rowsAffected > 0) {
            return true;
        }

        return false;
    } catch (error) {
        console.error('Error in UpdateTokenCurrentPrices:', error);
        throw error;
    }
};

// switch active wallet
export const switchActiveWallet = async (walletId) => {
    const db = await getDb();
    try {
        const [results] = await db.executeSql(
            'UPDATE WalletTbl SET isActive = CASE WHEN id = ? THEN 1 ELSE 0 END',
            [walletId]
        );

        if (results.rowsAffected > 0) {
            return true;
        }
        throw new Error('Failed to update wallet name');
    } catch (error) {
        console.log('Error updating wallet name:', error);
        throw error;
    }
};


// Default export with all methods
const database = {
    getWallet,
    getAllWallets,
    getActiveWallet,
    insertWallet,
    InsertAllChains,
    checkUsernameExists,
    updateWalletName,
    updateWalletAccountName,
    updateWalletLogo,
    getActiveWalletsWithTokenData,
    switchActiveWallet
};

export default database;



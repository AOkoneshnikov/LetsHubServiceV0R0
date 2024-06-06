import { isPropertyAccessOrQualifiedName } from "typescript";

const kuzu = require('kuzu');
const db = new kuzu.Database("./hubdb");
const conn = new kuzu.Connection(db);

void init();

async function init() { 
    //await createDB();
    // await loadDemoData();
     //await dropDB();
     await showData();
     //await trustlines('EQDIzaG1rkw_ZMnBBIOZYBWNNv2-bQJYu0veynHllOZvsKeN');
    // await trustlines('EQBBZf2PzCIP9wWHQgv3zSYVMqt4mTOh0LOqtIFogpavk8fV');

   // await constMatch();

}

async function createDB() {
    await conn.query(
        "CREATE NODE TABLE Wallets(address STRING, content BLOB, updated TIMESTAMP, PRIMARY KEY (address))"
      );
    await conn.query(
        "CREATE REL TABLE Trustlines(FROM Wallets TO Wallets, address STRING, valuedept UINT64, maxdept UINT64, updated TIMESTAMP)"
      );
    console.log(`DB tables created`);
}

async function dropDB() {
    
    await conn.query(
        "DROP TABLE Trustlines"
      );

      await conn.query(
        "DROP TABLE Wallets"
      );
    console.log(`DB tables drop`);
}

async function loadDemoData() {
    await conn.query("MERGE (n: Wallets{address: 'User[0]'});")
    await conn.query("MERGE (n: Wallets{address: 'User[1]'});")
    await conn.query("MERGE (n: Wallets{address: 'User[2]'});")
    await conn.query("MERGE (n: Wallets{address: 'User[3]'});")
    await conn.query("MERGE (n: Wallets{address: 'User[4]'});")
    await conn.query("MERGE (n: Wallets{address: 'User[5]'});")

    await conn.query(`MATCH (a:Wallets {address: 'User[0]'}), (b:Wallets {address: 'User[1]'}) 
        MERGE (a)-[e:Trustlines {credit: 100}]->(b);`)
    await conn.query(`MATCH (a:Wallets {address: 'User[1]'}), (b:Wallets {address: 'User[2]'}) 
        MERGE (a)-[e:Trustlines {credit: 200}]->(b);`)
    await conn.query(`MATCH (a:Wallets {address: 'User[2]'}), (b:Wallets {address: 'User[3]'}) 
        MERGE (a)-[e:Trustlines {credit: 300}]->(b);`)
    await conn.query(`MATCH (a:Wallets {address: 'User[3]'}), (b:Wallets {address: 'User[4]'}) 
        MERGE (a)-[e:Trustlines {credit: 400}]->(b);`)
    await conn.query(`MATCH (a:Wallets {address: 'User[4]'}), (b:Wallets {address: 'User[5]'}) 
        MERGE (a)-[e:Trustlines {credit: 500}]->(b);`)
    await conn.query(`MATCH (a:Wallets {address: 'User[5]'}), (b:Wallets {address: 'User[0]'}) 
        MERGE (a)-[e:Trustlines {credit: 600}]->(b);`)

    await conn.query(`MATCH (a:Wallets {address: 'User[0]'}), (b:Wallets {address: 'User[5]'}) 
        MERGE (a)-[e:Trustlines {credit: 700}]->(b);`)

    console.log('Demo data loaded in DB.');
}

async function showData() {
    let queryResult = await conn.query("MATCH (a:Wallets) RETURN a.*;");
    let rows = await queryResult.getAll();
    for (const x of rows) {
        console.log(x);
    }

    queryResult = await conn.query("MATCH (a:Wallets)-[f:Trustlines]->(b:Wallets) RETURN f.*;");
    rows = await queryResult.getAll();
    for (const x of rows) {
        console.log(x);
    }
    console.log('result print to console');
}

async function trustlines(wallet: string) {
    let str = `MATCH (a: Wallets{address: '${wallet}'})-[t: Trustlines]->(b: Wallets) RETURN t;`
    let queryResult = await conn.query(str);
    let rows = await queryResult.getAll();
    for (const x of rows) {
        console.log(x);
    }
}

async function constMatch() {
    let str = "MATCH path=((a:Wallets{address: 'EQDIzaG1rkw_ZMnBBIOZYBWNNv2-bQJYu0veynHllOZvsKeN'})-[:Trustlines* SHORTEST 1..25]->(b:Wallets{address: 'EQBBZf2PzCIP9wWHQgv3zSYVMqt4mTOh0LOqtIFogpavk8fV'})) RETURN path;"
    str = "MATCH path=((a:Wallets{address: 'EQBBZf2PzCIP9wWHQgv3zSYVMqt4mTOh0LOqtIFogpavk8fV'})-[:Trustlines* SHORTEST 1..25]->(b:Wallets{address: 'EQA3JwNb5uEoUJqIqdDYGYpLT7rplFwTcOuBQEHLKzbTYQx-'})) RETURN path;"
    
    str = "MATCH (a:Wallets)-[f:Trustlines]->(b:Wallets) WHERE f.address = 'EQDKa9FbKcAITOk9PjsSzKR2LmeOVV_mEKtDqA4zr7bDHq5c' SET f.maxdept = 100 RETURN f.*;";

    console.log('result print to console');
    let queryResult = await conn.query(str);
    let rows = await queryResult.getAll();
    for (const x of rows) {
        console.log(x);
    }
}




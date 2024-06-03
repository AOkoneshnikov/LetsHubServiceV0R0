const kuzu = require('kuzu');
const db = new kuzu.Database("./hubdb");
const conn = new kuzu.Connection(db);

void init();

async function init() { 
    // await createDB();
    // await loadDemoData();
    // await dropDB();
     await showData();
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
        "DROP TABLE Wallets"
      );
    await conn.query(
        "DROP TABLE Trustlines"
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
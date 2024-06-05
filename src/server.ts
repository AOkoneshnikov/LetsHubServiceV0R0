import express, { json } from 'express'
import * as dotenv from "dotenv";
import { readdir } from "fs/promises";
import { KeyPair, mnemonicToPrivateKey } from '@ton/crypto';
import { beginCell, Cell, OpenedContract, toNano, fromNano, Contract, address } from '@ton/core';
import {TonClient, WalletContractV4, internal} from '@ton/ton'
import { LetsWalletV0R0 } from "./tact_LetsWalletV0R0"
import { LetsHubV0R0 } from "./tact_LetsHubV0R0"
import { LetsLinkV0R0 } from "./tact_LetsLinkV0R0"
import { LetsTrustlineV0R0 } from "./tact_LetsTrustlineV0R0"
import { Address } from '@ton/core';
import asyncHandler from "express-async-handler"
import * as fs from 'fs';
import { timeStamp } from 'console';

dotenv.config();
const client = new TonClient({
  endpoint: `https://testnet.toncenter.com/api/v2/jsonRPC`,
  apiKey: process.env.TONCENTER_API_KEY,
});

const app = express();
const port = 5000;
const currency = 'TEST'
let dataHub;
let hub;
var JSONbig = require('json-bigint');
const kuzu = require('kuzu');
const db = new kuzu.Database("./hubdb");
const conn = new kuzu.Connection(db);


app.get('/', async (request, response) => {
  response.send(`This is the LetHubV0R0-JSON-RPC server of the LetsWalletV0R0 project in testnet TON. <br/><br/><br/>
  Server LetHubV0R0:<br/>
        address: ${hub.address}<br/>
        currency: ${currency}<br/>
        getData: ${dataHub}<br/>
  <br/>Use examples: <br/><br/>
  http://77.91.69.161:5000/path/from/EQBBZf2PzCIP9wWHQgv3zSYVMqt4mTOh0LOqtIFogpavk8fV/to/EQDIzaG1rkw_ZMnBBIOZYBWNNv2-bQJYu0veynHllOZvsKeN
  <br/><br/>
  http://77.91.69.161:5000/trustlines/EQDIzaG1rkw_ZMnBBIOZYBWNNv2-bQJYu0veynHllOZvsKeN
  `);
});

app.get('/path/from/:sender/to/:destination', asyncHandler(async (request, response) => {
  const { sender } = request.params;
  const { destination } = request.params;

  let str = `MATCH path=((a:Wallets{address: '${sender}'})-[:Trustlines* SHORTEST 1..25]->(b:Wallets{address: '${destination}'})) RETURN path;`
  console.log(str);
  let queryResult = await conn.query(str)
  if (await queryResult.hasNext()) {
      let row = await queryResult.getNext()
      response.send(row);     
  } else {
    response.send(`Error: path not found`);
  }    
}));

app.get('/trustlines/:wallet', asyncHandler(async (request, response) => {
  const { wallet } = request.params;
  let str = `MATCH (a: Wallets{address: '${wallet}'})-[trustline: Trustlines]->(b: Wallets) RETURN trustline;`
  let queryResult = await conn.query(str);
  let jsonArray: any = [];
  while (await queryResult.hasNext()) {
      let currentData = await queryResult.getNext();
      jsonArray.push(currentData);
  }
  response.send(JSON.stringify(jsonArray));
  }));


void init();
app.listen(port, () => console.log(`Running on port ${port}`));


async function init() { 
  hub = client.open(await LetsHubV0R0.fromInit(currency));
  dataHub = JSONbig.stringify(await hub.getData());
  // let timerId = setInterval(() => scanHub(), 10000);
}

async function scanHub() {
  let txt = fs.readFileSync('./src/idlink.txt', 'utf8');
  let idlinkStart = BigInt(txt);
  let idlink = (await hub.getData()).linkId;
  console.log(`idlink = ${idlink}`);
  while (idlinkStart <= idlink - 1n) {
    let linkInit = await LetsLinkV0R0.fromInit(idlinkStart, currency);
    if ((await client.getContractState(linkInit.address)).state == 'active') {
      let link = client.open(linkInit);
      let link_data = await link.getData();
      if (link_data != null) {
        idlinkStart++;
        fs.writeFileSync('./src/idlink.txt', String(idlinkStart));
        if (link_data.trustline != null) {
          let trustline = client.open(await LetsTrustlineV0R0.fromAddress(link_data.trustline));
          let trustline_data = await trustline.getData();
          let date = new Date();
          await conn.query(`MERGE (n: Wallets {address: '${trustline_data.creditor}'}) ON MATCH SET n.updated = TIMESTAMP('${date.toISOString()}');`);
          await conn.query(`MERGE (n: Wallets {address: '${trustline_data.debitor}'}) ON MATCH SET n.updated = TIMESTAMP('${date.toISOString()}');`);
          await conn.query(`MATCH (a: Wallets {address: '${trustline_data.creditor}'}), (b: Wallets {address: '${trustline_data.debitor}'}) 
                            MERGE (a)-[e:Trustlines]->(b)
                            ON CREATE SET e.maxdept = ${trustline_data.limit}, e.address = '${trustline.address}', e.valuedept = ${trustline_data.value}, e.updated = TIMESTAMP('${date.toISOString()}') 
                            ON MATCH SET e.maxdept = ${trustline_data.limit}, e.valuedept = ${trustline_data.value}, e.updated = TIMESTAMP('${date.toISOString()}');`)
          console.log(trustline.address);
          
        }
        
      }
    }
  }
   
}
  

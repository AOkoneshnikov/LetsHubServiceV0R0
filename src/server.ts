import express from 'express'
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
  <br/>Use examples: <br/>
  http://77.91.69.161:5000/wallet/EQDHKWjBopSrJXHp45G_UVLS0XzBnghwSDqINBqWRjwk58gm
  http://77.91.69.161:5000/trustline/EQDXe0Rn6pNeAQXRhmlJ8JNG4291eb9DJKV74FSndOUH7oQH
  http://77.91.69.161:5000/link/EQC7i0xeXNgbEnargWCmE1uimRVADhAgz4Q4heR38_snX_6Z
  `);
});

app.get('/wallet/:address', asyncHandler(async (request, response) => {
  let addr = Address.parse(request.params['address']);
  if ((await client.getContractState(addr)).state != 'active') { response.send(`Contract not active`); return; }
  let wallet = client.open(await LetsWalletV0R0.fromAddress(addr));
  response.send(JSONbig.stringify(await wallet.getData()));
}))

app.get('/trustline/:address', asyncHandler(async (request, response) => {
  let addr = Address.parse(request.params['address']);
  if ((await client.getContractState(addr)).state != 'active') { response.send(`Contract not active`); return; }
  let trustline = client.open(await LetsTrustlineV0R0.fromAddress(addr));
  response.send(JSONbig.stringify(await trustline.getData()));
}))

app.get('/link/:address', asyncHandler(async (request, response) => {
  let addr = Address.parse(request.params['address']);
  if ((await client.getContractState(addr)).state != 'active') { response.send(`Contract not active`); return; }
  let link = client.open(await LetsLinkV0R0.fromAddress(addr));
  response.send(JSONbig.stringify(await link.getData()));
}))


void init();
app.listen(port, () => console.log(`Running on port ${port}`));


async function init() { 
  hub = client.open(await LetsHubV0R0.fromInit(currency));
  dataHub = JSONbig.stringify(await hub.getData());
  let timerId = setInterval(() => scanHub(), 15000);
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
                            MERGE (a)-[e:Trustlines {maxdept: ${trustline_data.limit}, valuedept: ${trustline_data.value}, updated: TIMESTAMP('${date.toISOString()}')}]->(b)
                             ON MATCH SET e.maxdept = ${trustline_data.limit + 200n}, e.updated = TIMESTAMP('${date.toISOString()}');`)
          console.log(trustline_data.creditor);
          
        }
        
      }
    }
  }
   
}
  

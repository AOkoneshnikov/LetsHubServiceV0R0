import * as dotenv from "dotenv";
import { readdir } from "fs/promises";
import { getSecureRandomBytes, KeyPair, keyPairFromSeed, mnemonicToPrivateKey, sign } from '@ton/crypto';
import { beginCell, Cell, OpenedContract, toNano, fromNano, Contract } from '@ton/core';
import {TonClient, WalletContractV4, internal, external} from '@ton/ton'
import { LetsWalletV0R0 } from "./tact_LetsWalletV0R0"
import { LetsHubV0R0 } from "./tact_LetsHubV0R0"
import { Address } from "@ton/core";
import * as fs from 'fs';
import {toBigIntBE, toBigIntLE, toBufferBE, toBufferLE} from 'bigint-buffer'
import { cursorTo } from "readline";
import { LetsTrustlineV0R0 } from "./tact_LetsTrustlineV0R0";
import { LetsLinkV0R0 } from "./tact_LetsLinkV0R0";


dotenv.config();
const client = new TonClient({
  endpoint: `https://testnet.toncenter.com/api/v2/jsonRPC`,
  apiKey: process.env.TONCENTER_API_KEY,
});
let sponsor_keyPair: KeyPair;
let sponsor: WalletContractV4;
let sponsor_wallet;
const seeds_base64 = fs.readFileSync('./src/seed.txt', 'utf8').split('\n');
var JSONbig = require('json-bigint');

async function init() {
    sponsor_keyPair = await mnemonicToPrivateKey(process.env.MNEMONIC!.split(" "));
    sponsor = WalletContractV4.create({
      workchain: 0,
      publicKey: sponsor_keyPair.publicKey,
    });
    sponsor_wallet = client.open(sponsor);
    let balance = await sponsor_wallet.getBalance();
    console.log(`Sponsor wallet balance = ${fromNano(balance)} wallet address = ${sponsor_wallet.address}`);


    // await save_seed();
    //await deployLetsHub("TEST");
   // await gen_wallet('TEST');
    await fund_contracts('hub', 'TEST');

    // await fund_contracts('wallets', 'TEST');
    let walletCreditor = await walletFromSeedBase64(seeds_base64[9], 'TEST');
    let walletDebitor = await walletFromSeedBase64(seeds_base64[0], 'TEST');
    await create_trustline(walletCreditor, walletDebitor, keyPairFromSeedBase64(seeds_base64[9]).secretKey);


    // let tl = client.open(await LetsTrustlineV0R0.fromInit(walletCreditor.address, walletDebitor.address));
    // let hub = client.open(await LetsHubV0R0.fromInit('TEST'));
    // let link = client.open(await LetsLinkV0R0.fromInit(1n, 'TEST'));
    // let wallet = client.open(await LetsWalletV0R0.fromAddress(Address.parse('EQBP8d0jYrY2rqBJzlXJ1yucij1nWky9ihyhiZ2BmbXefAxu')))
  
    // console.log(`trustline data = ${JSONbig.stringify(await tl.getData())}`);
    // console.log(`hub data = ${JSONbig.stringify(await hub.getData())}`);
    // console.log(`link data = ${JSONbig.stringify(await link.getData())}`);
    // console.log(`wallet data = ${JSONbig.stringify(await wallet.getData())}`);

    // console.log(link.address)
  
}
  
  void init();

  async function save_seed() {
    let i = 0;
    fs.writeFileSync('./src/seed.txt', '');
    while (i < 100) {
      const seed: Buffer = await getSecureRandomBytes(32);
      console.log(seed.toString('base64'));
      fs.appendFileSync('./src/seed.txt', seed.toString('base64') + '\n');
      i++;
    }
    
  }

  async function gen_wallet(currency: string) {
    let i = 0;
    while (i < 10) {
      let seed = Buffer.from(seeds_base64[i], 'base64');
      const keypair: KeyPair = keyPairFromSeed(seed);
      console.log(seeds_base64[i]);
      const contractLW = await deployLetsWallet(toBigIntBE(keypair.publicKey), currency);
      await waitDeploy(contractLW.address);
      i++;
    }
  }
  
  
  async function waitDeploy(contractAddress: Address) {
    for (let attempt = 0; attempt < 100; attempt++) {
      await sleep(2000);
      if ((await client.getContractState(contractAddress)).state == 'active') {
        break;
      }
    }
  }
  
  async function sleep(ms: number): Promise<void> {
    return new Promise(
        (resolve) => setTimeout(resolve, ms));
  }

  async function waitSeqnoSponsor(seqno: number) {
    for (let attempt = 0; attempt < 100; attempt++) {
      await sleep(2000);
      const seqnoAfter = await sponsor_wallet.getSeqno();
      if (seqnoAfter == seqno + 1) break;
    }
  }

  async function deployLetsHub(currency: string) {
    let hub = await LetsHubV0R0.fromInit(currency);
    let contractHub = client.open(hub);
    let seqno: number = await sponsor_wallet.getSeqno();
    let addr = contractHub.address;
    console.log(addr);
    sponsor_wallet.sendTransfer({
      seqno: seqno,
      secretKey: sponsor_keyPair.secretKey,
      messages: [internal({
        value: '0.05',
        to: addr,
        body: beginCell().storeUint(2490013878, 32).storeUint(0, 64).endCell(),
        init: contractHub.init
      })]
    })
    return contractHub;
  }

  async function deployLetsWallet(wallet_publicKey: bigint, currency: string) {
    let lw = await LetsWalletV0R0.fromInit(wallet_publicKey, currency);
    let contractLW = client.open(lw);
    let seqno: number = await sponsor_wallet.getSeqno();
    let addr = lw.address
    console.log(addr)
    sponsor_wallet.sendTransfer({
      seqno: seqno,
      secretKey: sponsor_keyPair.secretKey,
      messages: [internal({
        value: '0.05',
        to: addr,
        body: beginCell().storeUint(2490013878, 32).storeUint(0, 64).endCell(),
        init: lw.init
      })]
    })
    return contractLW;
  }

  async function walletFromSeedBase64(seed_base64: string, currency: string) {
    let seed = Buffer.from(seed_base64, 'base64');  
    const keypair: KeyPair = keyPairFromSeedBase64(seed_base64); 
    return client.open(await LetsWalletV0R0.fromInit(toBigIntBE(keypair.publicKey), currency))
  }

  function keyPairFromSeedBase64(seed_base64: string) {
    let seed = Buffer.from(seed_base64, 'base64');  
    return keyPairFromSeed(seed); 
  }

  async function waitNewSeqnoLetsWallet(seqno: bigint, contract: OpenedContract<LetsWalletV0R0>) {
    let attempt = 0;
    for (attempt = 0; attempt < 100; attempt++) {
      await sleep(2000);
      const seqnoAfter = await contract.getSeqno();
      if (seqnoAfter == seqno + 1n) break;
    }
    if (attempt == 100) { return false } else { return true }
  }

  async function create_trustline(walletCreditor: OpenedContract<LetsWalletV0R0>, walletDebitor: OpenedContract<LetsWalletV0R0>, secret_key: Buffer) {
    let seqnoWalletCreditor = await walletCreditor.getSeqno();
    let header = beginCell()
            .storeUint(Math.floor(Date.now() / 1000) + 10, 32)
            .storeUint(await walletCreditor.getSeqno(), 32)
            .storeUint(Math.floor(Math.random() * 65536),32)
            .endCell();
    let header_signature = sign(header.hash(), secret_key); 

    await walletCreditor.sendExternal({
      $$type: 'CreateTrustlineV0R0',
      signature: header_signature,
      header: header,
      debitor: walletDebitor.address,
      tontoTrustline: toNano('0.1'),
      tontoLink: toNano('0.1'),
    });

    let trustline = client.open(await LetsTrustlineV0R0.fromInit(walletCreditor.address, walletDebitor.address));

    if (await waitNewSeqnoLetsWallet(seqnoWalletCreditor, walletCreditor)) {
      console.log(`created trustline addreess ${trustline.address} from ${walletCreditor.address} to ${walletDebitor.address}`);
    }
  }

  async function fund_contracts(typeContract: string, currency: string) {
    if (typeContract == "hub") {
      let hub = await LetsHubV0R0.fromInit(currency);
      let balance = (await client.getContractState(hub.address)).balance;
      if (balance < toNano(0.4)) {
        const seqno: number = await sponsor_wallet.getSeqno();
        sponsor_wallet.sendTransfer({
          seqno: seqno,
          secretKey: sponsor_keyPair.secretKey,
          messages: [internal({
            value: '0.5',
            to: hub.address
          })]
        });
        await waitSeqnoSponsor(seqno);
        console.log(`fund HUB address = ${hub.address}`);
      }
    }

    if (typeContract == 'wallets') {
      let i = 0;
      while (i<10) {
        let seed = Buffer.from(seeds_base64[i], 'base64');
        const keypair: KeyPair = keyPairFromSeed(seed);
        let wallet = await LetsWalletV0R0.fromInit(toBigIntBE(keypair.publicKey), currency)
        let addr = wallet.address;
        let balance = (await client.getContractState(addr)).balance;
        if (balance < toNano(0.4)) {
          const seqno: number = await sponsor_wallet.getSeqno();
          sponsor_wallet.sendTransfer({
            seqno: seqno,
            secretKey: sponsor_keyPair.secretKey,
            messages: [internal({
              value: '0.5',
              to: addr
            })]
          });
          await waitSeqnoSponsor(seqno);
          console.log(`fund wallet address = ${addr}`);
        }
        i++;
      }
    }


    
  }
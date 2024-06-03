import * as dotenv from "dotenv";
import { readdir } from "fs/promises";
import { KeyPair, mnemonicToPrivateKey } from '@ton/crypto';
import { beginCell, Cell, OpenedContract, toNano, fromNano, Contract } from '@ton/core';
import {TonClient, WalletContractV4, internal} from '@ton/ton'
import { LetsWalletV0R0 } from "./tact_LetsWalletV0R0"
import { Address } from "ton-core";


dotenv.config();
const client = new TonClient({
  endpoint: `https://testnet.toncenter.com/api/v2/jsonRPC`,
  apiKey: process.env.TONCENTER_API_KEY,
});
let sponsor_keyPair: KeyPair;
let sponsor: WalletContractV4;
let sponsor_wallet;

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


async function init() {
  sponsor_keyPair = await mnemonicToPrivateKey(process.env.MNEMONIC!.split(" "));
  sponsor = WalletContractV4.create({
    workchain: 0,
    publicKey: sponsor_keyPair.publicKey,
  });
  sponsor_wallet = client.open(sponsor);
  let balance = await sponsor_wallet.getBalance();
  console.log(`balance = ${fromNano(balance)}`);

  let contractLW = await deployLetsWallet(99574827693796631588842859911236494426788648808280454802923067449140883836212n, 'RUB');
  await waitDeploy(contractLW.address);
  console.log(`Deployed LetsWallet address = ${contractLW.address}`);
}

void init();


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
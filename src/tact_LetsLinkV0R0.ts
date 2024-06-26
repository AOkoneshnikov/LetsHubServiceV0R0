import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type LinkDataV0R0 = {
    $$type: 'LinkDataV0R0';
    balance: bigint;
    trustline: Address | null;
    creditor: Address | null;
    debitor: Address | null;
}

export function storeLinkDataV0R0(src: LinkDataV0R0) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(439893354, 32);
        b_0.storeCoins(src.balance);
        b_0.storeAddress(src.trustline);
        b_0.storeAddress(src.creditor);
        b_0.storeAddress(src.debitor);
    };
}

export function loadLinkDataV0R0(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 439893354) { throw Error('Invalid prefix'); }
    let _balance = sc_0.loadCoins();
    let _trustline = sc_0.loadMaybeAddress();
    let _creditor = sc_0.loadMaybeAddress();
    let _debitor = sc_0.loadMaybeAddress();
    return { $$type: 'LinkDataV0R0' as const, balance: _balance, trustline: _trustline, creditor: _creditor, debitor: _debitor };
}

function loadTupleLinkDataV0R0(source: TupleReader) {
    let _balance = source.readBigNumber();
    let _trustline = source.readAddressOpt();
    let _creditor = source.readAddressOpt();
    let _debitor = source.readAddressOpt();
    return { $$type: 'LinkDataV0R0' as const, balance: _balance, trustline: _trustline, creditor: _creditor, debitor: _debitor };
}

function storeTupleLinkDataV0R0(source: LinkDataV0R0) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.balance);
    builder.writeAddress(source.trustline);
    builder.writeAddress(source.creditor);
    builder.writeAddress(source.debitor);
    return builder.build();
}

function dictValueParserLinkDataV0R0(): DictionaryValue<LinkDataV0R0> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeLinkDataV0R0(src)).endCell());
        },
        parse: (src) => {
            return loadLinkDataV0R0(src.loadRef().beginParse());
        }
    }
}

export type HubDataV0R0 = {
    $$type: 'HubDataV0R0';
    balance: bigint;
    linkId: bigint;
}

export function storeHubDataV0R0(src: HubDataV0R0) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1077706281, 32);
        b_0.storeCoins(src.balance);
        b_0.storeUint(src.linkId, 64);
    };
}

export function loadHubDataV0R0(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1077706281) { throw Error('Invalid prefix'); }
    let _balance = sc_0.loadCoins();
    let _linkId = sc_0.loadUintBig(64);
    return { $$type: 'HubDataV0R0' as const, balance: _balance, linkId: _linkId };
}

function loadTupleHubDataV0R0(source: TupleReader) {
    let _balance = source.readBigNumber();
    let _linkId = source.readBigNumber();
    return { $$type: 'HubDataV0R0' as const, balance: _balance, linkId: _linkId };
}

function storeTupleHubDataV0R0(source: HubDataV0R0) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.balance);
    builder.writeNumber(source.linkId);
    return builder.build();
}

function dictValueParserHubDataV0R0(): DictionaryValue<HubDataV0R0> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeHubDataV0R0(src)).endCell());
        },
        parse: (src) => {
            return loadHubDataV0R0(src.loadRef().beginParse());
        }
    }
}

export type SetContentWalletDataV0R0 = {
    $$type: 'SetContentWalletDataV0R0';
    signature: Buffer;
    header: Cell;
    content: Cell;
}

export function storeSetContentWalletDataV0R0(src: SetContentWalletDataV0R0) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2049656789, 32);
        b_0.storeBuffer(src.signature);
        b_0.storeRef(src.header);
        b_0.storeRef(src.content);
    };
}

export function loadSetContentWalletDataV0R0(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2049656789) { throw Error('Invalid prefix'); }
    let _signature = sc_0.loadBuffer(64);
    let _header = sc_0.loadRef();
    let _content = sc_0.loadRef();
    return { $$type: 'SetContentWalletDataV0R0' as const, signature: _signature, header: _header, content: _content };
}

function loadTupleSetContentWalletDataV0R0(source: TupleReader) {
    let _signature = source.readBuffer();
    let _header = source.readCell();
    let _content = source.readCell();
    return { $$type: 'SetContentWalletDataV0R0' as const, signature: _signature, header: _header, content: _content };
}

function storeTupleSetContentWalletDataV0R0(source: SetContentWalletDataV0R0) {
    let builder = new TupleBuilder();
    builder.writeBuffer(source.signature);
    builder.writeSlice(source.header);
    builder.writeCell(source.content);
    return builder.build();
}

function dictValueParserSetContentWalletDataV0R0(): DictionaryValue<SetContentWalletDataV0R0> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSetContentWalletDataV0R0(src)).endCell());
        },
        parse: (src) => {
            return loadSetContentWalletDataV0R0(src.loadRef().beginParse());
        }
    }
}

export type WalletDataV0R0 = {
    $$type: 'WalletDataV0R0';
    publickeyOwner: bigint;
    publickeySponsor: bigint | null;
    currency: string;
    addressSponsor: Address | null;
    balance: bigint;
    content: Cell | null;
    seqno: bigint;
}

export function storeWalletDataV0R0(src: WalletDataV0R0) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2168594967, 32);
        b_0.storeUint(src.publickeyOwner, 256);
        if (src.publickeySponsor !== null && src.publickeySponsor !== undefined) { b_0.storeBit(true).storeUint(src.publickeySponsor, 256); } else { b_0.storeBit(false); }
        b_0.storeStringRefTail(src.currency);
        b_0.storeAddress(src.addressSponsor);
        b_0.storeCoins(src.balance);
        if (src.content !== null && src.content !== undefined) { b_0.storeBit(true).storeRef(src.content); } else { b_0.storeBit(false); }
        b_0.storeUint(src.seqno, 32);
    };
}

export function loadWalletDataV0R0(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2168594967) { throw Error('Invalid prefix'); }
    let _publickeyOwner = sc_0.loadUintBig(256);
    let _publickeySponsor = sc_0.loadBit() ? sc_0.loadUintBig(256) : null;
    let _currency = sc_0.loadStringRefTail();
    let _addressSponsor = sc_0.loadMaybeAddress();
    let _balance = sc_0.loadCoins();
    let _content = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _seqno = sc_0.loadUintBig(32);
    return { $$type: 'WalletDataV0R0' as const, publickeyOwner: _publickeyOwner, publickeySponsor: _publickeySponsor, currency: _currency, addressSponsor: _addressSponsor, balance: _balance, content: _content, seqno: _seqno };
}

function loadTupleWalletDataV0R0(source: TupleReader) {
    let _publickeyOwner = source.readBigNumber();
    let _publickeySponsor = source.readBigNumberOpt();
    let _currency = source.readString();
    let _addressSponsor = source.readAddressOpt();
    let _balance = source.readBigNumber();
    let _content = source.readCellOpt();
    let _seqno = source.readBigNumber();
    return { $$type: 'WalletDataV0R0' as const, publickeyOwner: _publickeyOwner, publickeySponsor: _publickeySponsor, currency: _currency, addressSponsor: _addressSponsor, balance: _balance, content: _content, seqno: _seqno };
}

function storeTupleWalletDataV0R0(source: WalletDataV0R0) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.publickeyOwner);
    builder.writeNumber(source.publickeySponsor);
    builder.writeString(source.currency);
    builder.writeAddress(source.addressSponsor);
    builder.writeNumber(source.balance);
    builder.writeCell(source.content);
    builder.writeNumber(source.seqno);
    return builder.build();
}

function dictValueParserWalletDataV0R0(): DictionaryValue<WalletDataV0R0> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeWalletDataV0R0(src)).endCell());
        },
        parse: (src) => {
            return loadWalletDataV0R0(src.loadRef().beginParse());
        }
    }
}

export type SetTrustlineV0R0 = {
    $$type: 'SetTrustlineV0R0';
    creditor: Address;
    debitor: Address;
}

export function storeSetTrustlineV0R0(src: SetTrustlineV0R0) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2343978615, 32);
        b_0.storeAddress(src.creditor);
        b_0.storeAddress(src.debitor);
    };
}

export function loadSetTrustlineV0R0(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2343978615) { throw Error('Invalid prefix'); }
    let _creditor = sc_0.loadAddress();
    let _debitor = sc_0.loadAddress();
    return { $$type: 'SetTrustlineV0R0' as const, creditor: _creditor, debitor: _debitor };
}

function loadTupleSetTrustlineV0R0(source: TupleReader) {
    let _creditor = source.readAddress();
    let _debitor = source.readAddress();
    return { $$type: 'SetTrustlineV0R0' as const, creditor: _creditor, debitor: _debitor };
}

function storeTupleSetTrustlineV0R0(source: SetTrustlineV0R0) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.creditor);
    builder.writeAddress(source.debitor);
    return builder.build();
}

function dictValueParserSetTrustlineV0R0(): DictionaryValue<SetTrustlineV0R0> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSetTrustlineV0R0(src)).endCell());
        },
        parse: (src) => {
            return loadSetTrustlineV0R0(src.loadRef().beginParse());
        }
    }
}

export type SetSponsorV0R0 = {
    $$type: 'SetSponsorV0R0';
    signature: Buffer;
    header: Cell;
    address: Address | null;
    publicKey: bigint | null;
}

export function storeSetSponsorV0R0(src: SetSponsorV0R0) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1298576143, 32);
        b_0.storeBuffer(src.signature);
        b_0.storeRef(src.header);
        b_0.storeAddress(src.address);
        let b_1 = new Builder();
        if (src.publicKey !== null && src.publicKey !== undefined) { b_1.storeBit(true).storeUint(src.publicKey, 256); } else { b_1.storeBit(false); }
        b_0.storeRef(b_1.endCell());
    };
}

export function loadSetSponsorV0R0(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1298576143) { throw Error('Invalid prefix'); }
    let _signature = sc_0.loadBuffer(64);
    let _header = sc_0.loadRef();
    let _address = sc_0.loadMaybeAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _publicKey = sc_1.loadBit() ? sc_1.loadUintBig(256) : null;
    return { $$type: 'SetSponsorV0R0' as const, signature: _signature, header: _header, address: _address, publicKey: _publicKey };
}

function loadTupleSetSponsorV0R0(source: TupleReader) {
    let _signature = source.readBuffer();
    let _header = source.readCell();
    let _address = source.readAddressOpt();
    let _publicKey = source.readBigNumberOpt();
    return { $$type: 'SetSponsorV0R0' as const, signature: _signature, header: _header, address: _address, publicKey: _publicKey };
}

function storeTupleSetSponsorV0R0(source: SetSponsorV0R0) {
    let builder = new TupleBuilder();
    builder.writeBuffer(source.signature);
    builder.writeSlice(source.header);
    builder.writeAddress(source.address);
    builder.writeNumber(source.publicKey);
    return builder.build();
}

function dictValueParserSetSponsorV0R0(): DictionaryValue<SetSponsorV0R0> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSetSponsorV0R0(src)).endCell());
        },
        parse: (src) => {
            return loadSetSponsorV0R0(src.loadRef().beginParse());
        }
    }
}

export type CancelSponsorV0R0 = {
    $$type: 'CancelSponsorV0R0';
    signature: Buffer;
    header: Cell;
}

export function storeCancelSponsorV0R0(src: CancelSponsorV0R0) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2350373647, 32);
        b_0.storeBuffer(src.signature);
        b_0.storeRef(src.header);
    };
}

export function loadCancelSponsorV0R0(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2350373647) { throw Error('Invalid prefix'); }
    let _signature = sc_0.loadBuffer(64);
    let _header = sc_0.loadRef();
    return { $$type: 'CancelSponsorV0R0' as const, signature: _signature, header: _header };
}

function loadTupleCancelSponsorV0R0(source: TupleReader) {
    let _signature = source.readBuffer();
    let _header = source.readCell();
    return { $$type: 'CancelSponsorV0R0' as const, signature: _signature, header: _header };
}

function storeTupleCancelSponsorV0R0(source: CancelSponsorV0R0) {
    let builder = new TupleBuilder();
    builder.writeBuffer(source.signature);
    builder.writeSlice(source.header);
    return builder.build();
}

function dictValueParserCancelSponsorV0R0(): DictionaryValue<CancelSponsorV0R0> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCancelSponsorV0R0(src)).endCell());
        },
        parse: (src) => {
            return loadCancelSponsorV0R0(src.loadRef().beginParse());
        }
    }
}

export type CreateTrustlineV0R0 = {
    $$type: 'CreateTrustlineV0R0';
    signature: Buffer;
    header: Cell;
    debitor: Address;
    tontoTrustline: bigint;
    tontoLink: bigint;
}

export function storeCreateTrustlineV0R0(src: CreateTrustlineV0R0) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3098573636, 32);
        b_0.storeBuffer(src.signature);
        b_0.storeRef(src.header);
        b_0.storeAddress(src.debitor);
        b_0.storeCoins(src.tontoTrustline);
        let b_1 = new Builder();
        b_1.storeCoins(src.tontoLink);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadCreateTrustlineV0R0(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3098573636) { throw Error('Invalid prefix'); }
    let _signature = sc_0.loadBuffer(64);
    let _header = sc_0.loadRef();
    let _debitor = sc_0.loadAddress();
    let _tontoTrustline = sc_0.loadCoins();
    let sc_1 = sc_0.loadRef().beginParse();
    let _tontoLink = sc_1.loadCoins();
    return { $$type: 'CreateTrustlineV0R0' as const, signature: _signature, header: _header, debitor: _debitor, tontoTrustline: _tontoTrustline, tontoLink: _tontoLink };
}

function loadTupleCreateTrustlineV0R0(source: TupleReader) {
    let _signature = source.readBuffer();
    let _header = source.readCell();
    let _debitor = source.readAddress();
    let _tontoTrustline = source.readBigNumber();
    let _tontoLink = source.readBigNumber();
    return { $$type: 'CreateTrustlineV0R0' as const, signature: _signature, header: _header, debitor: _debitor, tontoTrustline: _tontoTrustline, tontoLink: _tontoLink };
}

function storeTupleCreateTrustlineV0R0(source: CreateTrustlineV0R0) {
    let builder = new TupleBuilder();
    builder.writeBuffer(source.signature);
    builder.writeSlice(source.header);
    builder.writeAddress(source.debitor);
    builder.writeNumber(source.tontoTrustline);
    builder.writeNumber(source.tontoLink);
    return builder.build();
}

function dictValueParserCreateTrustlineV0R0(): DictionaryValue<CreateTrustlineV0R0> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCreateTrustlineV0R0(src)).endCell());
        },
        parse: (src) => {
            return loadCreateTrustlineV0R0(src.loadRef().beginParse());
        }
    }
}

export type WidthrawV0R0 = {
    $$type: 'WidthrawV0R0';
    value: bigint;
}

export function storeWidthrawV0R0(src: WidthrawV0R0) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3080826191, 32);
        b_0.storeCoins(src.value);
    };
}

export function loadWidthrawV0R0(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3080826191) { throw Error('Invalid prefix'); }
    let _value = sc_0.loadCoins();
    return { $$type: 'WidthrawV0R0' as const, value: _value };
}

function loadTupleWidthrawV0R0(source: TupleReader) {
    let _value = source.readBigNumber();
    return { $$type: 'WidthrawV0R0' as const, value: _value };
}

function storeTupleWidthrawV0R0(source: WidthrawV0R0) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.value);
    return builder.build();
}

function dictValueParserWidthrawV0R0(): DictionaryValue<WidthrawV0R0> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeWidthrawV0R0(src)).endCell());
        },
        parse: (src) => {
            return loadWidthrawV0R0(src.loadRef().beginParse());
        }
    }
}

export type TransferTonV0R0 = {
    $$type: 'TransferTonV0R0';
    signature: Buffer;
    header: Cell;
    to: Address;
    value: bigint;
    comment: string;
}

export function storeTransferTonV0R0(src: TransferTonV0R0) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(30619061, 32);
        b_0.storeBuffer(src.signature);
        b_0.storeRef(src.header);
        b_0.storeAddress(src.to);
        b_0.storeCoins(src.value);
        b_0.storeStringRefTail(src.comment);
    };
}

export function loadTransferTonV0R0(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 30619061) { throw Error('Invalid prefix'); }
    let _signature = sc_0.loadBuffer(64);
    let _header = sc_0.loadRef();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadCoins();
    let _comment = sc_0.loadStringRefTail();
    return { $$type: 'TransferTonV0R0' as const, signature: _signature, header: _header, to: _to, value: _value, comment: _comment };
}

function loadTupleTransferTonV0R0(source: TupleReader) {
    let _signature = source.readBuffer();
    let _header = source.readCell();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _comment = source.readString();
    return { $$type: 'TransferTonV0R0' as const, signature: _signature, header: _header, to: _to, value: _value, comment: _comment };
}

function storeTupleTransferTonV0R0(source: TransferTonV0R0) {
    let builder = new TupleBuilder();
    builder.writeBuffer(source.signature);
    builder.writeSlice(source.header);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeString(source.comment);
    return builder.build();
}

function dictValueParserTransferTonV0R0(): DictionaryValue<TransferTonV0R0> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTransferTonV0R0(src)).endCell());
        },
        parse: (src) => {
            return loadTransferTonV0R0(src.loadRef().beginParse());
        }
    }
}

export type TrustlineDataV0R0 = {
    $$type: 'TrustlineDataV0R0';
    value: bigint;
    limit: bigint;
    interest: bigint;
    interestProject: bigint;
    balance: bigint;
    seqno: bigint;
    creditor: Address;
    debitor: Address;
}

export function storeTrustlineDataV0R0(src: TrustlineDataV0R0) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(495701086, 32);
        b_0.storeCoins(src.value);
        b_0.storeCoins(src.limit);
        b_0.storeUint(src.interest, 16);
        b_0.storeUint(src.interestProject, 16);
        b_0.storeCoins(src.balance);
        b_0.storeUint(src.seqno, 32);
        b_0.storeAddress(src.creditor);
        b_0.storeAddress(src.debitor);
    };
}

export function loadTrustlineDataV0R0(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 495701086) { throw Error('Invalid prefix'); }
    let _value = sc_0.loadCoins();
    let _limit = sc_0.loadCoins();
    let _interest = sc_0.loadUintBig(16);
    let _interestProject = sc_0.loadUintBig(16);
    let _balance = sc_0.loadCoins();
    let _seqno = sc_0.loadUintBig(32);
    let _creditor = sc_0.loadAddress();
    let _debitor = sc_0.loadAddress();
    return { $$type: 'TrustlineDataV0R0' as const, value: _value, limit: _limit, interest: _interest, interestProject: _interestProject, balance: _balance, seqno: _seqno, creditor: _creditor, debitor: _debitor };
}

function loadTupleTrustlineDataV0R0(source: TupleReader) {
    let _value = source.readBigNumber();
    let _limit = source.readBigNumber();
    let _interest = source.readBigNumber();
    let _interestProject = source.readBigNumber();
    let _balance = source.readBigNumber();
    let _seqno = source.readBigNumber();
    let _creditor = source.readAddress();
    let _debitor = source.readAddress();
    return { $$type: 'TrustlineDataV0R0' as const, value: _value, limit: _limit, interest: _interest, interestProject: _interestProject, balance: _balance, seqno: _seqno, creditor: _creditor, debitor: _debitor };
}

function storeTupleTrustlineDataV0R0(source: TrustlineDataV0R0) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.value);
    builder.writeNumber(source.limit);
    builder.writeNumber(source.interest);
    builder.writeNumber(source.interestProject);
    builder.writeNumber(source.balance);
    builder.writeNumber(source.seqno);
    builder.writeAddress(source.creditor);
    builder.writeAddress(source.debitor);
    return builder.build();
}

function dictValueParserTrustlineDataV0R0(): DictionaryValue<TrustlineDataV0R0> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTrustlineDataV0R0(src)).endCell());
        },
        parse: (src) => {
            return loadTrustlineDataV0R0(src.loadRef().beginParse());
        }
    }
}

export type SetLimitV0R0 = {
    $$type: 'SetLimitV0R0';
    signature: Buffer;
    header: Cell;
    debitor: Address;
    limit: bigint;
    tontoTrustline: bigint;
}

export function storeSetLimitV0R0(src: SetLimitV0R0) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(278835899, 32);
        b_0.storeBuffer(src.signature);
        b_0.storeRef(src.header);
        b_0.storeAddress(src.debitor);
        b_0.storeCoins(src.limit);
        let b_1 = new Builder();
        b_1.storeCoins(src.tontoTrustline);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadSetLimitV0R0(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 278835899) { throw Error('Invalid prefix'); }
    let _signature = sc_0.loadBuffer(64);
    let _header = sc_0.loadRef();
    let _debitor = sc_0.loadAddress();
    let _limit = sc_0.loadCoins();
    let sc_1 = sc_0.loadRef().beginParse();
    let _tontoTrustline = sc_1.loadCoins();
    return { $$type: 'SetLimitV0R0' as const, signature: _signature, header: _header, debitor: _debitor, limit: _limit, tontoTrustline: _tontoTrustline };
}

function loadTupleSetLimitV0R0(source: TupleReader) {
    let _signature = source.readBuffer();
    let _header = source.readCell();
    let _debitor = source.readAddress();
    let _limit = source.readBigNumber();
    let _tontoTrustline = source.readBigNumber();
    return { $$type: 'SetLimitV0R0' as const, signature: _signature, header: _header, debitor: _debitor, limit: _limit, tontoTrustline: _tontoTrustline };
}

function storeTupleSetLimitV0R0(source: SetLimitV0R0) {
    let builder = new TupleBuilder();
    builder.writeBuffer(source.signature);
    builder.writeSlice(source.header);
    builder.writeAddress(source.debitor);
    builder.writeNumber(source.limit);
    builder.writeNumber(source.tontoTrustline);
    return builder.build();
}

function dictValueParserSetLimitV0R0(): DictionaryValue<SetLimitV0R0> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSetLimitV0R0(src)).endCell());
        },
        parse: (src) => {
            return loadSetLimitV0R0(src.loadRef().beginParse());
        }
    }
}

export type SetInterestProjectV0R0 = {
    $$type: 'SetInterestProjectV0R0';
    signature: Buffer;
    header: Cell;
    debitor: Address;
    interestProject: bigint;
    tontoTrustline: bigint;
}

export function storeSetInterestProjectV0R0(src: SetInterestProjectV0R0) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2143931209, 32);
        b_0.storeBuffer(src.signature);
        b_0.storeRef(src.header);
        b_0.storeAddress(src.debitor);
        b_0.storeUint(src.interestProject, 16);
        b_0.storeCoins(src.tontoTrustline);
    };
}

export function loadSetInterestProjectV0R0(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2143931209) { throw Error('Invalid prefix'); }
    let _signature = sc_0.loadBuffer(64);
    let _header = sc_0.loadRef();
    let _debitor = sc_0.loadAddress();
    let _interestProject = sc_0.loadUintBig(16);
    let _tontoTrustline = sc_0.loadCoins();
    return { $$type: 'SetInterestProjectV0R0' as const, signature: _signature, header: _header, debitor: _debitor, interestProject: _interestProject, tontoTrustline: _tontoTrustline };
}

function loadTupleSetInterestProjectV0R0(source: TupleReader) {
    let _signature = source.readBuffer();
    let _header = source.readCell();
    let _debitor = source.readAddress();
    let _interestProject = source.readBigNumber();
    let _tontoTrustline = source.readBigNumber();
    return { $$type: 'SetInterestProjectV0R0' as const, signature: _signature, header: _header, debitor: _debitor, interestProject: _interestProject, tontoTrustline: _tontoTrustline };
}

function storeTupleSetInterestProjectV0R0(source: SetInterestProjectV0R0) {
    let builder = new TupleBuilder();
    builder.writeBuffer(source.signature);
    builder.writeSlice(source.header);
    builder.writeAddress(source.debitor);
    builder.writeNumber(source.interestProject);
    builder.writeNumber(source.tontoTrustline);
    return builder.build();
}

function dictValueParserSetInterestProjectV0R0(): DictionaryValue<SetInterestProjectV0R0> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSetInterestProjectV0R0(src)).endCell());
        },
        parse: (src) => {
            return loadSetInterestProjectV0R0(src.loadRef().beginParse());
        }
    }
}

export type ConfirmInterestV0R0 = {
    $$type: 'ConfirmInterestV0R0';
    signature: Buffer;
    header: Cell;
    creditor: Address;
    interestProject: bigint;
    tontoTrustline: bigint;
}

export function storeConfirmInterestV0R0(src: ConfirmInterestV0R0) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(602046033, 32);
        b_0.storeBuffer(src.signature);
        b_0.storeRef(src.header);
        b_0.storeAddress(src.creditor);
        b_0.storeUint(src.interestProject, 16);
        b_0.storeCoins(src.tontoTrustline);
    };
}

export function loadConfirmInterestV0R0(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 602046033) { throw Error('Invalid prefix'); }
    let _signature = sc_0.loadBuffer(64);
    let _header = sc_0.loadRef();
    let _creditor = sc_0.loadAddress();
    let _interestProject = sc_0.loadUintBig(16);
    let _tontoTrustline = sc_0.loadCoins();
    return { $$type: 'ConfirmInterestV0R0' as const, signature: _signature, header: _header, creditor: _creditor, interestProject: _interestProject, tontoTrustline: _tontoTrustline };
}

function loadTupleConfirmInterestV0R0(source: TupleReader) {
    let _signature = source.readBuffer();
    let _header = source.readCell();
    let _creditor = source.readAddress();
    let _interestProject = source.readBigNumber();
    let _tontoTrustline = source.readBigNumber();
    return { $$type: 'ConfirmInterestV0R0' as const, signature: _signature, header: _header, creditor: _creditor, interestProject: _interestProject, tontoTrustline: _tontoTrustline };
}

function storeTupleConfirmInterestV0R0(source: ConfirmInterestV0R0) {
    let builder = new TupleBuilder();
    builder.writeBuffer(source.signature);
    builder.writeSlice(source.header);
    builder.writeAddress(source.creditor);
    builder.writeNumber(source.interestProject);
    builder.writeNumber(source.tontoTrustline);
    return builder.build();
}

function dictValueParserConfirmInterestV0R0(): DictionaryValue<ConfirmInterestV0R0> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeConfirmInterestV0R0(src)).endCell());
        },
        parse: (src) => {
            return loadConfirmInterestV0R0(src.loadRef().beginParse());
        }
    }
}

export type TransferMoneyV0R0 = {
    $$type: 'TransferMoneyV0R0';
    signature: Buffer;
    header: Cell;
    amount: bigint;
    onCredit: boolean;
    currentStep: bigint;
    countStep: bigint;
    path: Dictionary<number, Address>;
    tontoTrustline: bigint;
}

export function storeTransferMoneyV0R0(src: TransferMoneyV0R0) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2834895727, 32);
        b_0.storeBuffer(src.signature);
        b_0.storeRef(src.header);
        b_0.storeCoins(src.amount);
        b_0.storeBit(src.onCredit);
        b_0.storeUint(src.currentStep, 8);
        b_0.storeUint(src.countStep, 8);
        b_0.storeDict(src.path, Dictionary.Keys.Uint(8), Dictionary.Values.Address());
        b_0.storeCoins(src.tontoTrustline);
    };
}

export function loadTransferMoneyV0R0(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2834895727) { throw Error('Invalid prefix'); }
    let _signature = sc_0.loadBuffer(64);
    let _header = sc_0.loadRef();
    let _amount = sc_0.loadCoins();
    let _onCredit = sc_0.loadBit();
    let _currentStep = sc_0.loadUintBig(8);
    let _countStep = sc_0.loadUintBig(8);
    let _path = Dictionary.load(Dictionary.Keys.Uint(8), Dictionary.Values.Address(), sc_0);
    let _tontoTrustline = sc_0.loadCoins();
    return { $$type: 'TransferMoneyV0R0' as const, signature: _signature, header: _header, amount: _amount, onCredit: _onCredit, currentStep: _currentStep, countStep: _countStep, path: _path, tontoTrustline: _tontoTrustline };
}

function loadTupleTransferMoneyV0R0(source: TupleReader) {
    let _signature = source.readBuffer();
    let _header = source.readCell();
    let _amount = source.readBigNumber();
    let _onCredit = source.readBoolean();
    let _currentStep = source.readBigNumber();
    let _countStep = source.readBigNumber();
    let _path = Dictionary.loadDirect(Dictionary.Keys.Uint(8), Dictionary.Values.Address(), source.readCellOpt());
    let _tontoTrustline = source.readBigNumber();
    return { $$type: 'TransferMoneyV0R0' as const, signature: _signature, header: _header, amount: _amount, onCredit: _onCredit, currentStep: _currentStep, countStep: _countStep, path: _path, tontoTrustline: _tontoTrustline };
}

function storeTupleTransferMoneyV0R0(source: TransferMoneyV0R0) {
    let builder = new TupleBuilder();
    builder.writeBuffer(source.signature);
    builder.writeSlice(source.header);
    builder.writeNumber(source.amount);
    builder.writeBoolean(source.onCredit);
    builder.writeNumber(source.currentStep);
    builder.writeNumber(source.countStep);
    builder.writeCell(source.path.size > 0 ? beginCell().storeDictDirect(source.path, Dictionary.Keys.Uint(8), Dictionary.Values.Address()).endCell() : null);
    builder.writeNumber(source.tontoTrustline);
    return builder.build();
}

function dictValueParserTransferMoneyV0R0(): DictionaryValue<TransferMoneyV0R0> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTransferMoneyV0R0(src)).endCell());
        },
        parse: (src) => {
            return loadTransferMoneyV0R0(src.loadRef().beginParse());
        }
    }
}

 type LetsLinkV0R0_init_args = {
    $$type: 'LetsLinkV0R0_init_args';
    linkId: bigint;
    currency: string;
}

function initLetsLinkV0R0_init_args(src: LetsLinkV0R0_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.linkId, 257);
        b_0.storeStringRefTail(src.currency);
    };
}

async function LetsLinkV0R0_init(linkId: bigint, currency: string) {
    const __code = Cell.fromBase64('te6ccgECGgEABYsAART/APSkE/S88sgLAQIBYgIDA5rQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVFNs88uCCyPhDAcx/AcoAVUDbPMntVBMEBQIBWA8QAuABkjB/4HAh10nCH5UwINcLH94gwAAi10nBIbCOFVuCAN1f+EJSMCFukltwkscF4vL0f+AgghCLtkZ3uuMCghCUapi2uo6n0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/4DBwBgcBwshQBc8WyVAFzBLLPwEgbpUwcAHLAY4eINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W4lggbpUwcAHLAY4eINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W4gEOAaYw0x8BghCLtkZ3uvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBJsEts8fwgBOm1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQI9s8DAO0bCIy+EMk2zwBgSZgAnBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCI+ELHBfL0+ENTEts8CQoLAMwB0PQEMG0hggCtPAGAEPQPb6Hy4IcBggCtPCICgBD0FyKCAMQWAYAQ9A9vofLgh4IAxBYBAoAQ9BcCgUlCAYAQ9A9vofLghxKBSUIBAoAQ9BfIAcj0AMkBzHABygBYyAHPFskBzMkA1gLQ9AQwbQGBSUIBgBD0D2+h8uCHAYFJQiICgBD0F8gByPQAyQHMcAHKAEADWSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJAIRwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAIByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsADQCYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzABSIG6VMHABywGOHiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFuICASAREgIBSBgZAhG07Ftnm2eNipATFACVt3owTgudh6ullc9j0J2HOslQo2zQThO6xqWlbI+WZFp15b++LEcwTgQKuANwDOxymcsHVcjktlhwThOy6ctWadluZ0HSzbKM3RSQAlTtRNDUAfhj0gABjoTbPGwV4Pgo1wsKgwm68uCJgQEB1wDUAdASAtEB2zwVFgAO+CdvEFRzIQG81AHQAdM/+kAh1wsBwwCOHQEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIkjFt4gH6QCHXCwHDAI4dASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiSMW3iARcACAFtbW0AXvpAIdcLAcMAjh0BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJIxbeIVFEMwABGwr7tRNDSAAGAAdbJu40NWlwZnM6Ly9RbVlvTmRCYzhmRm9FMTVTSkhqNHpiaUxlb1lnRzc0TEVkdDhYeFpDdDJhRVV3gg');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initLetsLinkV0R0_init_args({ $$type: 'LetsLinkV0R0_init_args', linkId, currency })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const LetsLinkV0R0_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    3708: { message: `Error: incorrest interest rate project` },
    4328: { message: `Error: Sponsor no set` },
    6882: { message: `Error: Sponsor already exist` },
    9824: { message: `Error: Only LetsHubV0R0 can set trustline address` },
    11316: { message: `Error: first node in path must wallet` },
    12274: { message: `Error: timeout expired` },
    12569: { message: `Error: path is ring` },
    14378: { message: `Error: contract not active` },
    28134: { message: `Error: only creditor can set limit or incorrect debitor address` },
    31375: { message: `Error: only debitor can confirm interest or incorrect creditor address` },
    41102: { message: `Error: amount must be greater than zero` },
    42571: { message: `Error: only creditor can set interest rate project or incorrect debitor address` },
    44581: { message: `Error: Only creditor can funds wallet` },
    45238: { message: `Error: Invalid signature` },
    46605: { message: `Error: you cannot send money while the wallet has a sponsor` },
    47294: { message: `Error: not enough funds to create` },
    52626: { message: `Error: contract is not active` },
    53292: { message: `Error: only creditor can create LetsTrustlineV0R0` },
    54122: { message: `Error: accrual of interest on the loan no more than once a day` },
    54295: { message: `Error: only creditor can accrual of interest` },
    56057: { message: `Error: Invalid seqno` },
    56671: { message: `Error: Only owner wallet can send empty message` },
    58118: { message: `Error: only creditor can make link` },
    59146: { message: `Error: Only sponsor can widthraw funds` },
}

const LetsLinkV0R0_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"LinkDataV0R0","header":439893354,"fields":[{"name":"balance","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"trustline","type":{"kind":"simple","type":"address","optional":true}},{"name":"creditor","type":{"kind":"simple","type":"address","optional":true}},{"name":"debitor","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"HubDataV0R0","header":1077706281,"fields":[{"name":"balance","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"linkId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"SetContentWalletDataV0R0","header":2049656789,"fields":[{"name":"signature","type":{"kind":"simple","type":"fixed-bytes","optional":false,"format":64}},{"name":"header","type":{"kind":"simple","type":"slice","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"WalletDataV0R0","header":2168594967,"fields":[{"name":"publickeyOwner","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"publickeySponsor","type":{"kind":"simple","type":"uint","optional":true,"format":256}},{"name":"currency","type":{"kind":"simple","type":"string","optional":false}},{"name":"addressSponsor","type":{"kind":"simple","type":"address","optional":true}},{"name":"balance","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"content","type":{"kind":"simple","type":"cell","optional":true}},{"name":"seqno","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"SetTrustlineV0R0","header":2343978615,"fields":[{"name":"creditor","type":{"kind":"simple","type":"address","optional":false}},{"name":"debitor","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SetSponsorV0R0","header":1298576143,"fields":[{"name":"signature","type":{"kind":"simple","type":"fixed-bytes","optional":false,"format":64}},{"name":"header","type":{"kind":"simple","type":"slice","optional":false}},{"name":"address","type":{"kind":"simple","type":"address","optional":true}},{"name":"publicKey","type":{"kind":"simple","type":"uint","optional":true,"format":256}}]},
    {"name":"CancelSponsorV0R0","header":2350373647,"fields":[{"name":"signature","type":{"kind":"simple","type":"fixed-bytes","optional":false,"format":64}},{"name":"header","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"CreateTrustlineV0R0","header":3098573636,"fields":[{"name":"signature","type":{"kind":"simple","type":"fixed-bytes","optional":false,"format":64}},{"name":"header","type":{"kind":"simple","type":"slice","optional":false}},{"name":"debitor","type":{"kind":"simple","type":"address","optional":false}},{"name":"tontoTrustline","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tontoLink","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"WidthrawV0R0","header":3080826191,"fields":[{"name":"value","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"TransferTonV0R0","header":30619061,"fields":[{"name":"signature","type":{"kind":"simple","type":"fixed-bytes","optional":false,"format":64}},{"name":"header","type":{"kind":"simple","type":"slice","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"comment","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"TrustlineDataV0R0","header":495701086,"fields":[{"name":"value","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"limit","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"interest","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"interestProject","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"balance","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"seqno","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"creditor","type":{"kind":"simple","type":"address","optional":false}},{"name":"debitor","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SetLimitV0R0","header":278835899,"fields":[{"name":"signature","type":{"kind":"simple","type":"fixed-bytes","optional":false,"format":64}},{"name":"header","type":{"kind":"simple","type":"slice","optional":false}},{"name":"debitor","type":{"kind":"simple","type":"address","optional":false}},{"name":"limit","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tontoTrustline","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"SetInterestProjectV0R0","header":2143931209,"fields":[{"name":"signature","type":{"kind":"simple","type":"fixed-bytes","optional":false,"format":64}},{"name":"header","type":{"kind":"simple","type":"slice","optional":false}},{"name":"debitor","type":{"kind":"simple","type":"address","optional":false}},{"name":"interestProject","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"tontoTrustline","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"ConfirmInterestV0R0","header":602046033,"fields":[{"name":"signature","type":{"kind":"simple","type":"fixed-bytes","optional":false,"format":64}},{"name":"header","type":{"kind":"simple","type":"slice","optional":false}},{"name":"creditor","type":{"kind":"simple","type":"address","optional":false}},{"name":"interestProject","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"tontoTrustline","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"TransferMoneyV0R0","header":2834895727,"fields":[{"name":"signature","type":{"kind":"simple","type":"fixed-bytes","optional":false,"format":64}},{"name":"header","type":{"kind":"simple","type":"slice","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"onCredit","type":{"kind":"simple","type":"bool","optional":false}},{"name":"currentStep","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"countStep","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"path","type":{"kind":"dict","key":"uint","keyFormat":8,"value":"address"}},{"name":"tontoTrustline","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
]

const LetsLinkV0R0_getters: ABIGetter[] = [
    {"name":"data","arguments":[],"returnType":{"kind":"simple","type":"LinkDataV0R0","optional":false}},
]

const LetsLinkV0R0_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetTrustlineV0R0"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class LetsLinkV0R0 implements Contract {
    
    static async init(linkId: bigint, currency: string) {
        return await LetsLinkV0R0_init(linkId, currency);
    }
    
    static async fromInit(linkId: bigint, currency: string) {
        const init = await LetsLinkV0R0_init(linkId, currency);
        const address = contractAddress(0, init);
        return new LetsLinkV0R0(address, init);
    }
    
    static fromAddress(address: Address) {
        return new LetsLinkV0R0(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  LetsLinkV0R0_types,
        getters: LetsLinkV0R0_getters,
        receivers: LetsLinkV0R0_receivers,
        errors: LetsLinkV0R0_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | SetTrustlineV0R0 | Deploy) {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetTrustlineV0R0') {
            body = beginCell().store(storeSetTrustlineV0R0(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getData(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('data', builder.build())).stack;
        const result = loadTupleLinkDataV0R0(source);
        return result;
    }
    
}
import Web3 from 'web3';
import { GeneralFunctions, ISpecialTx, ISearchLog } from '@energyweb/utils-general';
import MarketContractLookupJSON from '../../build/contracts/lightweight/MarketContractLookup.json';

export class MarketContractLookup extends GeneralFunctions {
    web3: Web3;

    buildFile = MarketContractLookupJSON;

    constructor(web3: Web3, address?: string) {
        super(
            address
                ? new web3.eth.Contract(MarketContractLookupJSON.abi, address)
                : new web3.eth.Contract(
                      MarketContractLookupJSON.abi,
                      (MarketContractLookupJSON as any).networks.length > 0
                          ? (MarketContractLookupJSON as any).networks[0]
                          : null
                  )
        );
        this.web3 = web3;
    }

    async getAllLogChangeOwnerEvents(eventFilter?: ISearchLog) {
        return this.web3Contract.getPastEvents('LogChangeOwner', eventFilter);
    }

    async getAllEvents(eventFilter?: ISearchLog) {
        return this.web3Contract.getPastEvents('allEvents', eventFilter);
    }

    async marketLogicRegistry(txParams?: ISpecialTx) {
        return this.web3Contract.methods.marketLogicRegistry().call(txParams);
    }

    async init(
        _assetRegistry: string,
        _originRegistry: string,
        _marketLogicRegistry: string,
        _marketDB: string,
        txParams?: ISpecialTx
    ) {
        const method = this.web3Contract.methods.init(
            _assetRegistry,
            _originRegistry,
            _marketLogicRegistry,
            _marketDB
        );

        return this.send(method, txParams);
    }

    async update(_marketRegistry: string, txParams?: ISpecialTx) {
        const method = this.web3Contract.methods.update(_marketRegistry);

        return this.send(method, txParams);
    }

    async assetContractLookupContract(txParams?: ISpecialTx) {
        return this.web3Contract.methods.assetContractLookupContract().call(txParams);
    }

    async assetContractLookup(txParams?: ISpecialTx) {
        return this.web3Contract.methods.assetContractLookup().call(txParams);
    }

    async originContractLookup(txParams?: ISpecialTx) {
        return this.web3Contract.methods.originContractLookup().call(txParams);
    }

    async owner(txParams?: ISpecialTx) {
        return this.web3Contract.methods.owner().call(txParams);
    }

    async changeOwner(_newOwner: string, txParams?: ISpecialTx) {
        const method = this.web3Contract.methods.changeOwner(_newOwner);

        return this.send(method, txParams);
    }
}

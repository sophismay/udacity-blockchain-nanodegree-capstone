# Udacity Blockchain Capstone

Smart contracts for a decentralized housing product. This is deployed with a ZK integration for verification before minting ERC721 tokens.

# Getting Started

## Prerequisites

This project was developed and tested using [truffle](https://www.npmjs.com/package/truffle) and truffle [ganache](https://www.trufflesuite.com/ganache).

`npm install -g truffle`

## Installing Dependencies

`npm install` in root folder of project.

## Local Development

### Compiling

`truffle compile`

### Migration

`truffle migrate`

### Testing

`truffle test`

## Deploying to Rinkeby

### Environmental Variables

`.env` file should have the following:
```bash
    HOST=XXXXXX // full infura host (also, POKT or other host)
    PK=XXXX // private key of wallet
    MNEMONIC=XXXX // mnemonic of wallet

```

### Deployment
`truffle compile` <br>
`truffle migrate --reset --network rinkeby`

## Running Zokrates and generating verification
- `docker run -v <path to your project folder>:/home/zokrates/code -ti zokrates/zokrates /bin/bash`
- compile program `zokrates compile -i square.code`
- generate trusted setup `zokrates setup`
- compute witness `zokrates compute-witness -a 3 9`
- generate proof `zokrates generate-proof`
- export verifier `zokrates export-verifier`
- copy `verifier.sol` to contracts
<br>
** key files are removed from git versioning **

## Minting tokens
Run `node mint-tokens.js`


## Contracts & Transactions

### SolnSquareVerifier Contract Address
`0x1a5cc302bbc322927e1cf84864f56688cbbbc7c9`

### Contract creation Transaction Hash
[Created at](https://rinkeby.etherscan.io/tx/0xc536b9a6a4ae7bdee0ec47c5e647b65af8b56f5097f889be2d12314dc3826814)

### One of 10 Token Mint Transactions
- [1](https://rinkeby.etherscan.io/tx/0xe9385f926a7747e32c500ffdc59ff82e649828c35e4f92a01133b9bfabd952b3)

### Sale transactions (from buyer)
- [1](https://rinkeby.etherscan.io/tx/0xe115b7b8e1e4d18f8f01d59198c6a9d2dec45a4adb8b77c314e60f3638544556)
- [2](https://rinkeby.etherscan.io/tx/0x1ac42bd00f51b94e8742205841c5cd49ac7dd68ef13e0659cb6e4aec1b8f6d25)
- [3](https://rinkeby.etherscan.io/tx/0xabae2843194d51bf8c80281e4aa4a8f1f26f43e30353dc7499940e7dfbdc6d9d)
- [4](https://rinkeby.etherscan.io/tx/0x7c3b1811400db5c164cecabde7d1dea9233ab5a55cc9bf1c40cad3eb742259b9)
- [5](https://rinkeby.etherscan.io/tx/0x0c5636e3cf081b21e18cd5a38da57d03a51c65ff1bafc140b1ea2900f96e61d3)


# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)

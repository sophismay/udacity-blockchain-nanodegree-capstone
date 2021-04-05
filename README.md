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
"""
bash(
    HOST=XXXXXX // infura, POKT or other host
    PK=XXXX // private key of wallet
    MNEMONIC=XXXX // mnemonic of wallet
)
"""

### Deployment
`truffle compile`
`truffle migrate --reset --network rinkeby`


## Contracts & Transactions

### Contract
`0x1F66257561De32eb714D8acAc3E4B74E495e8F7B`

### Contract creation Transaction Hash
`0xea4ab50adae7a9b743c9e7ed6d5db61fa241af7284a0248960b7d341494da5a6`

### Token Mint Transaction Hash
`0xd5177556d3532516b5ca86d714ca2f64d62f2c318d1487089f5ea9381ef77d7e`



# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)

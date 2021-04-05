require('dotenv').config();
const ethers = require('ethers');
const fs = require('fs');
const SolnSquareInterface = JSON.parse(fs.readFileSync('./build/contracts/SolnSquareVerifier.json'));
const provider = new ethers.providers.JsonRpcProvider(process.env.HOST);
const PK = process.env.PK;
const wallet = new ethers.Wallet(PK, provider);
const walletTwo = new ethers.Wallet.fromMnemonic(process.env.MNEMONIC, `m/44'/60'/0'/0/2`); // 3rd wallet

const contractAddress = "0x1F66257561De32eb714D8acAc3E4B74E495e8F7B"; //"0x710b83E3934419104Bab1169293994d1b26B72f8";
const SolnSquareContract = new ethers.Contract(contractAddress, SolnSquareInterface.abi, wallet);

// mint 10 tokens with owner account
const Proof = require("../zokrates/code/square/proof.json");
const main = async () => {
    let tokenId = 1;
    const inputs = Proof.inputs;
    const proof_values = Object.values(Proof.proof);
    for (let i=0; i<10; i++) {
        let name = await SolnSquareContract.tokenName.call();
        console.log(name);
        let next = wallet.address;
        try {
            let tx = await SolnSquareContract
                                .mint(
                                    next,
                                    tokenId,
                                    { from: wallet.address, gasLimit: 6000000 }
                                );
            await tx.wait();
            console.log(tx);
            // rotate receivers of tokens
            next = next == wallet.address ? walletTwo.address : wallet.address;
        } catch (e) {
            throw Error(`Error minting token ${tokenId} ${e}`)
        }
        
        tokenId += 1;
    }
}

main().then(console.log).catch(console.error);
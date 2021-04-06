require('dotenv').config();
const ethers = require('ethers');
const fs = require('fs');
const SolnSquareInterface = JSON.parse(fs.readFileSync('./build/contracts/SolnSquareVerifier.json'));
const provider = new ethers.providers.JsonRpcProvider(process.env.HOST);
const PK = process.env.PK;
const wallet = new ethers.Wallet(PK, provider);
const walletTwo = new ethers.Wallet.fromMnemonic(process.env.MNEMONIC, `m/44'/60'/0'/0/2`); // 3rd wallet

const contractAddress = "0x1a5cc302bbc322927e1cf84864f56688cbbbc7c9"; //"0x2F6c13Fa336C09f05E8011cef9806228d1451898";
const SolnSquareContract = new ethers.Contract(contractAddress, SolnSquareInterface.abi, wallet);

// mint 10 tokens with owner account
const Proof = require("../zokrates/code/square/proof.json");
const main = async () => {
    const inputs = Proof.inputs;
    const proof_values = Object.values(Proof.proof);
    //let nextId = await SolnSquareContract.totalSupply.call();
    //nextId += 1;
    let nextId = 1;
    for (let i=0; i<10; i++) {
        let name = await SolnSquareContract.name.call();
        console.log(name);
        let next = wallet.address;
        try {
            let tx = await SolnSquareContract
                                    .mintOne(
                                        wallet.address,
                                        nextId,
                                        proof_values[0],
                                        proof_values[1],
                                        proof_values[2],
                                        inputs,
                                        { from: wallet.address, gasLimit: 6000000 },
                                    )
            await tx.wait();
            console.log(tx);
            // rotate receivers of tokens
            next = next == wallet.address ? walletTwo.address : wallet.address;
        } catch (e) {
            throw Error(`Error minting token ${tokenId} ${e}`)
        }
        nextId += 1;
    }
}

main().then(console.log).catch(console.error);
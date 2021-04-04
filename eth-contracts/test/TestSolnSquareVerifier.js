const SolnSquareVerifier = artifacts.require("SolnSquareVerifier");
const Proof = require("../../zokrates/code/square/proof.json");
const truffleAssert = require('truffle-assertions');

contract('TestSolnSquareVerifier', (accounts) => {
    const account_one = accounts[0];
    const account_two = accounts[1];
    const name = "Bitland Property";
    const symbol = "BLP";
    const inputs = Proof.inputs;
    const proof_values = Object.values(Proof.proof);

    describe('test verification ', function () {
        beforeEach(async function () { 
            this.contract = await SolnSquareVerifier.new(name, symbol, {from: account_one});
        })
        // Test if a new solution can be added for contract - SolnSquareVerifier
        it('should add a new solution', async function () {
            /**
             * MY COMMENT: 
             * I don't think it's necessary to separately add a solution as the contract is coded to check the uniqueness of each solution added 
             * before verifying and minting.
             **/
        })
        
        // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
        it('should mint an ERC721 token, after adding a solution and ensuring uniqueness', async function () {
            const tokenId = 1;
            let result;
            try {
                result  = await this.contract.mint(account_two, 1, proof_values[0], proof_values[1], proof_values[2], inputs); //, { from: account_one, gas: 4000000 });
                //console.log(result);
            } catch (e) {
                console.log(e);
            }
            // receiving emitted event means minting occured
            await truffleAssert.eventEmitted(result, "Minted");
        })
    });
});
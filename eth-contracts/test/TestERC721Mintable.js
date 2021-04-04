var ERC721MintableComplete = artifacts.require('BitlandProperty');  //artifacts.require('ERC721MintableComplete');
var BigNumber = require('bignumber.js');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];

    const name = "Bitland Property";
    const symbol = "BLP";
    const uri = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/";
    let id = 0;

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new(name, symbol, {from: account_one});
            
            // TODO: mint multiple tokens
            let result = await this.contract.mint(account_two, id++, uri, { from: account_one, gas: 400000 });
            await this.contract.mint(account_two, id++, uri, { from: account_one, gas: 400000 });
            await this.contract.mint(account_two, id++, uri, { from: account_one, gas: 400000 });
            await this.contract.mint(account_two, id++, uri, { from: account_one, gas: 400000 });
            await this.contract.mint(account_two, id++, uri, { from: account_one, gas: 400000 });
            await this.contract.mint(account_two, id++, uri, { from: account_one, gas: 400000 });
            await this.contract.mint(account_two, id++, uri, { from: account_one, gas: 400000 });
            await this.contract.mint(account_two, id++, uri, { from: account_one, gas: 400000 });
            await this.contract.mint(account_two, id++, uri, { from: account_one, gas: 400000 });
            await this.contract.mint(account_three, id++, uri, { from: account_one, gas: 400000 });
            await this.contract.mint(account_three, id++, uri, { from: account_one, gas: 400000 });
        })

        it('should return total supply', async function () { 
            let result = await this.contract.totalSupply.call();
            assert.equal(parseInt(result), id, "Wrong total supply");
        })

        it('should get token balance', async function () { 
            let result_1 = await this.contract.balanceOf.call(account_two);
            let result_2 = await this.contract.balanceOf.call(account_three);

            assert.equal(result_1, 9, "Wrong balance of address 2");
            assert.equal(result_2, 2, "Wrong balance of address 3");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            const base_uri = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/";
            const test_id = id-4;
            const full_uri = `${base_uri}${test_id}`;
            let result;
            try {
                result = await this.contract.tokenURI.call(test_id);
            } catch (e) {
                console.log(e);
            }
            
            assert.equal(result, full_uri, "Invalid complete uri");
        })

        it('should transfer token from one owner to another', async function () { 
            const owner_1 = account_two;
            const owner_2 = account_three;
            const tokenId = 43;
            // approve to be able to transfer token
            await this.contract.approve(owner_2, tokenId, { from: account_one, gas: 3400000 });
            await this.contract.transferFrom(owner_2, owner_1, tokenId, { from: owner_2, gas: 3000000 });
            // check new owner
            const newOwner = await this.contract.ownerOf.call(tokenId);
            assert.equal(owner_1, newOwner, "Invalid owner");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new(name, symbol, { from: account_one });
        })

        it('should fail when minting when address is not contract owner', async function () { 
            let error;
            try {
                await this.contract.mint(account_two, id++, "http://www.uri.com", { from: account_two, gas: 400000 });
            } catch(e) {
                //console.log(e);
                error = e;
            }
            assert.notEqual(error, null, "Only contract owner can mint token");
            
        })

        it('should return contract owner', async function () {
            const owner = account_one;
            let result = await this.contract.getOwner.call();
            assert.equal(result, owner, "Invalid owner");
        })

    });
})
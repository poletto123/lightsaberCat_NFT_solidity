const lightsaberCat = artifacts.require("LightsaberCat");
const truffleAssert = require('truffle-assertions');

contract("lighsaberCat", (accounts) => {
    it ("should credit a NFT to a specific account", async () => {
        const lightsaberCatInstance = await lightsaberCat.deployed();
        let txResult = await lightsaberCatInstance.safeMint(accounts[0], "LightsaberCat.json");
        
        truffleAssert.eventEmitted(txResult, 'Transfer',
            {from: '0x0000000000000000000000000000000000000000',
            to: accounts[0],
            tokenId: web3.utils.toBN("0")  
        });

        // Assertion via Chai
        assert.equal(accounts[0], await lightsaberCatInstance.ownerOf(0), "Owner of token is not correct");
        assert.equal(txResult.logs[0].event, "Transfer", "Transfer event didn't happen");
        assert.equal(txResult.logs[0].args.from, '0x0000000000000000000000000000000000000000', "Token was not sent from zero address");
        assert.equal(txResult.logs[0].args.to, accounts[0], "Wrong address for receiver");
        assert.equal(txResult.logs[0].args.tokenId.toString(), "0", "Wrong tokenID");
    })
});
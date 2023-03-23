const { expect } = require("chai");
const hre = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("LightsaberCat", function() {
    async function deployLightsaberCatAndMintTokenFixture() {
        const LightsaberCat = await hre.ethers.getContractFactory("LightsaberCat");
        const lightsaberCatInstance = await LightsaberCat.deploy();
        const [owner, secondAccount] = await hre.ethers.getSigners();
        await lightsaberCatInstance.safeMint(secondAccount.address, "LightsaberCat.json");
        return { lightsaberCatInstance };
    }

    it("mint a token", async function() {
        const {lightsaberCatInstance } = await loadFixture(deployLightsaberCatAndMintTokenFixture);

        const [owner, secondAccount] = await hre.ethers.getSigners();
        await lightsaberCatInstance.safeMint(secondAccount.address, "LightsaberCat.json");

        expect(await lightsaberCatInstance.ownerOf(0)).to.equal(secondAccount.address);
    });

    it("fails when transferring from incorrect address", async function () {
        const {lightsaberCatInstance } = await loadFixture(deployLightsaberCatAndMintTokenFixture);
        
        const [owner, nftOwnerAccount, notNftOwnerAccount] = await hre.ethers.getSigners();
        await lightsaberCatInstance.safeMint(nftOwnerAccount.address, "LightsaberCat.json");

        expect(await lightsaberCatInstance.ownerOf(0)).to.equal(nftOwnerAccount.address);
        await expect(lightsaberCatInstance
            .connect(notNftOwnerAccount)
            .transferFrom(nftOwnerAccount.address, notNftOwnerAccount.address, 0))
            .to.be.revertedWith("ERC721: caller is not token owner or approved")
    })
})
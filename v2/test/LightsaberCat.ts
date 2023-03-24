const { ethers } = require("hardhat");
const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("LightsaberCat", function() {
    async function deployLightsaberCatAndEnablePublicMinting() {
        const LightsaberCat = await ethers.getContractFactory("LightsaberCat");
        const lscat = await LightsaberCat.deploy();
        const mintPrice = lscat.mintPrice;
        await lscat.setPublicMintAllowed(true);
        return { lscat, mintPrice };
        
    }

    it("mints a token", async function() {
        const { lscat } = await loadFixture(deployLightsaberCatAndEnablePublicMinting);
        const mintPrice = await lscat.mintPrice();
        const [owner] = await ethers.getSigners();
        await lscat.mint(1, "1.json", { value: (mintPrice * 1).toString() });
        expect(await lscat.tokenURI(1)).to.have.string("1.json");
        expect(await lscat.ownerOf(1)).to.equal(owner.address);
    })

    it("fails to mint if publicMint is not allowed", async function() {
        const { lscat } = await loadFixture(deployLightsaberCatAndEnablePublicMinting);
        await lscat.setPublicMintAllowed(false);
        await expect(lscat.mint(1, "1.json")).to.be.revertedWith("Public minting not allowed");
    })

    


})
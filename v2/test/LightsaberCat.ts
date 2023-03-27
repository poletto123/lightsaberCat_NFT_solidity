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

    it("allows for the owner to withdraw funds after a token mint", async function() {
        const { lscat } = await loadFixture(deployLightsaberCatAndEnablePublicMinting);
        const [owner, secondAccount] = await ethers.getSigners();

        const mintPrice = await lscat.mintPrice();
        await lscat.mint(1, "1.json", { value: (mintPrice * 1).toString() });
        const balanceBefore = await ethers.provider.getBalance(secondAccount.address);
        await lscat.withdraw(secondAccount.address);
        expect(await ethers.provider.getBalance(secondAccount.address)).to.equal(balanceBefore.add(mintPrice).toString());
    })

    it("doesn't allow for a account that is not owner to withdraw funds after token mint", async function() {
        const { lscat } = await loadFixture(deployLightsaberCatAndEnablePublicMinting);
        const [owner, notOwner] = await ethers.getSigners();

        const mintPrice = await lscat.mintPrice();
        await lscat.mint(1, "1.json", { value: (mintPrice * 1).toString() });
        await expect(lscat.connect(notOwner).withdraw(notOwner.address)).to.be.revertedWith("Ownable: caller is not the owner");
    })



})
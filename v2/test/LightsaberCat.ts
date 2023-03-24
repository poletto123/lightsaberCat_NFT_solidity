const { ethers } = require("hardhat");
const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("LightsaberCat", function() {
    async function deployLightsaberCatAndMintTokenFixture() {
        const LightsaberCat = await ethers.getContractFactory("LightsaberCat");
        const lightsaberCatInstance = await LightsaberCat.deploy();
        const [owner, secondAccount] = await ethers.getSigners();
        await lightsaberCatInstance.mint(secondAccount.address, "LightsaberCat_1.json");
    }
})
(async () => {
    try {
        const lightsaberCat = await hre.ethers.getContractFactory("LightsaberCat");
        const lightsaberCatInstance = await lightsaberCat.deploy();
        await lightsaberCatInstance.deployed();

        console.log(`Deployed contract at ${lightsaberCatInstance.address}`);
    } catch (err) {
        console.error(err);
        process.exitCode = 1;
    }
})();
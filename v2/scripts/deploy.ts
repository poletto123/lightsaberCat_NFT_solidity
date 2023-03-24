async function main() {
    const LightsaberCat = await ethers.getContractFactory("LightsaberCat");
    const lscat = await LightsaberCat.deploy();
    console.log("Token address: ", lscat.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
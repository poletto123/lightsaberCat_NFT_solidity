const lightsaberCat = artifacts.require("LightsaberCat");

module.exports = function(deployer) {
    deployer.deploy(lightsaberCat);
}
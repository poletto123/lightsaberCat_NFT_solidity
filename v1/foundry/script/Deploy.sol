pragma solidity ^0.8.9;

import "forge-std/Script.sol";
import "../src/LightsaberCat.sol";

contract LightsaberCatScript is Script {
    function setUp() public {}

    function run() public {
        string memory seedPhrase = vm.readFile(".secret");
        uint256 privateKey = vm.deriveKey(seedPhrase, 0);
        vm.startBroadcast(privateKey);
        LightsaberCat lightsaberCat = new LightsaberCat();
        vm.stopBroadcast();
    }
}
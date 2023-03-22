pragma solidity ^0.8.9;

import "forge-std/Test.sol";
import "../src/LightsaberCat.sol";

contract LightsaberCatTest is Test {
    LightsaberCat lightsaberCat;

    function setUp() public {
        lightsaberCat = new LightsaberCat();
    }

    function testNameIsLightsaberCat() public {
        assertEq(lightsaberCat.name(), "LightsaberCat");
    }

    function testMintNFT() public {
        lightsaberCat.safeMint(msg.sender, "LightsaberCat.json");
        assertEq(lightsaberCat.ownerOf(0), msg.sender);
        assertEq(lightsaberCat.tokenURI(0), "LightsaberCat.json");
    }

    function testMintWithWrongOwner() public {
        vm.startPrank(address(0x1));
        vm.expectRevert("Ownable: caller is not the owner");
        lightsaberCat.safeMint(address(0x1), "LightsaberCat.json");
        vm.stopPrank();
    }


}

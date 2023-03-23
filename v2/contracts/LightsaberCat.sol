//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LightsaberCat is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    uint16 public maxSupply;
    uint8 public maxPerWallet;
    uint256 public mintPrice;
    bool public isPublicMintAllowed;
    Counters.Counter public tokenIdCounter;
    mapping(address => uint8) public walletMints;

    constructor() ERC721("LightsaberCat", "LSCAT") {
        mintPrice = 0.02 ether;
        maxSupply = 1000;
        maxPerWallet = 3;
    }

    function mint(uint8 quantity, string memory uri) public payable{
        uint256 tokenId = tokenIdCounter.current();
        require(isPublicMintAllowed, "Public minting not allowed");
        require(tokenIdCounter.current() <= maxSupply, "Sorry, max supply of tokens was reached");
        require(walletMints[msg.sender] < maxPerWallet, "Sorry, you already minted the maximum of ${maxPerWallet} tokens");
        require(quantity * mintPrice == msg.value, "Wrong mint amount");
        
        for (uint8 i = 0; i <= quantity; i++) {
            tokenIdCounter.increment();
            tokenId = tokenIdCounter.current();
            _safeMint(msg.sender, tokenId);
            _setTokenURI(tokenId, uri);
        }
    }

    function withdraw(address payable to) external onlyOwner {
        (bool success, ) = to.call{value: address(this).balance}('');
        require(success, "Withdraw has failed");
    }

    function setPublicMintAllowed(bool isItAllowed) external onlyOwner {
        isPublicMintAllowed = isItAllowed;
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }


}
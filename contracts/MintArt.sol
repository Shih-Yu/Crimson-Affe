//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;

// utilities / functions imported for use
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "hardhat/console.sol";


contract MintArt is ERC721URIStorage{
  using Counters for Counters.Counter;
  Counters.Counter private _nftId;
  address affeContractAderess;
  address owner;
  

  constructor(address _affeContractAddress) ERC721("AffeCoin", "AFC") {
    affeContractAddress = _affeContractAddress;
    owner = msg.sender; // assign the address that deployed this contract
  }
  function createNFT(string memory tokenUri) public returns(uint) {
    _nftId.increment();

    uint updatednftId = _nftId.current();
    _mint(owner, updatednftId); // 2 parameters address and a id
    _setTokenURI(updatednftId, tokenUri);
    
    return updatednftId;
  }
}

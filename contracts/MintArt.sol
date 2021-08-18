//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;

// Using _mint()form ERC721
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// Using _setTokenURI() from ERC721RUIStorage 
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// Using Counters for incrementing ID and getting current Id
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";


contract MintArt is ERC721URIStorage{
  // Calling Counter utility
  using Counters for Counters.Counter;
  // Assigning _nftId as a Counter type variable
  Counters.Counter private _nftId;
  // Declaring marketplace contract address
  address affeContractAddress;
  // Declaring owner address
  // address owner;
  

// Sets name and symbol of nft token to marketplace address when MintArt is deployed
  constructor(address _affeContractAddress) ERC721("AffeCoin", "AFC") {
    affeContractAddress = _affeContractAddress; //Assign state address to contract address of marketplace
    // owner = msg.sender; // Assign the address that deployed this contract
  }
  // mint token
  function createNFT(string memory tokenUri) public returns(uint) {
    // Increment nftId before assigning
    _nftId.increment();
    // Update nftId 
    uint updatednftId = _nftId.current();
    _mint(msg.sender, updatednftId); // 2 parameters address and a id
    _setTokenURI(updatednftId, tokenUri); 
    setApprovalForAll(affeContractAddress, true);
    
    return updatednftId;
  }
}

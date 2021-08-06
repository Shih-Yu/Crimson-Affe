//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract AffeMarket is ReentrancyGuard {
  using Counters for Counters.Counter;
  Counters.Counter private itemIds;
  Counters.Counter private itemSold;
  address payable owner;
  uint listingFee = 0.009;

  constructor() {
    owner = payable(msg.sender);
  }

  struct AffeItem {
    uint tokenId;
    uint itemId;
    uint price;
    address mintArtContract;
    address payable buyer; 
    address payable owner;
    bool sold;
  }
  
  mapping(uint => AffeItem) private affeItems;

  event AffeItemCreated(
    uint indexed tokenId, 
    uint indexed itemId, 
    uint price, 
    address indexed mintArtContract, 
    address buyer, 
    address owner, 
    bool sold);

  function getListingFee() public view returns(uint) {
    return listingFee;
  }

  function createAffeItem(address _mintArtContract, uint _tokenId, uint _price) public payable nonReentrant {
    require(_price > 0, "Does not meet minimum price");
    require(msg.value == listingFee, "Needs more funds to create item");
    itemIds.increment();
    uint newitemId = itemdIds.current();
    affeItems[newItemId] = AffeItem(
      tokenId,
      itemId,
      price,
      mintArtContract,
      payable(msg.sender),
      payable(address(0)),
      false
    );

    IERC721(mintArtContract).transferFrom(msg.sender, address(this), tokenId);
    emit AffeItemCreate(
      tokenId, 
      itemId, 
      price, 
      mintArtContract, 
      msg.sender, 
      address(0), 
      false);   
  }

  function createAffeSale(address mintArtContract, uint itemId) public payable nonReentrant {
    uint price = affeItems[itemId].price;
    uint tokenId = affeItems[itemId].tokenId;
    require(msg.value == price, "Need more funds to buy item");

    affeItems[itemId].buyer.transfer(msg.value);

    IERC721(mintArtContract).transferFrom(address(this), msg.sender, tokenId);

    affeItems[itemId].owner = payable(msg.sender); // .owner is from struct
    affeItems[itemId].sold = true;
    itemSold.increment();
    payable(owner).transfer(listingFee); // this owner is from state variable
  }


}
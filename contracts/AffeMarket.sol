//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract AffeMarket is ReentrancyGuard {
  using Counters for Counters.Counter;
  Counters.Counter private _itemIds;
  Counters.Counter private _itemsSold;
  address payable owner;
  uint listingFee = 0.025 ether;

  constructor() {
    owner = payable(msg.sender);
  }

  struct AffeItem {
    uint itemId;
    address mintArtContract;
    uint tokenId;
    address payable seller; 
    address payable owner;
    uint price;
    bool sold;
  }
  
  mapping(uint => AffeItem) private affeItems;

  event AffeItemCreated(
    uint indexed tokenId, 
    uint indexed itemId, 
    uint price, 
    address indexed mintArtContract, 
    address seller, 
    address owner, 
    bool sold);

  function getListingFee() public view returns(uint) {
    return listingFee;
  }

  function createAffeItem(
    address mintArtContract, 
    uint tokenId, 
    uint price) 
    public payable nonReentrant {
    require(price > 0, "Does not meet minimum price");
    require(msg.value == listingFee, "Needs more funds to create item");

    _itemIds.increment();
    uint itemId = _itemIds.current();

    affeItems[itemId] = AffeItem(
      itemId,
      mintArtContract,
      tokenId,   
      payable(msg.sender),
      payable(address(0)),
      price,
      false
    );

    IERC721(mintArtContract).transferFrom(msg.sender, address(this), tokenId);

    emit AffeItemCreated(
      itemId,
      mintArtContract,
      tokenId,   
      msg.sender,
      address(0),
      price,
      false
    );
  }

  function createAffeSale(address mintArtContract, uint itemId) public payable nonReentrant {
    // Assign item price
    uint price = affeItems[itemId].price;
    // Assign item tokenId
    uint tokenId = affeItems[itemId].tokenId;
    // Make sure buyer has enough funds to purchase item
    require(msg.value == price, "Need more funds to buy item");
    // Seller gets paid
    affeItems[itemId].seller.transfer(msg.value);
    // AffeMarket transfer tokenId to buyer
    IERC721(mintArtContract).transferFrom(address(this), msg.sender, tokenId);
    // Buyer is assigned as new owner
    affeItems[itemId].owner = payable(msg.sender); // .owner is from struct
    affeItems[itemId].sold = true;
    _itemsSold.increment();
    // AffeMarket gets listing fee
    payable(owner).transfer(listingFee); // this owner is from state variable
  }

// Get avaiable items to purchase
  function getAffeItems()public view returns(AffeItem[] memory){
    uint itemCount = _itemIds.current();
    uint itemNotSold = _itemIds.current() - _itemsSold.current();
    uint currentIndex = 0;
    AffeItem[] memory items = new AffeItem[](itemNotSold);

    for(uint i = 0; i < itemCount; i++) {
      // Loop through items to find only items where there's no buyer's address
      if(affeItems[i + 1].owner == address(0)) {
        // Assign currentId variable the new itemId number
        uint currentId = affeItems[i + 1].itemId;
        // Set new itemId for mapping of items with no owners
        AffeItem storage currentItem = affeItems[currentId];
        // Assign current item to current array index
        items[currentIndex] = currentItem;
        // Increase index for next unsold item if any
        currentIndex += 1;
      }
    }
    return items;  
  }
}
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

// contract using reentrancy guard to counter attacks
contract AffeMarket is ReentrancyGuard {
  using Counters for Counters.Counter;
  Counters.Counter private _itemIds;
  Counters.Counter private _itemsSold;
  address payable owner;
  uint256 listingFee = 0.025 ether;

  // sets owner as the deployer of the contract 
  constructor() {
    owner = payable(msg.sender);
  }

  // propetries of the NFT items
  struct AffeItem {
    uint256 itemId;
    address mintArtContract;
    uint256 tokenId;
    address payable seller; 
    address payable owner;
    uint256 price;
    bool sold;
  }
  
  // getting a list of NFTs by id
  mapping(uint256 => AffeItem) private affeItems;

  // create a 'log' of NFT properties
  event AffeItemCreated(
    uint256 indexed itemId, 
    address indexed mintArtContract, 
    uint256 indexed tokenId, 
    address seller, 
    address owner, 
    uint256 price, 
    bool sold);

  function getListingFee() public view returns(uint256) {
    return listingFee;
  }

  // create a new NFT
  function createAffeItem(
    address mintArtContract, 
    uint256 tokenId, 
    uint256 price) 
    public payable nonReentrant {
    require(price > 0, "Does not meet minimum price");
    require(msg.value == listingFee, "Needs more funds to create item");

    _itemIds.increment();
    uint256 itemId = _itemIds.current();
    // access NFT by id
    affeItems[itemId] = AffeItem(
      itemId,
      mintArtContract,
      tokenId,   
      payable(msg.sender),
      payable(address(0)),
      price,
      false
    );
    // openzeppelin721 to transfer NFT when it is sold
    IERC721(mintArtContract).transferFrom(msg.sender, address(this), tokenId);

    // activate the event
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

  function createAffeSale(address mintArtContract, uint256 itemId) public payable nonReentrant {
    // Assign item price
    uint256 price = affeItems[itemId].price;
    // Assign item tokenId
    uint256 tokenId = affeItems[itemId].tokenId;
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

// Get available items to purchase
  function getAffeItems()public view returns(AffeItem[] memory){
    uint256 itemCount = _itemIds.current();
    uint256 itemNotSold = _itemIds.current() - _itemsSold.current();
    uint256 currentIndex = 0;
    AffeItem[] memory items = new AffeItem[](itemNotSold);

    for(uint256 i = 0; i < itemCount; i++) {
      // Loop through items to find only items where there's no buyer's address
      if(affeItems[i + 1].owner == address(0)) {
        // Assign currentId variable the new itemId number
        uint256 currentId = affeItems[i + 1].itemId;
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
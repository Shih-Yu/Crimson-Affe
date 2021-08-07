const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AffeMarket", function () {
  it("Deployment should get listing fee price", async function () {

    const Token = await ethers.getContractFactory("AffeMarket");

    const hardhatToken = await Token.deploy();

    expect(await hardhatToken.getListingFee()).to.equal(5); // changed the function to 5 on contract to test
  });
});
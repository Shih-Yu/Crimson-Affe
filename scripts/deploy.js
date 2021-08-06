const hre = require("hardhat");

async function main() {
  
  const AffeMarket = await hre.ethers.getContractFactory("AffeMarket");
  const affeMarket = await AffeMarket.deploy();
  await affeMarket.deployed();
  console.log("affeMarket deployed to: ", affeMarket.address);

  const MintArt = await hre.ethers.getContractFactory("MintArt");
  const mintArt = await MintArt.deploy(affeMarket.address);
  await mintArt.deployed();
  console.log("mintArt deployed to: ", mintArt.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

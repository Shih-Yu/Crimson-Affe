require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

// connect to mumbai testnet or localhost
module.exports = {
  networks: {
    hardhat: {
      chainId: 1337
    },
    mumbai: {
      url: process.env.MUMBAI_URL,
      accounts: [process.env.PRIVATE_KEY],
    }
  },
  solidity: "0.8.6",
};

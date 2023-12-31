require("@nomicfoundation/hardhat-toolbox");
const fs = require("fs");
const mnemonic = fs.readFileSync(".secret").toString().trim();
const infuraProjectID = fs.readFileSync(".infura").toString().trim();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    goerli: {
      url: "https://goerli.infura.io/v3/" + infuraProjectID,
      accounts: {
        mnemonic,
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 10,
      },
    },
  },
  solidity: "0.8.19",
};

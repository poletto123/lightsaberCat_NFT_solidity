import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const fs = require("fs");
let mnemonic = fs.readFileSync(".secret").toString().trim();
let infuraProjectID = fs.readFileSync(".infura").toString().trim();
let etherscanApiKey = fs.readFileSync(".etherscan").toString().trim();

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    goerli: {
      url: "https://goerli.infura.io/v3/" + infuraProjectID,
      accounts: {
        mnemonic,
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 20
      }
    }
  },
  etherscan: {
    apiKey: etherscanApiKey
  }
};

export default config;

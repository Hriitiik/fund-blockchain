require("@nomicfoundation/hardhat-toolbox")
require("hardhat-deploy")
require("dotenv").config()
require("hardhat-gas-reporter")
require("@nomiclabs/hardhat-etherscan")
require("solidity-coverage")

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || "https://www.goerli.com"
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x00key"
const ES_API_KEY = process.env.ES_API_KEY || "key"

module.exports = {
  solidity: {
    compilers: [{ version: "0.8.8" }],
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    user: {
      default: 1,
    },
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 5,
      blockConfirmations: 6,
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
    },
  },
  etherscan: {
    apiKey: ES_API_KEY,
  },
}

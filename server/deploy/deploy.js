const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")
require("hardhat-deploy")

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, logs } = deployments
  const { deployer } = await getNamedAccounts()
  console.log("Deploying...")

  const fundContract = await deploy("FundContract", {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  })

  if (!developmentChains.includes(network.name) && process.env.ES_API_KEY) {
    await verify(fundContract.address, [])
  }
  console.log(`Contract Deployed at ${fundContract.address}`)
}

module.exports.tags = ["FundContract"]

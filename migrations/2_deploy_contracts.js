const Bet       = artifacts.require("./Bet.sol");
const BetOracle = artifacts.require("./BetOracle.sol");
const DateLib   = artifacts.require("./DateLib.sol");
const DefiPool  = artifacts.require("./DefiPool.sol");
const DAI       = artifacts.require("./DAI.sol");
const ipfsImage = artifacts.require("./ipfsImage.sol");
const Play      = artifacts.require("./Play.sol")


module.exports = async function(deployer) {
  await deployer.deploy(DAI,"Dai Stablecoin", "DAI");
  const daiContractAddress = await DAI.address; 

  await deployer.deploy(Play, daiContractAddress);

  dai = await DAI.deployed()
  play = await Play.deployed()
  dai.approve(play.address, 1000)

  await deployer.deploy(Bet, daiContractAddress);

  await deployer.deploy(BetOracle);
  await deployer.deploy(DateLib);
  await deployer.deploy(DefiPool);
  await deployer.deploy(ipfsImage);

};

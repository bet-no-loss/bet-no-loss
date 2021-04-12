var Bet       = artifacts.require("./Bet.sol");
var BetOracle = artifacts.require("./BetOracle.sol");
var DateLib   = artifacts.require("./DateLib.sol");
var DeFiPool  = artifacts.require("./DeFiPool.sol");
var DAI       = artifacts.require("./DAI.sol");


module.exports = async function(deployer) {
  await deployer.deploy(DAI,"Dai Stablecoin", "DAI");
  const daiContractAddress = await DAI.address;

  await deployer.deploy(Bet, daiContractAddress);

  await deployer.deploy(BetOracle);
  await deployer.deploy(DateLib);
  await deployer.deploy(DeFiPool, daiContractAddress);
};

var Bet = artifacts.require("./Bet.sol");
var BetOracle = artifacts.require("./BetOracle.sol");
var DateLib = artifacts.require("./DateLib.sol");
var DeFiPool = artifacts.require("./DeFiPool.sol");
var DAI = artifacts.require("./DAI.sol");


module.exports = function(deployer) {
  deployer.deploy(Bet);
  deployer.deploy(BetOracle);
  deployer.deploy(DateLib);
  deployer.deploy(DeFiPool);
  deployer.deploy(DAI);
};

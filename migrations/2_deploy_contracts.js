var Bet = artifacts.require("./Bet.sol");
var BetOracle = artifacts.require("./BetOracle.sol");
var DateLib = artifacts.require("./DateLib.sol");

module.exports = function(deployer) {
  deployer.deploy(Bet);
  deployer.deploy(BetOracle);
  deployer.deploy(DateLib);
};

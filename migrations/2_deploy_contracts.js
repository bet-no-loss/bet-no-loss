var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var Bet = artifacts.require("./Bet.sol");
var Bet2 = artifacts.require("./Bet2.sol");
var BetOracle = artifacts.require("./BetOracle.sol");
var DateLib = artifacts.require("./DateLib.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(Bet);
  deployer.deploy(Bet2);
  deployer.deploy(BetOracle);
  deployer.deploy(DateLib);
};

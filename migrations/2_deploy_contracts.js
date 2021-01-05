var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var Bet = artifacts.require("./Bet.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(Bet);
};

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

  const dai = await DAI.deployed()
  const play = await Play.deployed()
  await dai.approve(play.address, 1000)
  await dai.approve("0xe087Aa17aDB5385ef7A0c9a7409689B14b4f911d", 1000);
  await dai.approve("0x06096bB100DA41C831fd30AfDf8489722C3743b9", 1000);

  await deployer.deploy(Bet, daiContractAddress);
  await deployer.deploy(BetOracle);
  await deployer.deploy(DateLib);
  await deployer.deploy(DefiPool);
  await deployer.deploy(ipfsImage);

};

// migrating the appropriate contracts
var SquareVerifier = artifacts.require("./SquareVerifier.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");
var BitlandProperty = artifacts.require("./BitlandProperty.sol")

module.exports = function(deployer) {
  deployer.deploy(BitlandProperty);
  deployer.deploy(SquareVerifier);
  deployer.deploy(SolnSquareVerifier);
};

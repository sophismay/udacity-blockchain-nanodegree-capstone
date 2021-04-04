// migrating the appropriate contracts
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");
var BitlandProperty = artifacts.require("./BitlandProperty.sol");
var Verifier = artifacts.require("./Verifier.sol");
const name = "Bitland Property";
const symbol = "BLP";

module.exports = function(deployer) {
  deployer.deploy(BitlandProperty, name, symbol);
  deployer.deploy(SolnSquareVerifier, name, symbol);
  deployer.deploy(Verifier);
};

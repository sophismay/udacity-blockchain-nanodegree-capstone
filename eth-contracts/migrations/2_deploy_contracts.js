// migrating the appropriate contracts
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");
var Verifier = artifacts.require("./Verifier.sol");
const name = "Bitland Property 2";
const symbol = "BTLP2";

module.exports = function(deployer) {
  deployer
    .deploy(Verifier)
    .then(
      () => {
        deployer
          .deploy(SolnSquareVerifier, name, symbol);
      }
    )
};

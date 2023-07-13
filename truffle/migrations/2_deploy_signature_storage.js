const SignatureStorage = artifacts.require("SignatureStorage");

module.exports = function (deployer) {
  deployer.deploy(SignatureStorage);
};

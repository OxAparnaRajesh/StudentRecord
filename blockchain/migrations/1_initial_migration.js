const Migrations = artifacts.require("Migrations");
const StudentRecord = artifacts.require("StudentRecord");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(StudentRecord);
};

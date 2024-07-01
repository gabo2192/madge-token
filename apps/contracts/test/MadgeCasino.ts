import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { expect } from "chai";
import hre from "hardhat";
import { MadgeCasino, MadgeCoin } from "../typechain-types";

describe("MadgeCoin", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  let Token;
  let myToken: MadgeCoin;
  let MadgeCasino: MadgeCasino;
  let owner: HardhatEthersSigner;
  let addr1: HardhatEthersSigner;
  let addr2: HardhatEthersSigner;
  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    Token = await hre.ethers.getContractFactory("MadgeCoin");
    [owner, addr1, addr2] = await hre.ethers.getSigners();
    const MadgeCasinoFactory =
      await hre.ethers.getContractFactory("MadgeCasino");
    myToken = await Token.deploy();
    MadgeCasino = await MadgeCasinoFactory.deploy();
  });
  describe("getMyTreasuries", function () {
    it("should return an empty array when user has no treasuries", async function () {
      const myTreasuries = await MadgeCasino.connect(addr1).treasuries;
      console.log({ myTreasuries: myTreasuries.length });
      expect(myTreasuries.length).to.be.equal(0);
    });

    it("should return the correct token treasury", async function () {
      const tokenAdress = await myToken.getAddress();
      await MadgeCasino.connect(addr1).createTreasury(tokenAdress);

      const myTreasuries = await MadgeCasino.connect(addr1).treasuries(addr1);
      console.log({ myTreasuries });
      console.log({ myTreasuries: myTreasuries });
    });
  });
});

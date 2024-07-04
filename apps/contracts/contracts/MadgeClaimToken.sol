// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "hardhat/console.sol";

contract MadgeClaimToken is Ownable {
    

    mapping(address => bool) public hasClaimed;

    bytes32 merkleRoot;
    IERC20 public token;
    address public tokenOwner;

    constructor() Ownable(msg.sender) {
        merkleRoot = 0x27a2e2ff9235118463aaee293b6fdcee12cd53174efa4c9931135c33c5690779;
    }

    function updateMerkleRoot(
        bytes32 _merkleRoot
    ) external onlyOwner {
        merkleRoot = _merkleRoot;
    }

    function initialize(
        IERC20 _token,
        address _tokenOwner
        
    ) external onlyOwner {
        token = _token;
        tokenOwner = _tokenOwner;
    }


    function claim(
        bytes32[] calldata proof,
        uint256 amount
    ) external {
        require(!hasClaimed[msg.sender], "Tokens already claimed");
        bytes32 leaf = keccak256(bytes.concat(keccak256(abi.encode(address(msg.sender), amount))));
        require(MerkleProof.verify(proof, merkleRoot, leaf), "Invalid proof");
        require(token.transferFrom(tokenOwner, msg.sender, amount), "Transaction Error");
        hasClaimed[msg.sender] = true;
    }  
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract MadgeClaimToken is Ownable {
    

    mapping(address => bool) public hasClaimed;

    bytes32 merkleRoot = 0x51812f2c52617aeeab557a116de1a1cb8160d1b1c567d7fad5aaaca28a7d6fa7;
    IERC20 public token;
    address public tokenOwner;

    constructor() Ownable(msg.sender) {}

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
        string calldata receiver,
        bytes32[] calldata proof
    ) external {
        require(!hasClaimed[msg.sender], "Tokens already claimed");
        bytes32 leaf = keccak256(abi.encodePacked(receiver));
        require(MerkleProof.verify(proof, merkleRoot, leaf), "Invalid proof");
        require(token.transferFrom(tokenOwner, msg.sender, 1000000000), "Transaction Error");
        hasClaimed[msg.sender] = true;
    }    
}

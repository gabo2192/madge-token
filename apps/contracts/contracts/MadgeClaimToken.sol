// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract MadgeClaimToken is Ownable {
    

    mapping(address => bool) public hasClaimed;
    uint16 public totalClaimed = 0;

    bytes32 merkleRoot;
    IERC20 public token;
    address public tokenOwner;

    constructor(bytes32 _merkleRoot) Ownable(msg.sender) {
        merkleRoot = _merkleRoot;
    }

    error ClaimError(string reason);


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
        if (hasClaimed[msg.sender]){
            revert ClaimError("Tokens already claimed");
        }
        bytes32 leaf = keccak256(bytes.concat(keccak256(abi.encode(address(msg.sender), amount))));
        require(MerkleProof.verify(proof, merkleRoot, leaf), "Invalid proof");
        uint256 claimAmount = amount;
        if (totalClaimed >= 1000){
            claimAmount = 100*10**8;
        }
        require(token.transferFrom(tokenOwner, msg.sender, claimAmount), "Transaction Error");
        hasClaimed[msg.sender] = true;
        totalClaimed += 1;
    }  
}

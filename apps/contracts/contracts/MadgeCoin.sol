// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "hardhat/console.sol";

contract MadgeCoin is ERC20Capped, Ownable {
    uint256 public constant TOTAL_SUPPLY = 21000000 * 10 ** 8;
    uint256 public constant TEAM_ALLOCATION = 2100000 * 10 ** 8;
    uint256 public constant MARKETING_BUDGET = 6300000 * 10 ** 8;

    address public teamAddress;
    address public marketingAddress;

    bool public teamAllocationDone = false;
    bool public marketingBudgetDone = false;


    constructor() ERC20("MadgeCoin", "$MAD") ERC20Capped(TOTAL_SUPPLY) Ownable(msg.sender) {
        _mint(msg.sender, TOTAL_SUPPLY);
    }

    function decimals() public view virtual override returns (uint8) {
        return 8;
    }

    function allocateMarketingBudget(address _marketingAddress) external onlyOwner {
        require(!marketingBudgetDone, "BaseToken: Marketing budget already allocated");
        require(_marketingAddress != address(0), "BaseToken: Invalid marketing address");

        marketingAddress = _marketingAddress;
        _transfer(msg.sender, marketingAddress, MARKETING_BUDGET);
        marketingBudgetDone = true;
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract MadgeCasino is Ownable {
    IERC20 public depositToken = IERC20(0x5FbDB2315678afecb367f032d93F642f64180aa3);
    uint256 public treasuryBalance;
    event CoinFlipResult(
        uint256 indexed requestId,
        address indexed user, 
        uint256 betAmount, 
        bool won, 
        uint256 payout, 
        uint8 choice, 
        uint8 result
    );
    uint256 public constant PAYOUT_MULTIPLIER = 96; // Represents 0.96 as a percentage
    uint256 public constant HOUSE_EDGE = 4; // Represents 4% fee

    constructor() Ownable(msg.sender) {}

    function fundTreasury(uint256 _amount) external onlyOwner {
        require(_amount > 0, "Funding amount must be greater than zero.");
        require(
            depositToken.transferFrom(msg.sender,address(this), _amount),
            "Token transfer failed"
        );
        treasuryBalance += _amount;
    }
    
    function withdrawTreasury(uint256 _amount) external onlyOwner {
        require(_amount > 0, "Withdrawal amount must be greater than zero");
        require(treasuryBalance >= _amount, "Insufficient funds in the treasury");

        treasuryBalance -= _amount;
        require(
            depositToken.transfer(msg.sender, _amount),
            "Token transfer failed"
        );
    }

    function flipCoin(uint256 requestId, uint256 _betAmount, uint8 _choice, uint8 _randomResult) external {
        require(_betAmount > 0, "Bet amount must be greater than zero");
        require(_choice == 0 || _choice == 1, "Choice must be 0 (heads) or 1 (tails)");
        require(_randomResult == 0 || _randomResult == 1, "Random result must be 0 or 1");

        // Transfer the bet amount from the user to the contract
        require(
            depositToken.transferFrom(msg.sender, address(this), _betAmount),
            "Token transfer failed"
        );
      
        uint256 payout = 0;
        bool won = false;
        if (_choice == _randomResult) {
            // User won
            payout = _betAmount + ((_betAmount * PAYOUT_MULTIPLIER) / 100); // Calculate payout as 0.96 times the bet amount
            require(treasuryBalance >= payout, "Insufficient funds in the treasury");

            treasuryBalance -= payout;

            // Transfer the payout to the user
            require(
                depositToken.transfer(msg.sender, payout),
                "Token transfer failed"
            );
            won = true;
        } else {
            // User lost, treasury balance is already incremented by the bet amount
            treasuryBalance += _betAmount;
        }

        emit CoinFlipResult(requestId, msg.sender, _betAmount, won, payout, _choice, _randomResult);
    }

}
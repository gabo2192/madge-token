// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract MadgeCasino is Ownable {
    struct Treasury {
        address owner;
        IERC20 depositToken;
        uint256 balance;
    }

    mapping(address => mapping(address => Treasury)) public treasuries;

    uint256 public constant PAYOUT_MULTIPLIER = 96; // Represents 0.96 as a percentage
    uint256 public constant HOUSE_EDGE = 4; // Represents 4% fee

    event TreasuryCreated(
        uint32 indexed requestId, 
        address indexed owner, 
        address indexed token
    );

    event CoinFlipResult(
        uint32 indexed requestId,
        address indexed user, 
        address indexed treasuryToken,
        uint256 betAmount, 
        bool won, 
        uint256 payout, 
        uint8 choice, 
        uint8 result
    );
   
    constructor() Ownable(msg.sender) {}

    function createTreasury(uint32 requestId, IERC20 _depositToken) external {
        
        if (treasuries[msg.sender][address(_depositToken)].depositToken != IERC20(address(0))){
            revert("Treasury for this token already exists");
        }
        console.log("here");
        treasuries[msg.sender][address(_depositToken)] = Treasury(msg.sender, _depositToken, 0);
        emit TreasuryCreated(requestId, msg.sender, address(_depositToken));
    }

    function fundTreasury(address _token, uint256 _amount) external {
        Treasury storage treasury = treasuries[msg.sender][_token];
        require(_amount > 0, "Funding amount must be greater than zero.");
        require(
            treasury.depositToken.transferFrom(msg.sender, address(this), _amount),
            "Token transfer failed"
        );
        treasury.balance += _amount;
    }
    
    function withdrawTreasury(address _token, uint256 _amount) external  {
        Treasury storage treasury = treasuries[msg.sender][_token];
        require(_amount > 0, "Withdrawal amount must be greater than zero");
        require(treasury.balance >= _amount, "Insufficient funds in the treasury");
        treasury.balance -= _amount;
        require(
            treasury.depositToken.transfer(msg.sender, _amount),
            "Token transfer failed"
        );
    }

    function flipCoin(uint32 requestId, address _treasuryToken, address _userTreasury, uint256 _betAmount, uint8 _choice, uint8 _randomResult) external {
        require(_betAmount > 0, "Bet amount must be greater than zero");
        require(_choice == 0 || _choice == 1, "Choice must be 0 (heads) or 1 (tails)");
        require(_randomResult == 0 || _randomResult == 1, "Random result must be 0 or 1");

        Treasury storage treasury = treasuries[_userTreasury][_treasuryToken];
        require(treasury.owner == _userTreasury, "Invalid treasury owner");
        require(treasury.depositToken == IERC20(_treasuryToken), "Invalid treasury token"); 

        // Transfer the bet amount
        require(
            treasury.depositToken.transferFrom(msg.sender, address(this), _betAmount),
            "Token transfer failed"
        );

        uint256 payout = 0;
        bool won = false;
        if (_choice == _randomResult) {
            payout = _betAmount + ((_betAmount * PAYOUT_MULTIPLIER) / 100);
            require(treasury.balance >= payout, "Insufficient funds in the treasury");
            treasury.balance -= payout;
            require(
                treasury.depositToken.transfer(msg.sender, payout),
                "Token transfer failed"
            );
            won = true;
        } else {
            treasury.balance += _betAmount; 
        }
        emit CoinFlipResult(requestId, msg.sender, _treasuryToken, _betAmount, won, payout, _choice, _randomResult);
    }
    

}
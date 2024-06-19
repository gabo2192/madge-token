// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";


contract MadgeCasino is Initializable, OwnableUpgradeable {
    ERC20Upgradeable public depositToken;
    mapping(address => uint256) public balances;
    uint256 public treasuryBalance;
    
    event Deposit(address indexed user, uint256 amount);
    event Withdraw(address indexed user, uint256 amount);
    event UserBalancesUpdated(address[] users, uint256[] newBalances);

    uint256 public constant FEE_PERCENTAGE = 10; // 10% fee

    function initialize(address _tokenAddress) initializer public {
        __Ownable_init(msg.sender);
        depositToken = ERC20Upgradeable(_tokenAddress);
    }
    function fundTreasury(uint256 _amount, address _tokenAddress) external onlyOwner {
        depositToken = ERC20Upgradeable(_tokenAddress);
        require(_amount > 0, "Funding amount must be greater than zero.");
        require(
            depositToken.transferFrom(msg.sender,address(this), _amount),
            "Token transfer failed"
        );
        treasuryBalance += _amount;
    }
    function deposit(uint256 _amount) external {
        require(_amount > 0, "Deposit amount must be greater than zero");
        require(
            depositToken.transferFrom(msg.sender, address(this), _amount),
            "Token transfer failed"
        );
        balances[msg.sender] += _amount;
        emit Deposit(msg.sender, _amount);
    }

    function withdraw(uint256 _amount, int256 _profit) external {
        require(_amount > 0, "Withdrawal amount must be greater than zero");

        uint256 updatedBalance = balances[msg.sender];
        if (_profit > 0) {
            uint256 payout = uint256(_profit);
            require(
                treasuryBalance >= payout,
                "Insufficient funds in the treasury"
            );
            treasuryBalance -= payout;

            // Apply fee on profit
            uint256 fee = (payout * FEE_PERCENTAGE) / 100;
            treasuryBalance += fee; // Add fee back to the treasury
            payout -= fee; // Reduce the profit payout by the fee amount

            updatedBalance += payout;
        } else if (_profit < 0) {
            uint256 loss = uint256(-_profit);
            if (updatedBalance == loss) {
                updatedBalance = 0;
            } else {
                updatedBalance -= loss;
                treasuryBalance += loss; // Loss goes back to the treasury
            }
        }
        require(updatedBalance >= _amount, "Insufficient balance");
        balances[msg.sender] = updatedBalance - _amount;

        require(
            depositToken.transferFrom(address(this), msg.sender, _amount),
            "Token transfer failed"
        );
        emit Withdraw(msg.sender, _amount);
    }

    function updateUserBalances(address[] calldata _users, uint256[] calldata _newBalances) external onlyOwner {
        require(_users.length == _newBalances.length, "Users and balances length mismatch");
        for (uint256 i = 0; i < _users.length; i++) {
            balances[_users[i]] = _newBalances[i];
        }
        emit UserBalancesUpdated(_users, _newBalances);
    }

}
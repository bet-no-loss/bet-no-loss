// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./DefiInterface.sol";

/**
  *  @title A smart-contract that plays the role of a DeFi protocol where users can deposit and earn interests
  */
contract DefiPool is DefiInterface {

    /**
     * @dev An instance of ERC20 DAI Token
     */
     IERC20 Dai;

    /**
     * @dev Balance of each user address
     */
    mapping(address => uint256) public userBalance;

    /**
     * @dev Start date of each user deposit
     */
    mapping(address => uint256) public depositStart;

    /**
     * @dev Time spent in user deposit
     */
    mapping(address => uint256) public depositTime; // temporary

    /**
     * @dev Interests earn per user
     */
    mapping(address => uint256) public interests; // temporary

    /**
     * @dev Event triggered once an address deposited in the contract
     */
    event Deposit(
        address indexed user,
        uint256         amount,
        uint256         timeStart
    );

    /**
     * @param _tokenAddress address of the DAI ERC20 token
     */
    constructor(address _tokenAddress) {
        Dai = IERC20(_tokenAddress);
    }

    /**
      * @notice Moves `_amount` tokens from `_sender` to this contract
      * @param _sender the address who owns the tokens
      * @param _amount the amount (DAI) to be deposited
      */
    function deposit(uint _amount, address _sender) 
        public override payable
    {
        require(_amount >= 10, "Error, deposit must be >= 10 DAI");

        Dai.transferFrom(_sender, address(this), _amount);

        userBalance[_sender] = userBalance[_sender] + _amount;

        depositStart[msg.sender] = depositStart[msg.sender] + block.timestamp;

        emit Deposit(msg.sender, msg.value, block.timestamp);
    }

    /**
     * @notice Withdraw all amount deposited by a user
     * @param _user address of the user
     */
    function withdraw(address _user)
        public override payable
    {
        // 31577600 = seconds in 365.25 days

        // time spent for user's deposit
        uint time;
        depositTime[_user] = block.timestamp - depositStart[_user];
        time = depositTime[_user];

        //interests gains per second
        uint256 interestPerSecond =
            31577600 * uint256(userBalance[_user] / 1e8);

        interests[_user] = interestPerSecond * time;
        uint initialUserBalance = userBalance[_user];
        userBalance[_user] = userBalance[_user] + interests[msg.sender];
        Dai.transfer(_user, userBalance[_user]);
        userBalance[_user] = userBalance[_user] - initialUserBalance;
    }

    /**
     * @return return the contract balance
     */
    function getContractBalance()
        public view override
        returns (uint256)
    {
        return Dai.balanceOf(address(this));
    }
}

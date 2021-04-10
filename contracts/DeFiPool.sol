// SPDX-License-Identifier: MIT
pragma solidity 0.8.3;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
    @title A smart-contract that plays the role of a DeFi protocol where users can deposit and earn
    interests
    */
contract DefiPool {

    /**
     * @dev Instance of an ERC20 token
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
     * @dev Triggered once an event has been added
     */
    event Deposit(address indexed user, uint256 amount, uint256 timeStart);

    /**
     * @param _daiAddress address of the DAI ERC20 token
     */
    constructor( address _daiAddress) {
        Dai = ERC20(_daiAddress);
    }

    /**
     * @notice deposit ether to the contract
     */
    function deposit() public payable {
        require(msg.value >= 0, "Error, deposit must be >= 0 DAI");

        userBalance[msg.sender] = userBalance[msg.sender] + msg.value;

        depositStart[msg.sender] = depositStart[msg.sender] + block.timestamp;

        emit Deposit(msg.sender, msg.value, block.timestamp);
    }

    /**
     * @notice Withdraw all amount deposited by a user
     */
    function withdraw() public payable {
        // 31577600 = seconds in 365.25 days

        // time spent for user's deposit
        depositTime[msg.sender] = block.timestamp - depositStart[msg.sender];

        //interests gains per second
        uint256 interestPerSecond =
            31577600 * (uint256(userBalance[msg.sender]) / 1e16);

        interests[msg.sender] = interestPerSecond * depositTime[msg.sender];

        userBalance[msg.sender] = userBalance[msg.sender] + interests[msg.sender];
        payable(msg.sender).transfer(userBalance[msg.sender]);
        userBalance[msg.sender] = userBalance[msg.sender] - userBalance[msg.sender];
    }

    /**
     * @return the contract balance
     */
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    /**
     * @return msg.sender balance
     */
    function getUserBalance() public view returns (uint256) {
        return msg.sender.balance;
    }
}

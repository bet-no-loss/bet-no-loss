// SPDX-License-Identifier: MIT
pragma solidity 0.8.3;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Play {

    IERC20 Dai;

    /**
     * @dev list of all bets per player, ie. a map composed (player address => bet id) pairs
     */

    mapping(address => uint[]) public betsPerPlayer;

    /**
     * @dev list of all chosenWinner per match per user, ie. a map composed (player address => (event id => chosen winner)) pairs
     */
    mapping(address => mapping(uint => string)) public chosenWinner;

    /**
    * @dev list of earnings per match per player, ie. a map composed (player address => (event id => bet amount)) pairs
    */
    mapping(address => mapping(uint => uint)) public playerEarnings;

    uint public eventCount = 0;

    mapping(uint => SportEvent) public sportEvents;

    struct SportEvent {
        uint         eventId;
        string       fileHash;
        string       description;
        string       teamA;
        string       teamB;
        uint         date;
        string       winner;
    }

    constructor(address _tokenAddress) {
        Dai = IERC20(_tokenAddress);
    }

    function addSportEvent(
        string memory _fileHash,
        string memory _description,
        string memory _teamA,
        string memory _teamB,
        uint          _date
    ) public
    {

        require(_date >= block.timestamp + 1 weeks, "_date must be >= 1 week from now");

        //Increment sport event
        eventCount ++;

        // Add the sport event
        /* sportEvents.push(SportEvent(_name, _teamA, _teamB, _date, _teamA));*/
        sportEvents[eventCount] = SportEvent(eventCount, _fileHash, _description, _teamA, _teamB, _date, _teamA);
    }

    function getWinner(uint _eventId) public view returns (string memory) {
        return sportEvents[_eventId].winner;
    }

    // TO DO: throw an error if already played for an event
    function bet(string memory _winner, uint _amount, uint eventId) public {
        /*require(_amount >= 10, "A minimum of 10DAI is required");*/
        // Deposit Dai
        Dai.transferFrom(msg.sender, address(this), _amount);

        // Add chosen winner per player per match
        chosenWinner[msg.sender][eventCount] = _winner;

        // TO DO: Check if works
        betsPerPlayer[msg.sender].push(eventId);
    }

    function checkEarnings(uint _eventId) public returns(uint) {
        if (keccak256(abi.encodePacked(sportEvents[_eventId].winner)) == keccak256(abi.encodePacked(chosenWinner[msg.sender][_eventId]))) {
            playerEarnings[msg.sender][_eventId] += 10;
            return 10;
        } else {
            return 0;
        }
    }

    function withdraw(address _player, uint _eventId) public {
        require(_player != address(0), "Address 0 is not allowed");
        if (playerEarnings[msg.sender][_eventId] > 0) {
            Dai.transfer(_player, playerEarnings[msg.sender][_eventId]);
        }

        playerEarnings[msg.sender][_eventId] -= 10;
    }


    function getBalance(address _balance) public view returns (uint) {
        require(_balance != address(0), "Address 0 is not allowed");
        return Dai.balanceOf(_balance);

    }

}


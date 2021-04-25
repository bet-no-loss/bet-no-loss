// SPDX-License-Identifier: MIT
pragma solidity 0.8.3;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Play {
    
    IERC20 Dai;

    /** 
     * @dev list of all bets per player, ie. a map composed (player address => bet id) pairs
     */
    mapping(address => bytes32[]) private betsPerPlayer;
    
    /** 
     * @dev list of all chosenWinner per match per user
     */
    mapping(address => mapping(uint => string)) public chosenWinner;
    
     /** 
     * @dev list of earnings per match per player
     */
    mapping(address => mapping(uint => uint)) public playerEarnings;
    
    /** 
     * @dev Winner selected by player
     */
   // mapping(address => string) public chosenWinner;

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

    function deposit(uint _amount, address _sender) public payable {
        require(_amount >= 10, "Error, deposit must be >= 10 DAI");

        Dai.transferFrom(_sender, address(this), _amount);
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
    
    
    function bet(string memory _winner, uint _amount) public returns (bool) {  
        // Deposit Dai
        Dai.transferFrom(msg.sender, address(this), _amount);
        
        // Get team bet by Player
        chosenWinner[eventCount] = _winner;
        
        if (keccak256(abi.encodePacked(_winner)) == keccak256(abi.encodePacked(sportEvents[0].winner))) {
            return true;
        } else {
            return false;
        }
    }

    function checkEarnings(uint _eventId) public {

    }

    function withdraw(address _user) public payable {        
        uint initialUserBalance = userBalance[_user];
        userBalance[_user] = userBalance[_user] + 10;
        Dai.transfer(_user, userBalance[_user]);
        userBalance[_user] = userBalance[_user] - initialUserBalance;
    }      
    
}
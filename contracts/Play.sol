// SPDX-License-Identifier: MIT
pragma solidity 0.8.3;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Play {
    
    IERC20 Dai;

    /**
     * @dev Balance of each user address
     */
    mapping(address => uint256) public userBalance;
    
    //SportEvent[] public sportEvents;

    string temporary;

    uint public eventCount = 0;
    mapping(uint => SportEvent) public sportEvents;
    
    struct SportEvent {
        uint         eventId;
        string       fileHash;
        string       description;
        string       teamA;
        string       teamB;
        uint         date;
        /*uint         uploadTime;*/
        string       winner;
        /*address payable uploader;*/
    }
    
    constructor(address _tokenAddress) {
        Dai = IERC20(_tokenAddress);
    } 

    function setString(string memory _world) public {
        temporary = _world;
    }

    function getString() public view returns (string memory){
        return temporary;
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

    function getWinner() public view returns (string memory) {
        return sportEvents[0].winner;
    }
    
    // TO DO: use DAI
    function bet(string memory _winner, uint _amount) public view returns (bool) {
        if (keccak256(abi.encodePacked(_winner)) == keccak256(abi.encodePacked(sportEvents[0].winner))) {
            return true;
        } else {
            return false;
        }
    }

    function withdraw(address _user) public payable {        
        uint initialUserBalance = userBalance[_user];
        userBalance[_user] = userBalance[_user] + 10;
        Dai.transfer(_user, userBalance[_user]);
        userBalance[_user] = userBalance[_user] - initialUserBalance;
    }      
    
}
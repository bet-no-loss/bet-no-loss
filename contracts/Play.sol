// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Play {
    
    IERC20 Dai;

    /**
     * @dev Balance of each user address
     */
    mapping(address => uint256) public userBalance;
    
    SportEvent[] public events;
    
    struct SportEvent {
        string       name;
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
        string memory _name,
        string memory _teamA,
        string memory _teamB,
        uint          _date
    ) public returns (bool)
    {
        bytes memory bytesName = bytes(_name);
        require(bytesName.length > 0, "_name cannot be empty");
        require(_date >= block.timestamp + 1 weeks, "_date must be >= 1 week from now");

        // Add the sport event
        events.push(SportEvent(_name, _teamA, _teamB, _date, _teamA));
    }

    function getWinner() public returns (string memory) {
        return events[0].winner;
    }
    
    // TO DO: use DAI
    function bet(string memory _winner, uint _amount) public returns (bool) {
        if (keccak256(abi.encodePacked(_winner)) == keccak256(abi.encodePacked(events[0].winner))) {
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
// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./BetInterface.sol";

/// @title BoxingBets
/// @notice Takes bets and handles payouts for boxing matches 
contract Bet2 is Ownable {
    
    //list of all bets that have been made by that user
    mapping(address => bytes32[]) private userToBets;
    //for any given event, get a list of all bets that have been made for that event.
    mapping(bytes32 => Bet[]) private eventToBets;

    //event results oracle 
    address internal betOracleAddr = address(0);
    BetInterface internal betOracle = BetInterface(betOracleAddr); 

    //constants
    uint internal minimumBet = 1000000000000;

    struct Bet {
        address user;
        bytes32 eventId;
        uint amount; 
        uint8 chosenWinner; 
    }

    enum BettableOutcome {
        Team1,
        Team2
    }

    /// @notice determines whether or not the user has already bet on the given match
    /// @param _user address of a user
    /// @param _eventId id of a event 
    /// @param _chosenWinner the index of the participant to bet on (to win)
    function _betIsValid(address _user, bytes32 _eventId, uint8 _chosenWinner) private pure returns (bool) {
        return true;
    }

    /// @notice determines whether or not bets may still be accepted for the given match
    /// @param _eventId id of an event 
    function _eventOpenForBetting(bytes32 _eventId) private pure returns (bool) {        
        return true;
    }


    /// @notice sets the address of the sport bet oracle contract to use 
    /// @dev setting a wrong address may result in false return value, or error 
    /// @param _oracleAddress the address of the sport bet oracle 
    function setOracleAddress(address _oracleAddress) external onlyOwner returns (bool) {
        betOracleAddr = _oracleAddress;
        betOracle = BetInterface(betOracleAddr); 
        return betOracle.testConnection();
    }

    /// @notice gets the address of the boxing oracle being used 
    function getOracleAddress() external view returns (address) {
        return betOracleAddr;
    }
 
    /// @notice gets a list ids of all currently bettable events
    function getBettableEvents() public view returns (bytes32[] memory) {
        return betOracle.getPendingEvents(); 
    }

    /// @notice returns the full data of the specified event 
    /// @param _eventId the id of the desired event
    function getEvent(bytes32 _eventId) public view returns (
        bytes32 id,
        string memory name, 
        string memory participants,
        uint8 participantCount,
        uint date, 
        BetInterface.EventOutcome outcome, 
        int8 winner) { 

        return betOracle.getEvent(_eventId); 
    }

    /// @notice returns the full data of the most recent bettable event 
    function getMostRecentEvent() public view returns (
        bytes32 id,
        string memory name, 
        string memory participants,
        uint participantCount, 
        uint date, 
        BetInterface.EventOutcome outcome, 
        int8 winner) { 

        return betOracle.getMostRecentEvent(true); 
    }

    /// @notice places a non-rescindable bet on the given event 
    /// @param _eventId the id of the event on which to bet 
    /// @param _chosenWinner the index of the participant chosen as winner
    function placeBet(bytes32 _eventId, uint8 _chosenWinner) public payable {

        //bet must be above a certain minimum 
        require(msg.value >= minimumBet, "Bet amount must be >= minimum bet");

        //make sure that event exists 
        require(betOracle.eventExists(_eventId), "Specified event not found"); 

        //require that chosen winner falls within the defined number of participants for event
        require(_betIsValid(msg.sender, _eventId, _chosenWinner), "Bet is not valid");

        //event must still be open for betting
        require(_eventOpenForBetting(_eventId), "Event not open for betting"); 

        //transfer the money into the account 
        payable(address(this)).transfer(msg.value);

        //add the new bet 
        Bet[] storage bets = eventToBets[_eventId]; 
        bets.push(Bet(msg.sender, _eventId, msg.value, _chosenWinner)); 

        //add the mapping
        bytes32[] storage userBets = userToBets[msg.sender]; 
        userBets.push(_eventId); 
    }

    /// @notice for testing; tests that the boxing oracle is callable 
    function testOracleConnection() public view returns (bool) {
        return betOracle.testConnection(); 
    }
}
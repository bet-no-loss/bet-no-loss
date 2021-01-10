// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

/**
 * @title a Smart-Contract in charge of handling bets on a sport event outcome where players do not loose their stake and winners earn the interests accrued on the stakes.
 * @author Tanteli, block74
 */
contract Bet is Ownable {

    using SafeMath for uint256;

    /**
     * @dev a SportEvent
     */
    struct SportEvent {
        uint256  id;
        string   name;

        // @dev when will the event take place
        uint256  eventDate;

        // @dev date when the event outcome will be available
        uint256  eventOutcomeDate;
        // TODO: eventUrl: where to check what the outcome is? (design decision not used for now)
        // TODO: eventChecker who checks what the outcome of the event is
    }

    // @dev the sport events as (event name, SportEvent) pairs
    mapping (string => SportEvent) public sportEvents;

    // @dev id incremented each time an event is created
    uint256 private _eventId;

    address private _oracle_address;

    event SportEventCreated(
            uint256 _eventId, 
            string  _eventName,
            uint256 _eventDate,
            uint256 _eventOutcomeDate
    );


    // @dev TODO
    constructor(address _oracle_addr)  Ownable() {
        _oracle_address = _oracle_addr;   

    }

    /**
     * @dev Add a new event, then notifies the Oracle in charge of monitoring its outcome.
     *
     * @return the id of the new event
     * @param _eventName event name
     * @param _eventDate when this event will take place (as an Epoch date ie. number of seconds since Unix Epoch)
     * @param _outcomeAvailableDate when the event outcome will be available (Epoch date)
     */
    function createSportEvent(
        string memory _eventName,
        uint256       _eventDate,
        uint256       _outcomeAvailableDate
    ) public
        onlyOwner
        returns(uint256)
    {
        bytes memory bytesName = bytes(_eventName);
        require(bytesName.length > 0, "_eventName cannot be empty");
        require(
            sportEvents[_eventName].id == 0, // should not exist
            "This event name already exists, choose another one"
        );
        require(
            _eventDate >= block.timestamp + 1 weeks,
            "Event date must be >= 1 week from now"
        );
        require(
            _outcomeAvailableDate > block.timestamp + 1 weeks,
            "Event Outcome available date must be > 1 week from now"
        );

        _eventId = _eventId.add(1);
        SportEvent memory sportEvent = SportEvent(_eventId, _eventName, _eventDate, _outcomeAvailableDate);
        sportEvents[_eventName] = sportEvent;

        // TODO: Register the fresh new event on the OracleContract

        emit SportEventCreated(_eventId, _eventName, _eventDate, _outcomeAvailableDate);

        return _eventId;
    }

}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "./OracleInterface.sol";


/**
 * @title An smart-contract Oracle that register sport events, retrieve their outcomes and communicate their results when asked for.
 * @notice Collects and provides information on sport events and their outcomes
 */
contract BetOracle is OracleInterface, Ownable, ReentrancyGuard {

    /**
     * @dev all the sport events
     */
    SportEvent[] events;

    /*
     * @dev map of composed {eventId (SHA3 of event key infos) => eventIndex (in events)} pairs
     */
    mapping(bytes32 => uint) eventIdToIndex;

    /***
      * @dev defines a sport event along with its outcome
      */
    struct SportEvent {
        bytes32      id;
        string       name;
        string       participants;
        uint8        participantCount;
        uint         date;
        EventOutcome outcome;
        int8         winner;
    }

    // FYI: enum EventOutcome is defind in OracleInterface

    /**
     * @dev Triggered once an event has been added
     */
    event SportEventAdded(
        bytes32      _eventId,
        string       _name,
        string       _participants,
        uint8        _participantCount,
        uint         _date,
        EventOutcome _eventOutcome,
        int8         _winner
    );

    /**
     * @notice Add a new pending sport event into the blockchain
     * @param _name descriptive name for the sport event (e.g. Pac vs. Mayweather 2016)
     * @param _participants |-delimited string of participants names (e.g. "Montpellier|Monaco")
     * @param _participantCount number of participants
     * @param _date date set for the sport event
     * @return the unique id of the newly created sport event
     */
    function addSportEvent(
        string memory _name,
        string memory _participants,
        uint8         _participantCount,
        uint          _date
    ) 
        public onlyOwner nonReentrant
        returns (bytes32)
    {
        bytes memory bytesName = bytes(_name);
        require(bytesName.length > 0, "_name cannot be empty");
        require(
            _date >= block.timestamp + 1 weeks,
            "_date must be >= 1 week from now"
        );

        // Hash key fields of the sport event to get a unique id
        bytes32 eventId = keccak256(abi.encodePacked(_name, _participantCount, _date));

        // Make sure that the sport event is unique and does not exist yet
        require( !eventExists(eventId), "Event already exists");

        // Add the sport event
        events.push( SportEvent(eventId, _name, _participants, _participantCount, _date, EventOutcome.Pending, -1));
        uint newIndex           = events.length - 1;
        eventIdToIndex[eventId] = newIndex + 1;

        emit SportEventAdded(
            eventId,
            _name,
            _participants,
            _participantCount,
            _date,
            EventOutcome.Pending,
            -1                      // no winner yet
        );

        // Return the unique id of the new sport event
        return eventId;
    }

    /**
     * @notice Returns the array index of the sport event with the given id
     * @dev if the event id is invalid, then the return value will be incorrect and may cause error; you must call eventExists(_eventId) first!
     * @param _eventId the sport event id to get
     * @return the array index of this event if it exists or else -1
     */
    function _getMatchIndex(bytes32 _eventId)
        private view
        returns (uint)
    {
        return eventIdToIndex[_eventId] - 1;
    }

    /**
     * @notice Determines whether a sport event exists with the given id
     * @param _eventId the id of a sport event id
     * @return true if sport event exists and its id is valid
     */
    function eventExists(bytes32 _eventId)
        public view override
        returns (bool)
    {
        if (events.length == 0) {
            return false;
        }
        uint index = eventIdToIndex[_eventId];
        return (index > 0);
    }

    /**
     * @notice Sets the outcome of a predefined match, permanently on the blockchain
     * @param _eventId unique id of the match to modify
     * @param _outcome outcome of the match
     * @param _winner 0-based id of the winnner
     */
    function declareOutcome(bytes32 _eventId, EventOutcome _outcome, int8 _winner)
        onlyOwner external
    {
        // Require that it exists
        require(eventExists(_eventId));

        // Get the event
        uint index = _getMatchIndex(_eventId);
        SportEvent storage theMatch = events[index];

        if (_outcome == EventOutcome.Decided)
            require(_winner >= 0 && theMatch.participantCount > uint8(_winner));

        // Set the outcome
        theMatch.outcome = _outcome;

        // Set the winner (if there is one)
        if (_outcome == EventOutcome.Decided)
            theMatch.winner = _winner;
    }

    /**
     * @notice gets the unique ids of all pending events, in reverse chronological order
     * @return an array of unique pending events ids
     */
    function getPendingEvents()
        public view override
        returns (bytes32[] memory)
    {
        uint count = 0;

        // Get the count of pending events
        for (uint i = 0; i < events.length; i = i + 1) {
            if (events[i].outcome == EventOutcome.Pending)
                count = count + 1;
        }

        // Collect up all the pending events
        bytes32[] memory output = new bytes32[](count);

        if (count > 0) {
            uint index = 0;
            for (uint n = events.length;  n > 0;  n = n - 1) {
                if (events[n - 1].outcome == EventOutcome.Pending) {
                    output[index] = events[n - 1].id;
                    index = index + 1;
                }
            }
        }

        return output;
    }

    /**
     * @notice gets the unique ids of events, pending and decided, in reverse chronological order
     * @return an array of unique match ids
     */
    function getAllSportEvents()
        public view override
        returns (bytes32[] memory)
    {
        bytes32[] memory eventIds = new bytes32[](events.length);

        // Collect all event ids
        if (events.length > 0) {
            uint index = 0;
            for (uint n = events.length; n > 0; n = n - 1) {
                eventIds[index = index + 1] = events[n - 1].id;
            }
        }

        return eventIds;
    }

    /**
     * @notice gets the specified sport event and return its data
     * @param _eventId the unique id of the desired event
     * @return id   the id of the event
     * @return name the name of the event
     * @return participants a string with the name of the event's participants separated with a pipe symbol ('|')
     * @return participantCount the number of the event's participants
     * @return date when the event takes place
     * @return outcome an integer that represents the event outcome
     * @return winner the index of the winner
     */
    function getEvent(bytes32 _eventId)
        public view override
        returns (
            bytes32       id,
            string memory name,
            string memory participants,
            uint8         participantCount,
            uint          date,
            EventOutcome  outcome,
            int8          winner
        )
    {
        // Get the sport event
        if (eventExists(_eventId)) {
            SportEvent storage theMatch = events[_getMatchIndex(_eventId)];
            return (theMatch.id, theMatch.name, theMatch.participants, theMatch.participantCount, theMatch.date, theMatch.outcome, theMatch.winner);
        }
        else {
            return (_eventId, "", "", 0, 0, EventOutcome.Pending, -1);
        }
    }

    /**
     * @notice return the data of the most recent sport event
     * @param _pending if true, returns only the most recent pending sport event;
     *   otherwise, returns the most recent sport event either pending or completed
     * @return id   the id of the event
     * @return name the name of the event
     * @return participants a string with the name of the event's participants separated with a pipe symbol ('|')
     * @return participantCount the number of the event's participants
     * @return date when the event takes place
     * @return outcome an integer that represents the event outcome
     * @return winner the index of the winner
     */
    function getLatestEvent(bool _pending)
        public view override
        returns (
            bytes32         id,
            string memory   name,
            string memory   participants,
            uint8           participantCount,
            uint            date,
            EventOutcome    outcome,
            int8            winner
        )
    {
        bytes32          eventId = 0;
        bytes32[] memory ids;

        if (_pending) {
            ids = getPendingEvents();
        } else {
            ids = getAllSportEvents();
        }
        if (ids.length > 0) {
            eventId = ids[0];
        }

        // Return a null sport event by default
        return getEvent(eventId);
    }


    /**
     * @notice gets the address of this contract
     * @return the address of the BetOracle smart-contract
     */
    function getAddress()
        public view
        returns (address)
    {
        return address(this);
    }

    /**
     * @notice can be used by a client contract to ensure that they've connected to this contract interface successfully
     * @return true, unconditionally
     */
    function testConnection()
        public pure override
        returns (bool)
    {
        return true;
    }

}
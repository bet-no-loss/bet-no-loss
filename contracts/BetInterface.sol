// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;


interface BetInterface {

    enum EventOutcome {
        Pending,    //match has not been fought to decision
        Underway,   //match has started & is underway
        Draw,       //anything other than a clear winner (e.g. cancelled)
        Decided     //index of participant who is the winner 
    }

    function getPendingEvents() external view returns (bytes32[] memory);

    function getAllSportEvents() external view returns (bytes32[] memory);

    function eventExists(bytes32 _matchId) external view returns (bool); 

    function getEvent(bytes32 _matchId) external view returns (
        bytes32 id,
        string memory name, 
        string memory participants,
        uint8 participantCount,
        uint date, 
        EventOutcome outcome, 
        int8 winner);

    function getMostRecentEvent(bool _pending) external view returns (
        bytes32 id,
        string memory name, 
        string memory participants,
        uint participantCount,
        uint date, 
        EventOutcome outcome, 
        int8 winner);

    function testConnection() external pure returns (bool);

    function addTestData() external; 
}
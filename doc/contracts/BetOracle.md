## `BetOracle`

Collects and provides information on sport events and their outcomes




### `addSportEvent(string _name, string _participants, uint8 _participantCount, uint256 _date) → bytes32` (public)

Add a new pending sport event into the blockchain




### `eventExists(bytes32 _eventId) → bool` (public)

Determines whether a sport event exists with the given id




### `declareOutcome(bytes32 _eventId, enum BetOracle.EventOutcome _outcome, int8 _winner)` (external)

Sets the outcome of a predefined match, permanently on the blockchain




### `getPendingEvents() → bytes32[]` (public)

gets the unique ids of all pending events, in reverse chronological order




### `getAllSportEvents() → bytes32[]` (public)

gets the unique ids of events, pending and decided, in reverse chronological order




### `getEvent(bytes32 _eventId) → bytes32 id, string name, string participants, uint8 participantCount, uint256 date, enum BetOracle.EventOutcome outcome, int8 winner` (public)

gets the specified sport event and return its data




### `getLatestEvent(bool _pending) → bytes32 id, string name, string participants, uint8 participantCount, uint256 date, enum BetOracle.EventOutcome outcome, int8 winner` (public)

return the data of the most recent sport event




### `getAddress() → address` (public)

gets the address of this contract




### `testConnection() → bool` (public)

can be used by a client contract to ensure that they've connected to this contract interface successfully




### `addTestData()` (public)

for testing purposes only
TODO: Remove me before going live




### `SportEventAdded(bytes32 _eventId, string _name, string _participants, uint8 _participantCount, uint256 _date, enum BetOracle.EventOutcome _eventOutcome, int8 _winner)`



Triggered once an event has been added


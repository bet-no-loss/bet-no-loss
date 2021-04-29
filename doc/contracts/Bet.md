## `Bet`

This Ethereum smart-contract takes bets placed on sport events.  
It then invests all bets deposits for a given event (pot) in DeFi.  
Then once the event outcome is confirmed,
it makes the accrued interests ready for the winners 
to withdraw proportionnaly to their initial stake.  
Players do not loose their stake.

Takes bets and handles payouts for sport events




### `notAddress0(address _address)`



check that the passed in address is not 0.


### `constructor(address _tokenAddress)` (public)





### `getContractDAIBalance() → uint256` (public)





### `deposit(address _sender, uint256 _amount)` (external)

Moves `_amount` tokens from `_sender` to this contract




### `approve(address _spender, uint256 _amount)` (external)

Sets `_amount` as the allowance of `_spender` over the caller's tokens.




### `setOracleAddress(address _oracleAddress) → bool` (external)

sets the address of the sport event bet oracle contract to use 


setting a wrong address may result in false return value, or error 


### `testOracleConnection() → bool` (public)

for testing purposes: make sure that the sport event oracle is callable



### `getOracleAddress() → address` (external)





### `getBettableEvents() → bytes32[] pendingEvents` (public)

gets a list ids of all currently bettable events




### `getEvent(bytes32 _eventId) → bytes32 id, string name, string participants, uint8 participantCount, uint256 date, enum OracleInterface.EventOutcome outcome, int8 winner` (public)

returns the full data of the specified event 




### `getLatestEvent() → bytes32 id, string name, string participants, uint256 participantCount, uint256 date, enum OracleInterface.EventOutcome outcome, int8 winner` (public)

returns the full data of the most recent bettable sport event 




### `placeBet(bytes32 _eventId, uint8 _chosenWinner)` (public)

places a bet on the given event 




### `receive()` (external)

 @notice This smart-contract accepts DAI ERC20 token




### `OracleAddressSet(address _address)`



Sent once the Sport Event Oracle is set

### `BetPlaced(bytes32 _eventId, address _player, uint8 _chosenWinner, uint256 _amount)`



Sent when once a bet is placed


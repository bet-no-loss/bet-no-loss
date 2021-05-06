# Tests

> This document explains for each test why we wrote it and  what it is aimed at.

## Test Environment

We are using:
- [OpenZeppelin test-helpers](https://docs.openzeppelin.com/test-helpers)
- truffle test as a test runner engine
- [chai](https://www.npmjs.com/package/chai) for our TDD assertions

We use the **`expect`** variant in our tests.

## Test Struture

We chose to use exclusively **javascript tests** instead of Solidity unit tests.  
They are **located** beneath the **`test`** folder.  
Each one tests a smart-contract with unit tests and integration tests when interacting with others.  
Inside the test, functions are grouped (using `describe`) by feature, or state or whatever is meaningfull for the reader of the test output depending on the contract.

We check the following for each key function of a smart-contract:
- **pre-requisites** (ie. `require`)
- **happy path**
- **failure cases**

## `test/bet.test.js`

Test the `Bet.sol` smart-contract 
- `Contract Ownership`
    - [x] `has an owner` makes sure `.owner()` returns the address who created it
    - [x] `can transfer ownership` checks that calling `.transferOwnership(newOwner)` makes  `newOwner` the new owner of this contract's intance and an `OwnershipTransfered` event is emitted accordingly.
    - [x] `can renounce ownership if owner` tests when the contract's owner  calls `.renounceOwnership()` it sets address(0) as the new owner and that an `OwnershipTransfered` event is emitted accordingly.
   - [x] `cannot renounce ownership if NOT owner` makes sure only the contract's owner can call `.renounceOwnership()` and if not the `Ownable` access restriction in place reverts the transaction
- `Oracle Handling` (test the interactions with the Events Oracle misnamed `BetOracle` ;-)
    - [x] `can setOracleAddress if owner` makes sure that the contract's owner can call `.setOracleAddress(...)` to set the `BetOracle` address and doing so emits an `OracleAddressSet` event  
    - [x] `cannot setOracleAddress if NOT owner` tests the exact opposite that is a non owner calling this method reverts the transaction due to `Ownable` access restriction with the error `Ownable: caler is not the owner`.
    - [x] `cannot setOracleAddress 0` makes sure that calling `.setOracleAddress(0) is not allowed, reverts the transaction with the Error `Address 0 not allowed`.
    - [ ] `setOracleAddress to a non BetOracle address should revert but halts instead` this one is disabled as calling `.setOracleAddress(...)` on a contract without the `BetOracle` does nothing good and halts, but I cannot figure out how to check this in JS. Maybe testing this is a nonsense due to how Solidity works ie. a blow up is expected in this case.
    - [x] `testOracleConnection returns true when an BetOracle is connected` this is the happy path where calling `Bet.testConnection()` returns `true` when the address of `OracleBet` instance has been set beforehand.
    - [x] `testOracleConnection returns false when an BetOracle is NOT connected` Test the opposite, `.testOracleConnection()` returns `false` when the address of `OracleBet` is not set yet (ie. .when `Bet.setOracleAddress(...)` has not been called yet).
- `Bet on Sport Events` This block contains a `beforeEach` which adds 2 sport events that the `it`/`specify` beneath can use if needed.
    - [ ] `"getEvent: can get an existing event using its id`
    - [ ] `can getLatestEvent`
    - [ ] `can getBettableEvents`
    - [ ] `can test if a bet is valid`
    - [ ] `can check if _eventOpenForBetting`
- `Bets`
    - [ ] `cannot placeBet when amount < minimumBet` Test the minimum amount required is required and reverts the transaction if not with the error `Bet amount must be >= minimum bet`.
    - [ ] `cannot placeBet if event does not exist` makes sure one cannot place a bet on a non existing event
    - [ ] `cannot placeBet if event not open for betting` Checks that an attempt to place a bet on an event that is not yet open for betting reverts the transaction with an error.
    - [ ] `can placeBet` this one tests the happy path when everything is green, ie. a player can place a bet and an BetPlaced event is emitted.
    - [ ] `cannot placeBet from address 0` Checks that the modifier that prevents a bet from address 0 reverts the transaction with an error.
- `DAI`
    - [ ] `getContractDAIBalance()` checks that one can get the DAI balance
    - [ ] `deposit` Checks that a player can deposit DAI
    - [ ] `approve` Checks that allowance is working ok

## `test/betoracle.test.js`
All tests in this suite benefit from a `beforeEach` that instantiates  `BetOracle` before each test run.

- `Adding Events`
    - [x] `can addSportEvent if OWNER` makes sure only the contract's creator (aka. owner) can add a new event and when doing so emits a `SportEventAdded` event.
    - [x] `cannot addSportEvent if NOT owner` makes sure the transaction reverts when a non owner address attempts to add a new event (due to OpenZeppelin `Ownable` access protection). In this case the error is `Ownable: caller is not the owner`.
    - [x] `cannot add an existing Event` checks that the owner cannot add an event that already exists as this reverts the transaction with the `Event already exists` error.
- `Getting Events` All tests in this block benefit from a `beforeEach` that adds 3 events 
    - [x] `getEvent: can get an existing event`
    - [x] `getEvent: can get a NON existing event`
    - [x] `eventExists(eventId) returns false when there is NO event with this id`
    - [x] `eventExists(eventId) returns false when there is NO event with this id`
    - [x] `eventExists(eventId) returns true when there is an event with this id`
    - `getLatestEvent`
        - [ ] `getLatestEvent(true) returns the most recent Pending event if one`
        - [ ] `getAllSportEvents`
        - [ ] `can getPendingEvents`
- `Event Outcome`
    - [ ] `declareOutcome`
- `Helper Functions`
getAddress() returns the address of this contract's instance
    - [ ] `getAddress() returns the address of this contract's instance`
    - [ ] `testConnection() always returns true`
    - [ ] `addTestData`

## `test/dai.test.js`

Test the `DAI` token.  
All tests benefit from a `beforeEach` that instantiates  `DAI` before each test run.

- [x] `has a name` test that `.name()` returns the name value passed in to the constructor when the DAI was instantiated.
- [x] `has a symbol` checks that `.symbol()` returns the the same symbol passed in to the constructor when instantiating a DAI.
- [x] `has 18 decimals` make sure that `decimal()` returns `18`, identical to what was set in the constructor.
- [x] `has a totalSupply` test that `.totalSuply()` returns the total supply set in the DAI's constructor, ie. `100 * 10^18`.
- [x] `allow the total supply to the owner` checks the total supply is allowed to the DAI contracts's owner (ie. the address which deployed `DAI`).

## `test/defipool.test.js`

Check that we can deposit, withdraw and get the contact's balance.

- [ ] `can deposit if owner`
- [ ] `can deposit if NOT owner`
- [ ] `can withdraw`
- [ ] `can get contract's balance`
# Tests

> This document explains for each test why we wrote it and  what it is aimed at.


## Test Struture

We chose to use exclusively **javascript tests** instead of Solidity unit tests.  
They are **located** beneath the **`test`** folder.  
Most of them test smart-contracts and contains mostly unit tests. Some contains integration tests and will be mentionned as such below.  
Inside the test, functions are grouped (using `describe`) by feature, or state or whatever is meaningfull for the reader of the test output depending on the contract.

We check the following for each key function of a smart-contract:
- **pre-requisites** (ie. `require`)
- **happy path**
- **failure cases** (like exceptions for instance).

## `test/bet.test.js`

Test the `Bet.sol` smart-contract 


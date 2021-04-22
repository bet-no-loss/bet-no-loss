# Tests

> This document explains for each test why we wrote it and  what it is aimed at.

## Test Environment

We are using:
- [OpenZeppelin tet-helpers](https://docs.openzeppelin.com/test-helpers)
- [OpenZeppelin test environment](https://docs.openzeppelin.com/test-environment/) instead of *truffle test*, because we were tired of waiting for the test suite to run and it is more configurable. Now it is way faster, the next step will be to replace *Mocha* with *Jest*.
- [mocha](https://www.npmjs.com/package/mocha) as a test runner
- [chai](https://www.npmjs.com/package/chai) for our TDD assertions


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


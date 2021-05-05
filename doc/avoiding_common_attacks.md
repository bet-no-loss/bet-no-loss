# Avoiding Common Attacks

Here are the measures we have taken to make our smart-contracts as resistant as possible to common attacks and potential hacks.

[Reference](https://solidity-by-example.org)

## Re-Entrancy

We prevent (nested) re-entrant calls to payable functions in our contracts using the `nonReentrant` modifier from OpenZeppelin's `ReentrancyGuard` contract.

[Reference](https://solidity-by-example.org/hacks/re-entrancy/)


## Arithmetic Overflow and Underflow

We no longer use `SaFeMath` from *@openzeppelin*  since we have upgraded [Solidity to 0.8](https://docs.soliditylang.org/en/v0.8.3/080-breaking-changes.html) which handles this natively.
> Arithmetic operations revert on underflow and overflow. 
> Checks for overflow are very common, so we made them the default to increase readability of code, even if it comes at a slight increase of gas costs.

[Reference](https://solidity-by-example.org/hacks/overflow/)

## Selfdestruct

An arbitrary contract could call `selfdestruct` to send all its remaining Ether stored in this contract to the  address of one of our contracts. This attack could impact the code using `address(this).balance`.  
See [Issue#40](https://github.com/bet-no-loss/bet-no-loss/issues/40)

[Reference](https://solidity-by-example.org/hacks/self-destruct/)


## Accessing Private Data

We do not store any sensitive data in storage to prevent anyone from reading private data of our smart-contract and be able to get a hold on key information.

[Reference](https://solidity-by-example.org/hacks/accessing-private-data/)


## Delegatecall

We dot use directly `delegatecall`.

[Reference](https://solidity-by-example.org/hacks/delegatecall/)


## Source of Randomness

We do not use `block.timestamp` to compute a random number.

[Reference](https://solidity-by-example.org/hacks/randomness/)

## Denial of Service

We use **pull over push** that is the contract does not distribute/send the rewards to the winnners. They claim their prize themselves.

[Reference](https://solidity-by-example.org/hacks/denial-of-service/)

## Phishing with tx.origin

We do not use directly `tx.origin` in our contracts.

## Block Timestamp Manipulation

We dot use `block.timestamp` as a source of entropy or random number. Sometimes we do use it to check that a passed in date is one week from now, which is way greater than the ~13-15 seconds interval in between 2 Ethereum blocks.

[Reference](https://solidity-by-example.org/hacks/block-timestamp-manipulation/)
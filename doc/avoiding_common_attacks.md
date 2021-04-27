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


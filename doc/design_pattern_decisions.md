# Design Pattern Decisions

This section explains why we chose the design patterns we are using in the code. 

[Reference](https://fravoll.github.io/solidity-patterns/)

## Access Restriction

We restrict acces to the key `Bet` contract functionalities only to the owner ie. the Ethereum address who deployed this contract:
- setting the adresse of the `BetOracle` contract instance to interact with.

We use the `onlyOwner` modifier from [Openzeppelin's `Ownable` contract](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.0.0/contracts/access/Ownable.sol)  for this purpose.

[Reference](https://fravoll.github.io/solidity-patterns/access_restriction.html)

## Oracle

For now, we **mock** an Oracle providing functions to:
- declare an event
- list all registered events
- get the latest event
- declare an event outcome
- get the outcome of an event

After the MVP, we will interconnect with an existing Oracle that makes available on-chain the results of sport events.

[Reference](https://fravoll.github.io/solidity-patterns/oracle.html)

## Pull over Push

We use *Pull over Push* so that players handle withdrawal (stake, gains) on their own.

[Reference](https://fravoll.github.io/solidity-patterns/pull_over_push.html)



## Solidity version 0.8

We have decided to switch to the latest Solidity version (0.8+) since OpenZeppelin supports it.
 **[Solidity version `0.8.3`**](https://github.com/ethereum/solidity/releases/tag/v0.8.3) as it is fixes an important bug in 0.8.2 
> Optimizer: Fix bug on incorrect caching of Keccak-256 has

## Repository and Source Code

We have a **mono-repo, that** is a single repository.
It **entails both the front-end and back-end** source code.

## Deployment

The ReactJS **front-end** (DApp) is automatically **deployed on Heroku** each time the `master` branch is pushed.

[Read more..](README.md#deploy-front-end)


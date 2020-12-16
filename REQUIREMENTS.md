# Alyra Final Project's Requirements


## User Interface 

Your project must:
- be a Truffle projet
- use Truffle's `react` box
- contain a Readme that:
    - introduces the projet and its concept(s)
    - details its features
    - describe how to install and launch it
- have the following features: 
    - display the current Ethereum account
    - sign transactions 
    - interact with your contract's state
    - display your contract's state
- de deployed on *Heroku* and you must be able to open a URL to interact with the application

You must provide us with a link to your **Github** repository that must be **public**. 


## Smart Contracts

Your smart-contracts must:
- use the latest compiler version
- contains comments in accordance to [Solidity's official documentation](https://solidity.readthedocs.io/en/v0.4.21/layout-of-source-files.html#comments)
- generate a **README** per smart-contract using  **NatSpec**
- be **secured** and **optimized**

Your project must:
- contain a file named `avoiding_common_attacks.md` explaining the measures you took to prevent the **security breaches**
- contain a file named `deployed_addresses.md` with the differents **addresses of your smart-contrats** on the aforementioned testnet
- You application must be **deployed** on an **Ethereum testnet** (FYI: the smart-contracts must be déployed with Truffle) 
- use the packages `dotenv` and `@truffle/hdwallet-provider`


## Tests

You project must:

- contain integration tests for each smart-contract
- contain a file named `tests_explication.md` explaining  **why you wrote these thests**


## ⭐️ Bonus

A file named `design_pattern_desicions.md` if present to list which **design patterns** you chose and why.
This [link](https://fravoll.github.io/solidity-patterns/) may help. 


## Example (Git Repository)

You can find [here](https://github.com/Alyra-school/projet-final) an example of the expected directory tree including the expected items. 
You can then clone it to bootstrap your project.


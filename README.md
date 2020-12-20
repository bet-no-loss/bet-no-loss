# Bet-no-loss


## Description

TODO: Description + concepts

### Links

* [Trello](https://trello.com/b/c6Xhe5hM/project-pari-no-loss)
* [Google Drive](https://drive.google.com/drive/folders/1Pr22-VTGNVREl7AUdPy1f77OxrgqNvgO)
* [Github](https://github.com/bet-no-loss)
* Discord: `#pari-no-loss` channel on the discord Server named *"La Boite a Idee pour un projet commun Alyra"*

## Features

TODO


# Install

```
cd $DEV

git clone git@github.com:bet-no-loss/bet-no-loss.git
cd bet-no-loss

npm install
```

# Configure

In order to deploy to the test networks or the main network you need to:

- Create a `.env` file in the project's home folder  
- Edit `.env` and set the below `property = "value"` pairs (one per line):

```
MNEMONIC          = "TODO_enter_your_own_12_words_seed_here"
INFURA_PROJECT_ID = "TODO_infura_project_id_here"
```

Keep in mind to surround each value with double quotes.

# Compile

```
npx truffle compile
```

# Run

TODO


# Test

TODO

# Decisions

- Crypto-currency used: DAI
- DeFi Service used: to be determined Compound or AAVE ?
- No Back-Office for now.  
  As we focus only on having a running project with smart contract + front-office.
  This means in order to add events the owner calls the ad-hoc smart-contract's functions.

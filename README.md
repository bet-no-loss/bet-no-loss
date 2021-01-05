# Bet-no-loss

> Tagline: Bet on a sport event without loosing your stake and get rewarded if you win.

## Description

You bet on a sport event during week 1.  
The total amount of bets (all players included) is then staked in DeFi during week 2.  
Finally at the end of week 3, each winner has the opportunity to withdraw the accrued interests in DeFi proportionally to what he/she staked minus the bet-no-loss fee.


### Links

* [DaPP Heroku](https://bet-no-loss.herokuapp.com/)
* [Github](https://github.com/bet-no-loss/bet-no-loss/)
* [Issues](https://github.com/bet-no-loss/bet-no-loss/issues)
* [Trello](https://trello.com/b/c6Xhe5hM)
* [Google Drive](https://drive.google.com/drive/folders/1Pr22-VTGNVREl7AUdPy1f77OxrgqNvgO)
* [Github](https://github.com/bet-no-loss)
* Discord: `#pari-no-loss` channel on the discord Server named *"La Boite a Idee pour un projet commun Alyra"*
* [YouTube Playlist](https://www.youtube.com/playlist?list=PLNwicjhsnUEooeRnNgrkV0TH6m21F3jpA) 

## Features

TODO


# Install

```
cd $DEV

git clone git@github.com:bet-no-loss/bet-no-loss.git
cd bet-no-loss
```

# Configure

```
npm install -g truffle
npm install
```

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
truffle compile
```

# Run

TODO


# Test

Run ganache on port 7545.

```
truffle compile
truffle deploy --reset --network ganache
```
TODO

# Decisions

- Crypto-currency used: DAI
- DeFi Service used: For now none, due to time constraints we will stub them. Later on: Compound or AAVE ?
- No Back-Office for now.  
  As we focus only on having a running project with smart contract + front-office.
  This means in order to add events the owner calls the ad-hoc smart-contract's functions.

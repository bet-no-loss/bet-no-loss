// SPDX-License-Identifier: MIT
pragma solidity 0.8.3;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Play {
    
    IERC20 Dai;
    
    SportEvent[] public events;
    
    struct SportEvent {
        string       name;
        string       teamA;
        string       teamB;
        uint         date;
        string       winner;
    }
    
    constructor(address _tokenAddress) {
        Dai = IERC20(_tokenAddress);
    } 
      
    
}
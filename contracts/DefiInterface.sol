// SPDX-License-Identifier: MIT
pragma solidity 0.8.3;

interface DefiInterface {

    function deposit(uint _amount, address _sender) 
    external payable;

    function withdraw(address _user)
    external payable;

    function getContractBalance()
    external view
    returns (uint256);
 
}

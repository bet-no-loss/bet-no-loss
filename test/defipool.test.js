//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Test DefiPool smart-contract
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const { expectEvent, expectRevert, BN } = require('@openzeppelin/test-helpers');
const constants   = require('@openzeppelin/test-helpers/src/constants');
const { web3 } = require('@openzeppelin/test-helpers/src/setup');
const { expect, assert }  = require('chai');

const DAI      = artifacts.require('DAI');
const DefiPool = artifacts.require('DefiPool');

contract('DefiPool', function(accounts) {
    "use strict";

    const [ownerAddress, address1, address2, address3] = accounts;
    const daiTotalSupply = web3.utils.toWei(new BN(100), "ether");


    beforeEach("Instantiate a DefiPool contract", async function() {
        this.daiInstance = await DAI.new(
            "Dai Stablecoin", 
            "DAI", 
            {from: ownerAddress}
        );

        this.defiPoolInstance = await DefiPool.new(
            await this.daiInstance.address,
            {from: ownerAddress}
        );
    });

    it.skip("getContractBalance is 0 for an address that not deposited yet", async function() {
        expect(await this.defiPoolInstance.getContractBalance())
            .to.be.a.bignumber
            .equal(new BN(0));
    });

    it("cannot deposit whithout any allowance", async function() {
        await expectRevert(
            this.defiPoolInstance.deposit(
                web3.utils.toWei(new BN(11), "ether"),
                ownerAddress,
                {from: ownerAddress}
            ),
            "ERC20: transfer amount exceeds allowance"
        );
    });

    it.skip("cannot deposit less than 10 DAI", async function() {
        const approved = await this.defiPoolInstance.approve(
            address1,
            web3.utils.toWei(new BN(15), 'ether')
        );

        await expectRevert(
            this.defiPoolInstance.deposit(
                web3.utils.toWei(new BN(9), "ether"),
                ownerAddress,
                {from: ownerAddress}
            ),
            "Error, deposit must be >= 10 DAI"
        );
    });

    it.only("can deposit if owner", async function() {
        // const approved = await this.defiPoolInstance.approve(
        //     ownerAddress,
        //     web3.utils.toWei(new BN(15), 'ether')
        // );

        const depositAmount = web3.utils.toWei('10', 'ether');

        const tx = await this.defiPoolInstance.deposit(
            depositAmount,
            ownerAddress,
            {from: ownerAddress}
        );

    });
    
    it("can withdraw");
});

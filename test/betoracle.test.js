//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Test BetOracle smart-contract
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const { expectEvent, expectRevert, BN } = require('@openzeppelin/test-helpers');
const { expect }       = require('chai');
const moment           = require('moment');

const BetOracle = artifacts.require('BetOracle');


contract('BetOracle', function(accounts) {

    const ownerAddress = accounts[0];
    const address1     = accounts[1];
    const address2     = accounts[2];
    const address3     = accounts[3];

    // Instantiate a new contract before running each test in this suite
    beforeEach(async function () {
        this.betOracleInstance = await BetOracle.new( {from: ownerAddress});
    })


    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Oracle Association
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    describe("TODO", async function() {

        it ("TODO");
    })

})

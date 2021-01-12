//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Test Bet2 smart-contract
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const { expectEvent, expectRevert, BN } = require('@openzeppelin/test-helpers');
const { expect }       = require('chai');
const moment           = require('moment');

const Bet2 = artifacts.require('Bet2');


contract('Bet2', function(accounts) {

    const ownerAddress = accounts[0];
    const address1     = accounts[1];
    const address2     = accounts[2];
    const address3     = accounts[3];

    // Instantiate a new Bet2 contract before running each test in this suite
    beforeEach(async function () {
        this.betInstance = await Bet2.new( {from: ownerAddress});
    })


    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Oracle Association
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    describe("Oracle Association", function() {

        it ("can set an Oracle if owner");
        it ("cannot set an Oracle if NOT owner");
        it ("can test the connection to the Oracle");
        it ("can get the Oracle address");
    })

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Sport Events
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    describe("Sport Events", function() {

        it ("can retrieve the bettable sport events");
        it ("can test if a bet is valid");
        it ("can get a specific sport event");
        it ("can get the latest sport event");
        it ("");
    })
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Bets
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    it ("can place a bet");

})

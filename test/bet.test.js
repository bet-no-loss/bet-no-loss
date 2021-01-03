//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Test Bet smart-contract
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const { expectEvent, expectRevert, BN } = require('@openzeppelin/test-helpers');
const { expect }       = require('chai');
const moment           = require('moment');

const Bet = artifacts.require('Bet');


contract('Bet', function(accounts) {

    const ownerAddress = accounts[0];
    const address1     = accounts[1];
    const address2     = accounts[2];
    const address3     = accounts[3];

    // Instantiate a new Bet contract before running each test in this suite
    beforeEach(async function () {
        this.betInstance = await Bet.new( {from: ownerAddress});
    })


    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Sport Events
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    describe("Sport Events Handling", function() {

        it ("can create a sport event if owner", async function() {
            const eventDate        = moment().add(7, 'days').add(1, 'minute');
            const eventOutcomeDate = moment(eventDate).add(1, 'day').add(1, 'minute');
            const eventName        = "PSG - Marseille, 2020-10-01 @Velodrome";
            // console.debug("////////", eventDate.format());            
            // console.debug("///////", eventOutcomeDate.format());

            const result = await this.betInstance.createSportEvent(
                eventName,
                new BN(eventDate.unix()),
                new BN(eventOutcomeDate.unix()),
                { from: ownerAddress }       
            );

            expectEvent(result, "SportEventCreated");
        });

        it ("cannot create a sport event if NOT owner", async function() {
            const eventDate        = moment().add(7, 'days').add(1, 'minute');
            const eventOutcomeDate = moment(eventDate).add(1, 'day').add(1, 'minute');
   
            const eventName        = "PSG - Marseille, 2020-10-01 @Velodrome";
            const notOwnerAddress  = address2;

            await expectRevert(
                this.betInstance.createSportEvent(
                    eventName,
                    new BN(eventDate.unix()),
                    new BN(eventOutcomeDate.unix()),
                    { from: notOwnerAddress }       
                ),
                "Ownable: caller is not the owner"
            );
        });

        it ("can can be notifed of the outcome of a sport event");
    })

})

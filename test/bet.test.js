//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Test Bet smart-contract
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const { expectEvent, expectRevert, BN } = require('@openzeppelin/test-helpers');
const { expect }       = require('chai');

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
            const eventDate = new Date()
            eventDate.setDate(new Date().getDate() + 7);
            eventDate.setMinutes(eventDate.getMinutes() + 1);

            const eventDateSeconds = Math.floor(eventDate.getTime() / 1000.0);
            const eventDateBN = new BN(eventDateSeconds);
            // console.debug("////////", eventDateSeconds);
            
            const eventOutcomeDate = new Date();
            eventOutcomeDate.setDate(eventDate.getDate() + 1);
            eventOutcomeDate.setMinutes(eventOutcomeDate.getMinutes() + 1);

            const eventOutcomeDateSeconds = Math.floor(eventOutcomeDate.getTime() / 1000.0);
            const eventOutcomeDateBN = new BN(eventDateSeconds);
            // console.debug("///////", eventOutcomeDateSeconds);

            const eventName = "PSG - Marseille, 2020-10-01 @Velodrome";

            const result = await this.betInstance.createSportEvent(
                eventName,
                eventDateBN,
                eventOutcomeDateBN,
                { from: ownerAddress }       
            );

            expectEvent(result, "SportEventCreated");
        });

        it ("cannot create a sport event if NOT owner", async function() {
            const eventDate = new Date()
            eventDate.setDate(new Date().getDate() + 7);
            eventDate.setMinutes(eventDate.getMinutes() + 1);

            const eventDateSeconds = Math.floor(eventDate.getTime() / 1000.0);
            const eventDateBN = new BN(eventDateSeconds);
   
            const eventOutcomeDate = new Date();
            eventOutcomeDate.setDate(eventDate.getDate() + 1);
            eventOutcomeDate.setMinutes(eventOutcomeDate.getMinutes() + 1);

            const eventOutcomeDateSeconds = Math.floor(eventOutcomeDate.getTime() / 1000.0);
            const eventOutcomeDateBN = new BN(eventDateSeconds);

            const eventName = "PSG - Marseille, 2020-10-01 @Velodrome";
            const notOwnerAddress = address2;

            await expectRevert(
                this.betInstance.createSportEvent(
                    eventName,
                    eventDateBN,
                    eventOutcomeDateBN,
                    { from: notOwnerAddress }       
                ),
                "Ownable: caller is not the owner"
            );
        });

        it ("can can be notifed of the outcome of a sport event");
    })

})

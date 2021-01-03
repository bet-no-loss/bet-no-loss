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
    // Sport Events Creation
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    describe("Sport Events Creation", function() {

        it ("can create a sport event if owner", async function() {
            const eventDate        = moment().add(7, 'days').add(1, 'minute');
            const eventOutcomeDate = moment(eventDate).add(1, 'day').add(1, 'minute');
            const eventName        = "PSG - Marseille, 2020-10-01 @Velodrome";

            const result = await this.betInstance.createSportEvent(
                eventName,
                new BN(eventDate.unix()),
                new BN(eventOutcomeDate.unix()),
                { from: ownerAddress }       
            );

            expectEvent(result, "SportEventCreated", {
                _eventId:          new BN(1),
                _eventName:        eventName,
                _eventDate:        new BN(eventDate.unix()),
                _eventOutcomeDate: new BN(eventOutcomeDate.unix())
            });
        });

        it ("can create several sport events", async function() {
            // Create event #1
            const eventDate        = moment().add(7, 'days').add(1, 'minute');
            const eventOutcomeDate = moment(eventDate).add(1, 'day').add(1, 'minute');
            const eventName        = "PSG - Marseille, 2022-10-01 @Velodrome";

            const result = await this.betInstance.createSportEvent(
                eventName,
                new BN(eventDate.unix()),
                new BN(eventOutcomeDate.unix()),
                { from: ownerAddress }       
            );

            // Create event #2
            const event2Date        = moment().add(7, 'days').add(1, 'minute');
            const event2OutcomeDate = moment(eventDate).add(1, 'day').add(1, 'minute');
            const event2Name        = "Marseille - PSG, 2023-05-01 @Parc des Princes";

            const result2 = await this.betInstance.createSportEvent(
                event2Name,
                new BN(event2Date.unix()),
                new BN(event2OutcomeDate.unix()),
                { from: ownerAddress }       
            );

            expectEvent(result2, "SportEventCreated", {
                _eventId:          new BN(2),
                _eventName:        event2Name,
                _eventDate:        new BN(event2Date.unix()),
                _eventOutcomeDate: new BN(event2OutcomeDate.unix())
            });
        });

        it ("cannot create a sport event if NOT owner", async function() {
            const eventDate        = moment().add(7, 'days').add(1, 'minute');
            const eventOutcomeDate = moment(eventDate).add(1, 'day').add(1, 'minute');
   
            const notOwnerAddress  = address2;

            await expectRevert(
                this.betInstance.createSportEvent(
                    "Event name",
                    new BN(eventDate.unix()),
                    new BN(eventOutcomeDate.unix()),
                    { from: notOwnerAddress }       
                ),
                "Ownable: caller is not the owner"
            );
        });

        it ("cannot create a sport event occuring in less than 7 days", async function() {
            const eventDate        = moment().add(7, 'days').subtract(1, 'minute');
            const eventOutcomeDate = moment(eventDate).add(1, 'day').add(1, 'minute');   

            await expectRevert(
                this.betInstance.createSportEvent(
                    "Event name",
                    new BN(eventDate.unix()),
                    new BN(eventOutcomeDate.unix()),
                    { from: ownerAddress }       
                ),
                "Event date must be >= 1 week from now"
            );
        });

        it ("cannot create a sport event whose date is in the past", async function() {
            const eventDateBeforeNow = moment().subtract(7, 'day');
            const eventOutcomeDate   = moment().add(7, 'days').add(1, 'minute');   

            await expectRevert(
                this.betInstance.createSportEvent(
                    "Event name",
                    new BN(eventDateBeforeNow.unix()),
                    new BN(eventOutcomeDate.unix()),
                    { from: ownerAddress }       
                ),
                "Event date must be >= 1 week from now"
            );
        });

        it ("cannot create a sport event whose outcome date is less than 7 days from now", async function() {
            const eventDateBeforeNow = moment().add(7, 'day').add(1, 'minute');
            const eventOutcomeDate   = moment(eventDateBeforeNow).subtract(2, 'minutes');   

            await expectRevert(
                this.betInstance.createSportEvent(
                    "Event name",
                    new BN(eventDateBeforeNow.unix()),
                    new BN(eventOutcomeDate.unix()),
                    { from: ownerAddress }       
                ),
                "Event Outcome available date must be > 1 week from now"
            );
        });

        it ("cannot create a sport event that has already been registered with the same name", async function () {
            const eventDate        = moment().add(7, 'days').add(1, 'minute');
            const eventOutcomeDate = moment(eventDate).add(1, 'day').add(1, 'minute');
            const eventName        = "Event Name";

            const result = await this.betInstance.createSportEvent(
                eventName,
                new BN(eventDate.unix()),
                new BN(eventOutcomeDate.unix()),
                { from: ownerAddress }       
            );

            await expectRevert(
                this.betInstance.createSportEvent(
                    eventName,
                    new BN(eventDate.unix()),
                    new BN(eventOutcomeDate.unix()),
                    { from: ownerAddress }       
                ),
                "This event name already exists, choose another one"
            );
        });

        it ("can can be notifed of the outcome of a sport event");
    })

})

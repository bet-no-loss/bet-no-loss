 //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Test Bet smart-contract
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const { expectEvent, expectRevert, BN } = require('@openzeppelin/test-helpers');
const constants = require('@openzeppelin/test-helpers/src/constants');
const { expect }       = require('chai');
// const moment           = require('moment');

const Bet      = artifacts.require('Bet');
const BetOracle = artifacts.require('BetOracle');


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
    // Set and Get Oracle Address
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    describe("Set and Get OracleAddress", function() {

        beforeEach(async function () {
            this.betOracleInstance = await BetOracle.new( {from: ownerAddress});
        })

        it ("can setOracleAddress if owner", async function () {
            const expectedOracleAddress = await this.betOracleInstance.getAddress();

            const result = await this.betInstance.setOracleAddress(
                expectedOracleAddress,
                { from: ownerAddress }       
            );
            expect(Boolean(result)).to.be.true;

            expectEvent(result, "OracleAddressSet", {
                _address: expectedOracleAddress
            });

            const actualOracleAddress = await this.betInstance.getOracleAddress(
                { from: ownerAddress }       
            );

            expect(actualOracleAddress)
                .to.be.equal(expectedOracleAddress);
        });

        it ("cannot setOracleAddress if NOT owner", async function() {
            const notOwnerAddress  = address1;

            await expectRevert(
                this.betInstance.setOracleAddress(
                    '0x1234567890123456789012345678901234567890',
                    { from: notOwnerAddress }       
                ),
                "Ownable: caller is not the owner"
            );
        });

        it ("cannot setOracleAddress 0", async function() {
            await expectRevert(
                this.betInstance.setOracleAddress(
                    constants.ZERO_ADDRESS,
                    { from: ownerAddress }       
                ),
                "Address 0 is not allowed"
            );
        });

        specify ("setOracleAddress to a non BetOracle address reverts", async function() {
            const notOracleAddress = '0x1234567890123456789012345678901234567890';

            await expectRevert.unspecified( 
                this.betInstance.setOracleAddress(
                    notOracleAddress,
                    { from: ownerAddress }
                )
            );
        });

        it ("can testOracleConnection", async function () {
            const oracleAddress = await this.betOracleInstance.getAddress();

            const result = await this.betInstance.setOracleAddress(
                oracleAddress,
                { from: ownerAddress }       
            );

            expectEvent(result, "OracleAddressSet", {
                _address: oracleAddress
            });

            const isOracleConnected = await this.betInstance.testOracleConnection(
                { from: ownerAddress }       
            );

            expect(Boolean(isOracleConnected)).to.be.true;
        });
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




// TODO Remove me once the above is ok.
// //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// // Test Bet smart-contract
// //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// const { expectEvent, expectRevert, BN } = require('@openzeppelin/test-helpers');
// const { expect }       = require('chai');
// const moment           = require('moment');

// const Bet = artifacts.require('Bet');


// contract('Bet', function(accounts) {

//     const ownerAddress = accounts[0];
//     const address1     = accounts[1];
//     const address2     = accounts[2];
//     const address3     = accounts[3];

//     // Instantiate a new Bet contract before running each test in this suite
//     beforeEach(async function () {
//         this.betInstance = await Bet.new( {from: ownerAddress});
//     })


//     // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//     // Sport Events Creation
//     // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//     xdescribe("Sport Events Creation", function() {

//         it ("can create a sport event if owner", async function() {
//             const eventDate        = moment().add(7, 'days').add(1, 'minute');
//             const eventOutcomeDate = moment(eventDate).add(1, 'day').add(1, 'minute');
//             const eventName        = "PSG - Marseille, 2020-10-01 @Velodrome";

//             const result = await this.betInstance.createSportEvent(
//                 eventName,
//                 new BN(eventDate.unix()),
//                 new BN(eventOutcomeDate.unix()),
//                 { from: ownerAddress }       
//             );

//             expectEvent(result, "SportEventCreated", {
//                 _eventId:          new BN(1),
//                 _eventName:        eventName,
//                 _eventDate:        new BN(eventDate.unix()),
//                 _eventOutcomeDate: new BN(eventOutcomeDate.unix())
//             });
//         });

//         it ("can create several sport events", async function() {
//             // Create event #1
//             const eventDate        = moment().add(7, 'days').add(1, 'minute');
//             const eventOutcomeDate = moment(eventDate).add(1, 'day').add(1, 'minute');
//             const eventName        = "PSG - Marseille, 2022-10-01 @Velodrome";

//             const result = await this.betInstance.createSportEvent(
//                 eventName,
//                 new BN(eventDate.unix()),
//                 new BN(eventOutcomeDate.unix()),
//                 { from: ownerAddress }       
//             );

//             // Create event #2
//             const event2Date        = moment().add(7, 'days').add(1, 'minute');
//             const event2OutcomeDate = moment(eventDate).add(1, 'day').add(1, 'minute');
//             const event2Name        = "Marseille - PSG, 2023-05-01 @Parc des Princes";

//             const result2 = await this.betInstance.createSportEvent(
//                 event2Name,
//                 new BN(event2Date.unix()),
//                 new BN(event2OutcomeDate.unix()),
//                 { from: ownerAddress }       
//             );

//             expectEvent(result2, "SportEventCreated", {
//                 _eventId:          new BN(2),
//                 _eventName:        event2Name,
//                 _eventDate:        new BN(event2Date.unix()),
//                 _eventOutcomeDate: new BN(event2OutcomeDate.unix())
//             });
//         });

//         it ("cannot create a sport event if NOT owner", async function() {
//             const eventDate        = moment().add(7, 'days').add(1, 'minute');
//             const eventOutcomeDate = moment(eventDate).add(1, 'day').add(1, 'minute');
   
//             const notOwnerAddress  = address2;

//             await expectRevert(
//                 this.betInstance.createSportEvent(
//                     "Event name",
//                     new BN(eventDate.unix()),
//                     new BN(eventOutcomeDate.unix()),
//                     { from: notOwnerAddress }       
//                 ),
//                 "Ownable: caller is not the owner"
//             );
//         });

//         it ("cannot create a sport event occuring in less than 7 days", async function() {
//             const eventDate        = moment().add(7, 'days').subtract(1, 'minute');
//             const eventOutcomeDate = moment(eventDate).add(1, 'day').add(1, 'minute');   

//             await expectRevert(
//                 this.betInstance.createSportEvent(
//                     "Event name",
//                     new BN(eventDate.unix()),
//                     new BN(eventOutcomeDate.unix()),
//                     { from: ownerAddress }       
//                 ),
//                 "Event date must be >= 1 week from now"
//             );
//         });

//         it ("cannot create a sport event whose date is in the past", async function() {
//             const eventDateBeforeNow = moment().subtract(7, 'day');
//             const eventOutcomeDate   = moment().add(7, 'days').add(1, 'minute');   

//             await expectRevert(
//                 this.betInstance.createSportEvent(
//                     "Event name",
//                     new BN(eventDateBeforeNow.unix()),
//                     new BN(eventOutcomeDate.unix()),
//                     { from: ownerAddress }       
//                 ),
//                 "Event date must be >= 1 week from now"
//             );
//         });

//         it ("cannot create a sport event whose outcome date is less than 7 days from now", async function() {
//             const eventDateBeforeNow = moment().add(7, 'day').add(1, 'minute');
//             const eventOutcomeDate   = moment(eventDateBeforeNow).subtract(2, 'minutes');   

//             await expectRevert(
//                 this.betInstance.createSportEvent(
//                     "Event name",
//                     new BN(eventDateBeforeNow.unix()),
//                     new BN(eventOutcomeDate.unix()),
//                     { from: ownerAddress }       
//                 ),
//                 "Event Outcome available date must be > 1 week from now"
//             );
//         });

//         it ("cannot create a sport event that has already been registered with the same name", async function () {
//             const eventDate        = moment().add(7, 'days').add(1, 'minute');
//             const eventOutcomeDate = moment(eventDate).add(1, 'day').add(1, 'minute');
//             const eventName        = "Event Name";

//             const result = await this.betInstance.createSportEvent(
//                 eventName,
//                 new BN(eventDate.unix()),
//                 new BN(eventOutcomeDate.unix()),
//                 { from: ownerAddress }       
//             );

//             await expectRevert(
//                 this.betInstance.createSportEvent(
//                     eventName,
//                     new BN(eventDate.unix()),
//                     new BN(eventOutcomeDate.unix()),
//                     { from: ownerAddress }       
//                 ),
//                 "This event name already exists, choose another one"
//             );
//         });

//         it ("can can be notifed of the outcome of a sport event");
//     })

// })

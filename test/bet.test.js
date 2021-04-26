//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Test Bet smart-contract
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const { expectEvent, expectRevert, BN } = require('@openzeppelin/test-helpers');
const constants   = require('@openzeppelin/test-helpers/src/constants');
const { expect, assert }  = require('chai');
const { DateTime } = require('luxon');
const pretty       = require('js-object-pretty-print').pretty;

const Dai       = artifacts.require('DAI');
const Bet       = artifacts.require('Bet');
const BetOracle = artifacts.require('BetOracle');

contract('Bet', async function(accounts) {
    "use strict";

    const [ownerAddress, address1, address2, address3] = accounts;

    // Instantiate a new Bet contract before running each test in this suite
    beforeEach("Create our Smart-Contracts", async function () {
        this.daiInstance       = await Dai.new("Dai Stablecoin", "DAI", {from: ownerAddress});
        const daiAddress       = await this.daiInstance.address;

        this.betInstance       = await Bet.new(daiAddress, {from: ownerAddress});
        this.betOracleInstance = await BetOracle.new( {from: ownerAddress});
    })
    

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Contract Ownership
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    describe("Contract Ownership", function() {

        it ("has an owner", async function() {
            expect(await this.betInstance.owner())
                .to.equal(ownerAddress)
            ;
        });

        it("can transfer ownership", async function() {
            const newOwner = address3;
            
            const tx = await this.betInstance.transferOwnership(
                newOwner,
                {from: ownerAddress}
            );
            
            expectEvent(tx, "OwnershipTransferred",
                {
                    previousOwner: ownerAddress,
                    newOwner:      newOwner
                }
            );

            expect(await this.betInstance.owner())
                .to.equal(newOwner)
            ;
        });

        it("can renounce ownership if owner", async function() {
            const tx = await this.betInstance.renounceOwnership(
                {from: ownerAddress}
            );
            
            expectEvent(tx, "OwnershipTransferred",
                {
                    previousOwner: ownerAddress,
                    newOwner:      constants.ZERO_ADDRESS
                }
            );

            expect(await this.betInstance.owner())
                .to.equal(constants.ZERO_ADDRESS)
            ;
        });

        it("cannot renounce ownership if NOT owner", async function() {
            const notOwner = address2;

            await expectRevert(this.betInstance.renounceOwnership(
                    {from: notOwner}
                ),
                "Ownable: caller is not the owner");            
        });
    });

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Oracle Handling (Set and Get)
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    describe("Oracle Handling", function() {

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

        specify.skip ("setOracleAddress to a non BetOracle address reverts", async function() {
            const notOracleAddress = this.betInstance.address;

            await expectRevert.unspecified(
                this.betInstance.setOracleAddress(
                    notOracleAddress,
                    { from: ownerAddress }
                )
            );
        });

        specify ("testOracleConnection returns true when an BetOracle is connected", async function () {
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

        specify ("testOracleConnection returns true when an BetOracle is connected", async function () {
            // Bet does not know the address of BetOracle => 0
            expect(await this.betInstance.getOracleAddress())
                .to.equal(constants.ZERO_ADDRESS);

            const isOracleConnected = await this.betInstance.testOracleConnection(
                { from: ownerAddress }       
            );

            expect(Boolean(isOracleConnected)).to.be.false;
        });
    })


    describe.skip("Bet on Sport Events", function() {

        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // Populate the Oracle with 2 default sport events
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        beforeEach("Add Sport Events", async function() {
            this.dateEvent1 = DateTime.now().plus({ days: 7, minutes: 1 }).toSeconds();
            this.idEvent1   = await this.betOracleInstance.addSportEvent(
                "Paris vs. Marseille",  
                "PSG|OM",   
                2, 
                new BN(this.dateEvent1),
                { from: ownerAddress } 
            );

            this.dateEvent2 = DateTime.now().plus({ days: 14, minutes: 1 }).toSeconds();
            this.idEvent2   = await this.betOracleInstance.addSportEvent(
                "Spain vs. Portugal",  
                "ES|PT",   
                2, 
                new BN(this.dateEvent2),
                { from: ownerAddress }
            );

        })

        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // Sport Events
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        describe("Sport Events", function() {
            
            it ("can getEvent", async function() {
                console.log(this.idEvent1);
                console.log(this.idEvent1.receipt.rawLogs[0][0]);
                console.log(this.idEvent1.logs[0].args[0]);
                console.log(this.idEvent1.logs[0]._eventId);

                this.idEvent1 = this.idEvent1.logs[0]._idEvent;

                console.log(web3.utils.hexToNumber(this.idEvent1));
                console.log(web3.utils.numberToHex(web3.utils.hexToNumber(this.idEvent1)));

                const result = await this.betInstance.getEvent(
                    web3.utils.hexToNumber(this.idEvent1),
                    { from: address1 } 
                );
                expect(result)
                    .be.an('array')
                ;
                expect(result[0])
                    .to.be.a('string')
                    .equal(this.idEvent1, "Unexpected event id")
                ;
                expect(proposal1[1])
                    .to.be.a('string')
                    .equal("Paris vs. Marseille", "Unexpected event name")
                ;
                expect(proposal1[2])
                    .to.be.a('string')
                    .equal("PSG|OM", "Unexpected event participants")
                ;
                expect(proposal1[3])
                    .to.be.a.bignumber
                    .equal(new BN(1), "Unexpected event participantCount")
                ;
                expect(proposal1[4])
                    .to.be.a.bignumber
                    .equal(new BN(this.dateEvent1), "Unexpected event date")
                ;
                expect(proposal1[5])
                    .to.be.a.bignumber
                    .equal(new BN(0), "Unexpected event outcome to be pending")
                ;
                expect(proposal1[6])
                    .to.be.a.bignumber
                    .equal(new BN(1), "Unexpected event winner")
                ;
            });

            it ("can getLatestEvent");
            it ("can getBettableEvents");
            it ("can test if a bet is valid");
            it ("can check if _eventOpenForBetting");
        })

        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // Bets
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        describe ("Bets", function() {

            it.skip ("cannot placeBet when amount < minimumBet", async function() {
                const lessThanMinimumBet = web3.utils.toWei("0.01", "ether");

                // For whatever reason I receive "sender account is not recognized" in the test environment
                // whereas I expected "Bet amount must be >= minimum bet"
                // TODO: Remove the corresponding require in the contract if it is useless and this is an expected behavior
                await expectRevert( 
                    this.betInstance.placeBet(
                        this.idEvent1,
                        new BN(1),
                        { 
                            from:  ownerAddress,
                            value: new BN(lessThanMinimumBet)
                        }
                    ),
                    "Bet amount must be >= minimum bet"
                );
            });

            it("cannot placeBet if event does not exist", async function() {
                const nonExistentEventId = web3.utils.soliditySha3({});
                const betAmount          = web3.utils.toWei("0.25", "ether");

                // TODO: 
                await expectRevert.unspecified( 
                    this.betInstance.placeBet(
                        nonExistentEventId,
                        new BN(1),
                        { 
                            from:  ownerAddress,
                            value: new BN(betAmount)
                        }
                    )
                );
            });

            it ("cannot placeBet if event not open for betting");

            it.skip ("can placeBet", async function() {
                const betAmount = web3.utils.toWei("0.25", "ether");

                const result = await this.betInstance.placeBet(
                    this.idEvent1,
                    new BN(1),
                    { 
                        from:  ownerAddress,
                        value: new BN(betAmount)
                    }
                );

                expectEvent(result, "BetPlaced", {
                    _eventId:      idEvent1,
                    _player:       ownerAddress,
                    _chosenWinner: new BN(1),
                    _amount:       new BN(betAmount)
                });
            });

            // TODO:  This one passes but messes up the next BetOracle contract test
            //   Do not understand why so far!
            //   What's more the expected require is never reached as the code reverts prematurely
            //   (with a different error message)
            // it.skip ("cannot placeBet from address 0", async function() {
            //     const betAmount = web3.utils.toWei("0.01", "ether");

            //     await expectRevert( 
            //         this.betInstance.placeBet(
            //             this.idEvent1,
            //             new BN(1),
            //             { 
            //                 from:  constants.ZERO_ADDRESS,
            //                 value: new BN(betAmount)
            //             }
            //         ),
            //         "Returned error: sender account not recognized"
            //     );
            // });

        });
    });

});






//     // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//     // Sport Events Creation
//     // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//     describe("Sport Events Creation", function() {

//         it ("can create a sport event if owner", async function() {
//             const eventDate        = DateTime.now().plus({ days: 7, minutes: 1 });
//             const eventOutcomeDate = eventDate.plus(     { days: 1, minutes: 1 });
//             const eventName        = "PSG - Marseille, 2020-10-01 @Velodrome";

//             const result = await this.betInstance.createSportEvent(
//                 eventName,
//                 new BN(eventDate.toSeconds()),
//                 new BN(eventOutcomeDate.toSeconds()),
//                 { from: ownerAddress }       
//             );

//             expectEvent(result, "SportEventCreated", {
//                 _eventId:          new BN(1),
//                 _eventName:        eventName,
//                 _eventDate:        new BN(eventDate.toSeconds()),
//                 _eventOutcomeDate: new BN(eventOutcomeDate.toSeconds())
//             });
//         });

//         it ("can create several sport events", async function() {
//             // Create event #1
//             const eventDate        = DateTime.now().plus({ days: 7, minutes: 1 });
//             const eventOutcomeDate = eventDate.plus(     { days: 1, minutes: 1 });
//             const eventName        = "PSG - Marseille, 2022-10-01 @Velodrome";

//             const result = await this.betInstance.createSportEvent(
//                 eventName,
//                 new BN(eventDate.toSeconds()),
//                 new BN(eventOutcomeDate.toSeconds()),
//                 { from: ownerAddress }       
//             );

//             // Create event #2
//             const event2Date        = DateTime.now().plus({ days: 1, minutes: 1 });
//             const event2OutcomeDate = eventDate.plus(     { days: 1, minutes: 1 });
//             const event2Name        = "Marseille - PSG, 2023-05-01 @Parc des Princes";

//             const result2 = await this.betInstance.createSportEvent(
//                 event2Name,
//                 new BN(event2Date.toSeconds()),
//                 new BN(event2OutcomeDate.toSeconds()),
//                 { from: ownerAddress }       
//             );

//             expectEvent(result2, "SportEventCreated", {
//                 _eventId:          new BN(2),
//                 _eventName:        event2Name,
//                 _eventDate:        new BN(event2Date.toSeconds()),
//                 _eventOutcomeDate: new BN(event2OutcomeDate.toSeconds())
//             });
//         });

//         it ("cannot create a sport event if NOT owner", async function() {
//             const eventDate        = DateTime.now().plus({ days: 7, minutes: 1 });
//             const eventOutcomeDate = eventDate.plus(     { days: 1, minutes: 1 });
   
//             const notOwnerAddress  = address2;

//             await expectRevert(
//                 this.betInstance.createSportEvent(
//                     "Event name",
//                     new BN(eventDate.toSeconds()),
//                     new BN(eventOutcomeDate.toSeconds()),
//                     { from: notOwnerAddress }       
//                 ),
//                 "Ownable: caller is not the owner"
//             );
//         });

//         it ("cannot create a sport event occuring in less than 7 days", async function() {
//             const eventDate        = DateTime.now().plus({ days: 7, minutes: 1 });
//             const eventOutcomeDate = eventDate.plus(     { days: 1, minutes: 1 });   

//             await expectRevert(
//                 this.betInstance.createSportEvent(
//                     "Event name",
//                     new BN(eventDate.toSeconds()),
//                     new BN(eventOutcomeDate.toSeconds()),
//                     { from: ownerAddress }       
//                 ),
//                 "Event date must be >= 1 week from now"
//             );
//         });

//         it ("cannot create a sport event whose date is in the past", async function() {
//             const eventDateBeforeNow = DateTime.now().minus({ days: 7 });
//             const eventOutcomeDate   = DateTime.now().plus( { days: 1, minutes: 1 });

//             await expectRevert(
//                 this.betInstance.createSportEvent(
//                     "Event name",
//                     new BN(eventDateBeforeNow.toSeconds()),
//                     new BN(eventOutcomeDate.toSeconds()),
//                     { from: ownerAddress }       
//                 ),
//                 "Event date must be >= 1 week from now"
//             );
//         });

//         it ("cannot create a sport event whose outcome date is less than 7 days from now", async function() {
//             const eventDateBeforeNow = DateTime.now().plus({ days: 7, minutes: 1 });
//             const eventOutcomeDate   = eventDateBeforeNow.minus({ minutes: 2 });   

//             await expectRevert(
//                 this.betInstance.createSportEvent(
//                     "Event name",
//                     new BN(eventDateBeforeNow.toSeconds()),
//                     new BN(eventOutcomeDate.toSeconds()),
//                     { from: ownerAddress }       
//                 ),
//                 "Event Outcome available date must be > 1 week from now"
//             );
//         });

//         it ("cannot create a sport event that has already been registered with the same name", async function () {
//             const eventDate        = DateTime.now().plus({ days: 7, minutes: 1 });
//             const eventOutcomeDate = eventDate.plus(     { days: 1, minutes: 1 });
//             const eventName        = "Event Name";

//             const result = await this.betInstance.createSportEvent(
//                 eventName,
//                 new BN(eventDate.toSeconds()),
//                 new BN(eventOutcomeDate.toSeconds()),
//                 { from: ownerAddress }       
//             );

//             await expectRevert(
//                 this.betInstance.createSportEvent(
//                     eventName,
//                     new BN(eventDate.toSeconds()),
//                     new BN(eventOutcomeDate.toSeconds()),
//                     { from: ownerAddress }       
//                 ),
//                 "This event name already exists, choose another one"
//             );
//         });

//         it ("can can be notifed of the outcome of a sport event");
//     })

// })

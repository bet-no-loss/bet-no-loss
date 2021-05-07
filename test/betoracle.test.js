//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Test BetOracle smart-contract
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const { expectEvent, expectRevert, BN } = require('@openzeppelin/test-helpers');
const { expect }       = require('chai');
const { DateTime }     = require('luxon');

const BetOracle = artifacts.require('BetOracle');

// MUST be in sync with BetOracle.EventOutcome
const EventOutcome = {
    Pending:  new BN(0),
    Underway: new BN(1),
    Draw:     new BN(2),
    Decided:  new BN(3)
};

contract('BetOracle', function(accounts) {
    "use strict";

    const ownerAddress = accounts[0];
    const address1     = accounts[1];
    const address2     = accounts[2];
    const address3     = accounts[3];

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Instantiate a new contract before running each test in this suite
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    beforeEach("Create Oracle", async function() {
        this.betOracleInstance = await BetOracle.new( {from: ownerAddress});
    })

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Declaring Events in the Oracle
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    describe("Adding Events", function() {

        it("can addSportEvent if OWNER", async function(){
            const eventDate  = new BN(DateTime.now().plus({ days: 7, minutes: 1 }).toSeconds());
            const eventName  = "Paris vs. Marseille";
            const teams      = "PSG|OM";
            const teamsCount = new BN(2);

            const tx = await this.betOracleInstance.addSportEvent(
                eventName,
                teams,   
                teamsCount, 
                eventDate,
                { from: ownerAddress } 
            );

            // Recompute `eventId` in javascript (the hash built with and returned by BetOracle.addSportEvent using Solidity keccak256())
            const expectedEventId    = web3.utils.soliditySha3(
                {t: 'string',  v: eventName},
                {t: 'uint8',   v: teamsCount},
                {t: 'uint256', v: eventDate}
            );

            expectEvent(tx, "SportEventAdded", {
                _eventId:          expectedEventId,
                _name:             eventName,
                _participants:     teams,
                _participantCount: teamsCount,
                _date:             eventDate,
                _eventOutcome:     EventOutcome.Pending,
                _winner:           new BN(-1)
            });

            const actualEventId = tx.logs[0].args[0];
            expect(actualEventId).to.equal(expectedEventId);
        });

        it("cannot addSportEvent if NOT owner", async function(){
            const eventDate  = new BN(DateTime.now().plus({ days: 7, minutes: 1 }).toSeconds());
            const eventName  = "Paris vs. Marseille";
            const teams      = "PSG|OM";
            const teamsCount = new BN(2);

            const notOwnerAddress  = address2;

            await expectRevert(this.betOracleInstance.addSportEvent(
                    eventName,
                    teams,   
                    teamsCount, 
                    eventDate,
                    { from: notOwnerAddress } 
                ),
                "Ownable: caller is not the owner"
            );
        });

        it("cannot add an existing Event", async function(){
            const eventDate  = new BN(DateTime.now().plus({ days: 7, minutes: 1 }).toSeconds());
            const eventName  = "Paris vs. Marseille";
            const teams      = "PSG|OM";
            const teamsCount = new BN(2);

            const notOwnerAddress  = address2;

            const tx = await this.betOracleInstance.addSportEvent(
                eventName,
                teams,   
                teamsCount, 
                eventDate,
                { from: ownerAddress } 
            );

            await expectRevert(this.betOracleInstance.addSportEvent(
                    eventName,
                    teams,   
                    teamsCount, 
                    eventDate,
                    { from: ownerAddress } 
                ),
                "Event already exists"
            );
        });
    });

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Getting Event(s) from the Oracle
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    describe("Getting Events", function() {

        beforeEach("Create 3 events", async function() {

            this.dateEvent1       = new BN(DateTime.now().plus({ days: 7, minutes: 1 }).toSeconds());
            this.nameEvent1       = "Paris vs. Marseille";
            this.teamsEvent1      = "PSG|OM";
            this.teamsCountEvent1 = new BN(2);
            this.txEvent1 = await this.betOracleInstance.addSportEvent(
                this.nameEvent1,
                this.teamsEvent1,   
                this.teamsCountEvent1, 
                this.dateEvent1,
                { from: ownerAddress } 
            );
            // Rebuild in JS the keccak256 returned by BetOracle.addSportEvent when adding event
            this.idEvent1 = web3.utils.soliditySha3(
                {t: 'string',  v: this.nameEvent1},
                {t: 'uint8',   v: this.teamsCountEvent1},
                {t: 'uint256', v: this.dateEvent1}
            );

            this.dateEvent2       = new BN(DateTime.now().plus({ days: 14, minutes: 1 }).toSeconds());
            this.nameEvent2       = "Spain vs. Portugal";
            this.teamsEvent2      = "ES|PT";
            this.teamsCountEvent2 = new BN(2);
            this.txEvent2   = await this.betOracleInstance.addSportEvent(
                this.nameEvent2,
                this.teamsEvent2,
                this.teamsCountEvent2,
                this.dateEvent2,
                { from: ownerAddress }
            );
            // Rebuild in JS the keccak256 returned by BetOracle.addSportEvent when adding event
            this.idEvent2 = web3.utils.soliditySha3(
                {t: 'string',  v: this.nameEvent2},
                {t: 'uint8',   v: this.teamsCountEvent2},
                {t: 'uint256', v: this.dateEvent2}
            );

            this.dateEvent3       = new BN(DateTime.now().plus({ days: 21, minutes: 1 }).toSeconds());
            this.nameEvent3       = "France vs. Bresil";
            this.teamsEvent3      = "FR|BR";
            this.teamsCountEvent3 = new BN(2);
            this.txEvent3   = await this.betOracleInstance.addSportEvent(
                this.nameEvent3,
                this.teamsEvent3,
                this.teamsCountEvent3,
                this.dateEvent3,
                { from: ownerAddress }
            );
            // Rebuild in JS the keccak256 returned by BetOracle.addSportEvent when adding event
            this.idEvent3 = web3.utils.soliditySha3(
                {t: 'string',  v: this.nameEvent3},
                {t: 'uint8',   v: this.teamsCountEvent3},
                {t: 'uint256', v: this.dateEvent3}
            );
        })    

        it("getEvent: can get an existing event", async function(){
            const tx = await this.betOracleInstance.getEvent(this.idEvent2);

            expect(tx.id).to.equal(this.idEvent2);

            expect(tx.name).to.be.a('string').equal(this.nameEvent2);
            expect(tx.participants).to.be.a('string').equal(this.teamsEvent2);
            expect(tx.participantCount).to.be.a.bignumber.equal(this.teamsCountEvent2);
            expect(tx.date).to.be.a.bignumber.equal(this.dateEvent2);
            expect(tx.outcome).to.be.a.bignumber.equal(EventOutcome.Pending);
            expect(tx.winner).to.be.a.bignumber.equal(new BN(-1));
        });

        it("getEvent: can get a NON existing event", async function(){
            const idNonExistentEvent = web3.utils.soliditySha3(
                {t: 'string',  v: "Non existent event"},
                {t: 'uint8',   v: new BN(2)},
                {t: 'uint256', v: new BN(DateTime.now().toSeconds())}
            );
            const tx = await this.betOracleInstance.getEvent(idNonExistentEvent);

            expect(tx.id).to.equal(idNonExistentEvent);
            
            expect(tx.name).to.be.a('string').empty;            // <==
            expect(tx.participants).to.be.a('string').empty;            // <==
            expect(tx.participantCount).to.be.a.bignumber.equal(new BN(0)); // <==
            expect(tx.date).to.be.a.bignumber.equal(new BN(0)); // <==
            expect(tx.outcome).to.be.a.bignumber.equal(EventOutcome.Pending);
            expect(tx.winner).to.be.a.bignumber.equal(new BN(-1));
        });

        it("eventExists(eventId) returns false when there is NO event with this id", async function() {
            const nonExistentEventId = web3.utils.soliditySha3(
                {t: 'string',  v: "Non existent event"},
                {t: 'uint8',   v: new BN(2)},
                {t: 'uint256', v: new BN(DateTime.now().toSeconds())}
            );

            expect(await this.betOracleInstance.eventExists(nonExistentEventId))
                .to.be.false;
        });

        it("eventExists(eventId) returns true when there is an event with this id", async function() {
            expect(await this.betOracleInstance.eventExists(this.idEvent3))
                .to.be.true;
        });

        describe("getLatestEvent", function() {
            it.skip("getLatestEvent(true) returns the most recent Pending event if one", async function() {
                const tx = await this.betOracleInstance.getLatestEvent(true);
                // TODO:
            });
            it("getLatestEvent(false) returns the most recent (pending or Decided) event if one");
            it("getLatestEvent returns a specially crafted not found event when there is NO event");
    
        })
        it("getAllSportEvents");
        it("can getPendingEvents");
    });
  
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Declaring an Event Outcome
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    describe("Event Outcome", function(){
        it("declareOutcome");
    });
    
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Helper Functions 
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    describe("Helper functions", function() {

        it("getAddress() returns the address of this contract's instance", async function(){
            expect(await this.betOracleInstance.getAddress())
                .to.be.equal(this.betOracleInstance.address)
        });

        it("testConnection() always returns true", async function(){
            const isConnected = await this.betOracleInstance.testConnection();
            expect((Boolean(isConnected))).to.be.true;
        });

    });
        
})

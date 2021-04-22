//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Test BetOracle smart-contract
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const { accounts, contract, web3 } = require('@openzeppelin/test-environment');
const { expectEvent, expectRevert, BN } = require('@openzeppelin/test-helpers');
const { expect }       = require('chai');
const { DateTime }     = require('luxon');

const BetOracle = contract.fromArtifact('BetOracle');


describe('BetOracle', function() {

    const ownerAddress = accounts[0];
    const address1     = accounts[1];
    const address2     = accounts[2];
    const address3     = accounts[3];

    // Instantiate a new contract before running each test in this suite
    beforeEach("Create Oracle", async function() {
        this.betOracleInstance = await BetOracle.new( {from: ownerAddress});
    })


    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Oracle Association
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    describe("TODO", function() {

        it ("can getPendingEvents");
                    // expectEvent(this.idEvent1, "SportEventAdded", {
            //     _eventId:          (this.idEvent1),
            //     _name:             "Paris vs. Marseille",
            //     _participants:     "PSG|OM",
            //     _participantCount: 1,
            //     _date:             new BN(this.dateEvent1),
            //     _eventOutcome:     0,
            //     _winner:           -1
            // });

            
            // expectEvent(this.idEvent2, "SportEventAdded", {
            //     _eventId:          String((this.idEvent2)),
            //     _name:             "Spain vs. Portugal",
            //     _participants:     "SP|PT",
            //     _participantCount: 2,
            //     _date:             new BN(this.dateEvent2),
            //     _eventOutcome:     0,
            //     _winner:           -1
            // });

            // const pendingEvents = await this.betOracleInstance.getPendingEvents();
//             expect(pendingEvents)
//                 .to.be.an('array')
//                 .with.lengthOf(2)
//             ;
//             expect(pendingEvents[0])
//                 .to.be.a('string')
//                 .equal(this.idEvent1)
//             ;
//             expect(pendingEvents[1])
//                 .to.be.a('string')
//                 .equal(this.idEvent2)
//             ;

    });

})

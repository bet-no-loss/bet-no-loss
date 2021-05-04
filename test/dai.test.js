//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Test DAI smart-contract
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const { expectEvent, expectRevert, BN } = require('@openzeppelin/test-helpers');
const constants   = require('@openzeppelin/test-helpers/src/constants');
const { web3 } = require('@openzeppelin/test-helpers/src/setup');
const { expect, assert }  = require('chai');

const Dai       = artifacts.require('DAI');

contract('DAI', async function(accounts) {
    "use strict";

    const [ownerAddress, address1, address2, address3] = accounts;

    beforeEach("Create a DAI before running each test in this suite", async function () {
        this.daiInstance = await Dai.new(
            "Dai Stablecoin", 
            "DAI", 
            {from: ownerAddress}
        );
    });
    
    it("has a name", async function(){
        expect(await this.daiInstance.name())
            .to.equal("Dai Stablecoin");
    });

    it("has a symbol", async function(){
        expect(await this.daiInstance.symbol())
            .to.equal("DAI");
    });
 
    it("has a 18 decimals", async function(){
        expect(await this.daiInstance.decimals())
            .to.be.a.bignumber
            .equal(new BN(18));
    });

    it("has a totalSupply", async function() {      
        expect((await this.daiInstance.totalSupply())
            .toString())
            .to.equal(
                web3.utils.toWei('100', 'ether'),
                "Expected 100 * 10 ** 18"
            ); 
    });

    it("allow the total supply to the owner", async function() {
        const totalSupply  = await this.daiInstance.totalSupply();
        const ownerBalance = await this.daiInstance.balanceOf(ownerAddress);
    
        expect(ownerBalance)
            .to.be.a.bignumber
            .equal(totalSupply);

        expectEvent.inConstruction(this.daiInstance, 
            'IERC20.Transfer', {
                address: constants.ZERO_ADDRESS,
                to:      ownerAddress,
                value:   web3.utils.toWei('100', 'ether')
            }
        );
    });
    
    specify("balanceOf an account with no allowance is 0", async function(){
        expect(await this.daiInstance.balanceOf(
            address2, 
            {address: ownerAddress})
        ).to.be.a.bignumber
            .equal(new BN(0)); 
    });

    describe("allowance", function(){

        specify.only("allowance ", async function(){
            // Allow address2 to spend at most 50 DAI on behalf of ownerAddress
            await this.daiInstance.apporve(ownerAddress, address2, 50);

            expect(await this.daiInstance.balanceOf(address2))
                .to.be.a.bignumber
                .equal(
                    web3.utils.toWei('42', 'ether'),
                ); 
        });
    })
    
    

});
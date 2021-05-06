//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Test DAI smart-contract
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const { expectEvent, expectRevert, BN } = require('@openzeppelin/test-helpers');
const constants   = require('@openzeppelin/test-helpers/src/constants');
const { web3 } = require('@openzeppelin/test-helpers/src/setup');
const { expect }  = require('chai');

const Dai       = artifacts.require('DAI');

contract('DAI', async function(accounts) {
    "use strict";

    const [ownerAddress, address1, address2, address3] = accounts;

    beforeEach("Create a DAI before running each test in this suite", async function (){
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
        expect(await this.daiInstance.totalSupply())
            .to.be.a.bignumber
            .equal(web3.utils.toWei(new BN(100), 'ether')); 
    });

    it.skip("allow the total supply to the owner", async function() {
        const totalSupply  = await this.daiInstance.totalSupply();
        const ownerBalance = await this.daiInstance.balanceOf(ownerAddress);
    
        expect(ownerBalance).to.be.a.bignumber.equal(totalSupply);
        // TODO: Fix me, `expectEvent.inConstruction` is defintely my "Bad Batch"!
        // Not working hand in hand with Chai/Mocka
        await expectEvent.inConstruction(this.daiInstance, 
            'IERC20.Transfer', {
                from: constants.ZERO_ADDRESS,
                to:      ownerAddress,
                value:   totalSupply
            }
        );
    });

    specify("Default balanceOf an account is 0", async function(){
        expect(
            await this.daiInstance.balanceOf(
                address2, 
                {from: ownerAddress}
            )
        ).to.be.a.bignumber.equal(new BN(0)); 
    });

    it("cannot transfer from or to address 0", async function() {
        const amount = web3.utils.toWei(new BN(50), "ether");

        await expectRevert(
            this.daiInstance.transferFrom(
                constants.ZERO_ADDRESS,
                address2,
                amount,
                {from: ownerAddress}
            ),
            "ERC20: transfer from the zero address"
        );

        await expectRevert(
            this.daiInstance.transferFrom(
                ownerAddress,
                constants.ZERO_ADDRESS,
                amount,
                {from: ownerAddress}
            ),
            "ERC20: transfer to the zero address"
        );
    });

    it("can approve address2 to spend 50 DAIs on behalf of ownerAddress", async function(){
        const amount    = new web3.utils.toWei(new BN(50));
        const approveTx = await this.daiInstance.approve(
            address2, 
            amount, 
            {from: ownerAddress}
        );

        expectEvent(approveTx, 
            "Approval",{
                owner:   ownerAddress,
                spender: address2,
                value:   amount 
            }
        );
        expect(Boolean(approveTx)).to.be.true;
    });

    it("can transfer DAI from an address to another one", async function() {
        // TODO: Find and use something more explicit because "ether" is misleading when testing DAI!
        // Both Ether and DAI have 18 decimals ;-)
        const amount      = web3.utils.toWei(new BN(50), "ether");
        const totalSupply = await this.daiInstance.totalSupply();
        
        await this.daiInstance.approve(
            ownerAddress,
            amount,
            {from: ownerAddress}
        );
        expect(await this.daiInstance.allowance(
            ownerAddress,
            ownerAddress,
            {from: ownerAddress}
        )).to.be.bignumber.equal(amount);

        expect(await this.daiInstance.balanceOf(
            ownerAddress,
            {from: ownerAddress}
        )).to.be.bignumber.equal(totalSupply);
        await this.daiInstance.transferFrom(
            ownerAddress,
            address2,
            amount, 
            {from: ownerAddress}
        );
        expect(await this.daiInstance.balanceOf(
            address2,
            {from: address2}
        )).to.be.bignumber.equal(amount);
        expect(await this.daiInstance.balanceOf(
            ownerAddress,
            {from: ownerAddress}
        )).to.be.bignumber.equal(amount);

        expect(await this.daiInstance.allowance(
            ownerAddress,
            ownerAddress,
            {from: ownerAddress}
        )).to.be.bignumber.equal(new BN(0));

        expect(await this.daiInstance.allowance(
            ownerAddress,
            address2,
            {from: ownerAddress}
        )).to.be.bignumber.equal(new BN(0));
        await this.daiInstance.approve(
            address2,
            amount,
            {from: ownerAddress}
        );
        expect(await this.daiInstance.allowance(
            ownerAddress,
            address2,
            {from: ownerAddress}
        )).to.be.bignumber.equal(amount);
    });

});
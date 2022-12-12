const { expectRevert } = require('@openzeppelin/test-helpers');
const { BN } = require("web3-utils");

const Jie = artifacts.require("Jie");

contract("Jie", accounts => {
    let jieToken_instance;

    before(async function () {
        await Jie.new(
            {from: accounts[0]}
        ).then(function(instance) {
            jieToken_instance = instance;
        });
    });

    describe("Mint", () => {
        it("Mint works successfully", async () => {
            await jieToken_instance.mint(
                100,
                {from: accounts[0]}
            );

            const balance = await jieToken_instance.balanceOf(
                accounts[0],
                {from: accounts[0]}
            );

            assert.equal(balance.toString(), new BN('1000100').toString());
        });
    });

    describe("Burn", () => {
        it ("Burn works successfully", async () => {
            await jieToken_instance.burn(
                100,
                {from: accounts[0]}
            );

            const balance = await jieToken_instance.balanceOf(
                accounts[0],
                {from: accounts[0]}
            );

            assert.equal(balance.toString(), new BN('1000000').toString());
        });
    });

    describe("Lock", () => {
        it ("Lock works successfully", async () => {
            await jieToken_instance.lock(
                accounts[1],
                {from: accounts[0]}
            );

            await expectRevert(jieToken_instance.transfer(accounts[0], 100, {from: accounts[1]}), 'This wallet is locked');
        });
    });


})
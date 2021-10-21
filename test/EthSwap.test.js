const { assert } = require('chai');

const Token = artifacts.require('Token');
const EthSwap = artifacts.require('EthSwap');

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('EthSwap', ([deployer, investor]) => {

    const addDecimals = (n) => {
        return web3.utils.toWei(n, 'Ether');
    }

    let token, ethSwap;

    before(async () => {
        token = await Token.new();
        ethSwap = await EthSwap.new(token.address);
        await token.transfer(ethSwap.address, addDecimals('1000000', 'Ether'))
    })

    describe('Token Deployment', async () => {
        it("Token's name", async () => {
            const name = await token.name();
            assert.equal(name, 'DApp Token')
        })

        it("Token's TotalSupply", async () => {
            const supply = await token.totalSupply();
            assert.equal(supply, addDecimals('1000000', 'Ether'))
        })
    })

    describe('EthSwap Deployment(BuyTokens)', async () => {
        it("EthSwap's Name", async () => {
            const name = await ethSwap.name();
            assert.equal(name, 'ERC20 Instant Swapping...')
        })

        let result;
        before(async () => {
            result = await ethSwap.buyTokens({ from: investor, value: addDecimals('1', 'Ether') })
        })

        // BUY TOKEN:
        it("EthSwaps Tokens", async () => {
            const ethSwapTokens = await token.balanceOf(ethSwap.address);
            assert.equal(ethSwapTokens.toString(), addDecimals('999900', 'Ether'))
        })

        it("EthSwaps Etheriums", async () => {
            const ethSwapEtheriums = await web3.eth.getBalance(ethSwap.address);
            assert.equal(ethSwapEtheriums.toString(), addDecimals('1', 'Ether'))
        })

        it("Investors Tokens", async () => {
            const investorsTokens = await token.balanceOf(investor);
            assert.equal(investorsTokens.toString(), addDecimals('100', 'Ether'))
        })

        it("To Check Event", async () => {
            let data = result.logs[0].args;
            assert.equal(data.account, investor)
            assert.equal(data.token, token.address)
            assert.equal(data.amount.toString(), addDecimals('100', 'Ether'))
            assert.equal(data.rate.toString(), '100')
        })

    })
    describe('EthSwap Deployment(SellTokens)', async () => {
        it("EthSwap's Name", async () => {
            const name = await ethSwap.name();
            assert.equal(name, 'ERC20 Instant Swapping...')
        })

        let result;
        before(async () => {
            await token.approve(ethSwap.address, addDecimals('100', 'Ether'), { from: investor })
            result = await ethSwap.sellTokens(addDecimals('100', 'Ether'), { from: investor })
        })

        // SELL TOKENS

        it('EthSwaps Tokens', async () => {
            const ethSwapTokens = await token.balanceOf(ethSwap.address);
            assert.equal(ethSwapTokens.toString(), addDecimals('1000000', 'Ether'))
        })

        it("EthSwaps Etheriums", async () => {
            const ethSwapEtheriums = await web3.eth.getBalance(ethSwap.address);
            assert.equal(ethSwapEtheriums.toString(), '0')
        })

        it("Investors Tokens", async () => {
            const investorsTokens = await token.balanceOf(investor);
            assert.equal(investorsTokens.toString(), '0')
        })

        it("To Check Event", async () => {
            let data = result.logs[0].args;
            assert.equal(data.account, investor)
            assert.equal(data.token, token.address)
            assert.equal(data.amount.toString(), addDecimals('100', 'Ether'))
            assert.equal(data.rate.toString(), '100')
            await ethSwap.sellTokens(addDecimals('500', 'Ether', { from: investor })).should.be.rejected;
        })
    })
})
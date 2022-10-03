const {ethers} = require("hardhat");
const {OpenSeaSDK, Network} = require("opensea-js");
const {SeaportContract} = require('./SeaportContract');
const Web3 = require('web3');
const {getBasicOrderParametersFromOrder} = require('./utils');

const BAYC = '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D';
const MAYC = '0x60E4d786628Fea6478F785A6d7e704777c86a7c6'


let provider = new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/*');
const openseaSDK = new OpenSeaSDK(provider, {
    networkName: Network.Main,
    apiKey: ''
});


async function main() {
    // opensea retrive order
    const order = await openseaSDK.api.getOrder({
        assetContractAddress: MAYC, // string
        tokenId: 9727, // string | number | null
        side: 'ask'
    })
    console.log(order)
    console.log(order.protocolData.parameters.offer)
    console.log(order.protocolData.parameters.consideration)

    const basicOrderParameters = getBasicOrderParametersFromOrder(order)
    console.log('========= basicOrderParameters ===========')
    console.log('total price is', ethers.BigNumber.from(order.currentPrice))
    console.log(basicOrderParameters)
    // encode data
    // const iface = new ethers.utils.Interface(SeaportContract.abi);
    // const encodedData = iface.encodeFunctionData("fulfillBasicOrder", [basicOrderParameters])
    // console.log(encodedData);

    // buy
    const [signer] = await ethers.getSigners();
    console.log("Singer account:", signer.address, ", Balance:", (await signer.getBalance()).toString());
    const seaportC = new SeaportContract(signer).contract;
    const receipt = await seaportC.fulfillBasicOrder(basicOrderParameters, {value: ethers.BigNumber.from(order.currentPrice)})
    console.log(await receipt.wait())

    }


main()
    .then(() => console.log('main end'))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
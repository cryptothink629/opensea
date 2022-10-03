const {ethers} = require("hardhat");

function getBasicOrderParametersFromOrder(order) {
    const basicOrderParameters = {
        considerationToken: '0x0000000000000000000000000000000000000000',
        considerationIdentifier: ethers.BigNumber.from('0'),
        considerationAmount: undefined,
        offerer: undefined,
        zone: '0x004C00500000aD104D7DBd00e3ae0A5C00560C00',
        offerToken: undefined,
        offerIdentifier: undefined,
        offerAmount: 1,
        basicOrderType: 2,
        startTime: undefined,
        endTime: undefined,
        zoneHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
        salt: undefined,
        offererConduitKey: '0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000',
        fulfillerConduitKey: '0x0000000000000000000000000000000000000000000000000000000000000000',
        totalOriginalAdditionalRecipients: undefined,
        additionalRecipients: [],
        signature: undefined
    }
    basicOrderParameters.offerer = ethers.utils.getAddress(order.maker.address);
    basicOrderParameters.offerToken = order.protocolData.parameters.offer[0].token;
    basicOrderParameters.offerIdentifier = ethers.BigNumber.from(order.protocolData.parameters.offer[0].identifierOrCriteria);
    basicOrderParameters.startTime = order.listingTime;
    basicOrderParameters.endTime = order.expirationTime;
    basicOrderParameters.salt = order.protocolData.parameters.salt;
    basicOrderParameters.totalOriginalAdditionalRecipients = order.protocolData.parameters.totalOriginalConsiderationItems - 1
    basicOrderParameters.signature = order.protocolData.signature;
    for (let consider of order.protocolData.parameters.consideration) {
        if (consider.recipient === basicOrderParameters.offerer) {
            basicOrderParameters.considerationAmount = ethers.BigNumber.from(consider.startAmount);
            continue;
        }

        basicOrderParameters.additionalRecipients.push({
                amount: ethers.BigNumber.from(consider.startAmount),
                recipient: consider.recipient
            },
        );
    }
    return basicOrderParameters;
}

module.exports = {getBasicOrderParametersFromOrder};
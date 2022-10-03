const {ethers} = require("hardhat");

class SeaportContract {
    static abi = [
        'function fulfillBasicOrder(tuple(' +
        '        address considerationToken,' +
        '        uint256 considerationIdentifier,' +
        '        uint256 considerationAmount,' +
        '        address offerer,' +
        '        address zone,' +
        '        address offerToken,' +
        '        uint256 offerIdentifier,' +
        '        uint256 offerAmount,' +
        '        uint8 basicOrderType,' +
        '        uint256 startTime,' +
        '        uint256 endTime,' +
        '        bytes32 zoneHash,' +
        '        uint256 salt,' +
        '        bytes32 offererConduitKey,' +
        '        bytes32 fulfillerConduitKey,' +
        '        uint256 totalOriginalAdditionalRecipients,' +
        '        (uint256 amount, address recipient)[] additionalRecipients,' +
        '        bytes signature ) parameters) external payable returns (bool fulfilled)'
    ]
    static addr = '0x00000000006c3852cbEf3e08E8dF289169EdE581'; // v1.1
    contract;

    constructor(signer) {
        this.contract = new ethers.Contract(SeaportContract.addr, SeaportContract.abi, signer)
    }
}

module.exports = {SeaportContract};
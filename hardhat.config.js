require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.17",
    networks: {
        hardhat: {
            forking: {
                url: "http://localhost:8545"
            }
        },
        localhost: {
            url: "http://127.0.0.1:7545"
        },
        ethmain: {
            url: "http://127.0.0.1:8545"
        }
    },
};

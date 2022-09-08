
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config();

const { API_URL, PRIVATE_KEY } = process.env;

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    solidity: "0.8.4",
    defaultNetwork: "rinkeby",
    networks: {
        rinkeby: {
            url: "https://eth-rinkeby.alchemyapi.io/v2/qQgbd7wZWgtR0diYQLPP5VptZIH-7gbE",
            accounts: ["4c9f77fc99f1babb1c8163ec5d169f0924bcc0dd335b5c7189a4534e47d698e0",]
        }
    },
    etherscan: {
        apiKey: {
            rinkeby: "M63BZQYWWWP7MKYBZBNBYRJWJ4REAF3FCT"
        }
    }
};
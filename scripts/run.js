const { utils } = require("ethers");

async function main() {
    const baseTokenURI = "ipfs://QmZbWNKJPAjxXuNFSEaksCJVd1M6DaKQViJBYPK2BdpDEP/";

    // Get owner/deployer's wallet address
    const [owner] = await hre.ethers.getSigners();

    // Get contract that we want to deploy
    const contractFactory = await hre.ethers.getContractFactory("NFTCollectible");

    // Deploy contract with the correct constructor arguments
    const contract = await contractFactory.deploy(baseTokenURI);

    // Wait for this transaction to be mined
    await contract.deployed();

    // Get contract address
    console.log("Contract deployed to:", contract.address);

    // Reserve NFTs
    let txn = await contract.reserveNFTs();
    await txn.wait();
    console.log("10 NFTs have been reserved");

    // Mint 3 NFTs by sending 0.03 ether
    txn = await contract.mintNFTs(3, { value: utils.parseEther('0.03') });
    await txn.wait()

    // Get all token IDs of the owner
    let tokens = await contract.tokensOfOwner(owner.address)
    console.log("Owner has tokens: ", tokens);

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
    //npx hardhat run scripts/run.js
    // Create an Alchemy account here and then proceed to create a free app.
    //Once you’ve created an app, go to your Alchemy dashboard and select your app.
    // This will open a new window with a View Key button on the top right. Click on that and select the HTTP URL
/*Create a new file called .env and store your URL and private key in the following format:

API_URL = "<--YOUR ALCHEMY URL HERE-->"
PRIVATE_KEY = "<--YOUR PRIVATE KEY HERE-->"*/
//npx hardhat run scripts/run.js --network rinkeby
//Viewing our NFTs on OpenSea
//Verifying our contract on Etherscan
/*Before we can do this, we will need an Etherscan API key. Sign up for a free account here and access your API keys here.

Let’s add this API key to our .env file.

ETHERSCAN_API = "<--YOUR ETHERSCAN API KEY-->"*/
/*Now, run the following two commands:

npx hardhat clean
npx hardhat verify --network rinkeby DEPLOYED_CONTRACT_ADDRESS "BASE_TOKEN_URI"
In our case, the second command looked like this:

npx hardhat verify --network rinkeby
 0x355638a4eCcb777794257f22f50c289d4189F245 
 "ipfs://QmZbWNKJPAjxXuNFSEaksCJVd1M6DaKQViJBYPK2BdpDEP/"*/

/*Now, if you visit your contract’s Rinkeby Etherscan page,
you should see a small green tick next to the Contract tab. \
More importantly, your users will now be able to connect to web3 using Metamask and 
call your contract’s functions from Etherscan itself!*/
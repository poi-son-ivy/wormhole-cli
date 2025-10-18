const { ethers } = require("hardhat");

async function main() {
    console.log("Deploying WormholeMonitor contract...");

    //For test: placeholders
    //TODO: update with prod addresses
    const WORMHOLE_BRIDGE_ADDRESS = "0x98f3c9e6E3fAce36bAAd05FE09d375Ef1464288B"; // Sepolia
    const TOKEN_BRIDGE_ADDRESS = "0xF890982f9310df57d00f659cf4fd87e65adEd8d7"; // Sepolia
  
    //Deploy steps
    const WormholeMonitor = await ethers.getContractFactory("WormholeMonitor");
    const monitor = await WormholeMonitor.deploy(
        WORMHOLE_BRIDGE_ADDRESS,
        TOKEN_BRIDGE_ADDRESS
    );

    await monitor.deployed();

    console.log("WormholeMonitor deployed to:", monitor.address);
    console.log("Using Wormhole Bridge at:", WORMHOLE_BRIDGE_ADDRESS);
    console.log("Using Token Bridge at:", TOKEN_BRIDGE_ADDRESS);
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error("Error in deployment:", error);
    process.exit(1);
})
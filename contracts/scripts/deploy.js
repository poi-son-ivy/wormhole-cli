const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying WormholeMonitor contract...");

  // Wormhole addresses for Sepolia testnet
  const WORMHOLE_BRIDGE_ADDRESS = "0x4a8bc80Ed5a4067f1CCf107057b8270E0cC11A78"; // Sepolia testnet
  const TOKEN_BRIDGE_ADDRESS = "0xDB5492265f6038831E89f495670FF909aDe94bd9"; // Sepolia testnet

  // Deploy the contract
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
    console.error(error);
    process.exit(1);
  });
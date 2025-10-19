import { expect } from "chai";
import { ethers } from "hardhat";

describe("WormholeMonitor", function() {
  // This test can run long, so we increase the timeout
  this.timeout(60000);
  
  it("Should deploy the contract successfully", async function() {
    // Mock addresses for testing
    const MOCK_WORMHOLE_BRIDGE = "0x4a8bc80Ed5a4067f1CCf107057b8270E0cC11A78";
    const MOCK_TOKEN_BRIDGE = "0xDB5492265f6038831E89f495670FF909aDe94bd9";
    
    const WormholeMonitor = await ethers.getContractFactory("WormholeMonitor");
    const monitor = await WormholeMonitor.deploy(MOCK_WORMHOLE_BRIDGE, MOCK_TOKEN_BRIDGE);
    
    await monitor.waitForDeployment();
    const monitorAddress = await monitor.getAddress();
    
    expect(monitorAddress).to.be.properAddress;
    
    // Check if bridge addresses are stored correctly
    expect(await monitor.wormholeBridge()).to.equal(MOCK_WORMHOLE_BRIDGE);
    expect(await monitor.tokenBridge()).to.equal(MOCK_TOKEN_BRIDGE);
  });
  
  it("Should record and retrieve transfer information", async function() {
    // Mock addresses for testing
    const MOCK_WORMHOLE_BRIDGE = "0x4a8bc80Ed5a4067f1CCf107057b8270E0cC11A78";
    const MOCK_TOKEN_BRIDGE = "0xDB5492265f6038831E89f495670FF909aDe94bd9";
    
    const WormholeMonitor = await ethers.getContractFactory("WormholeMonitor");
    const monitor = await WormholeMonitor.deploy(MOCK_WORMHOLE_BRIDGE, MOCK_TOKEN_BRIDGE);
    
    await monitor.waitForDeployment();
    
    // Create a mock transfer
    const transferId = ethers.keccak256(ethers.toUtf8Bytes("test-transfer-1"));
    const sender = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
    const recipient = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC";
    const amount = ethers.parseEther("1.0");
    const targetChain = 1; // Solana chain ID in Wormhole
    
    // Record transfer initiation
    await monitor.recordTransferInitiation(
      transferId,
      sender,
      recipient,
      amount,
      targetChain
    );
    
    // Get transfer status
    const status = await monitor.getTransferStatus(transferId);
    
    // Check if status is stored correctly
    expect(status.sender).to.equal(sender);
    expect(status.recipient).to.equal(recipient);
    expect(status.amount).to.equal(amount);
    expect(status.targetChain).to.equal(targetChain);
    expect(status.completed).to.equal(false);
    
    // Record transfer completion
    await monitor.recordTransferCompletion(
      transferId,
      recipient,
      amount
    );
    
    // Get updated status
    const updatedStatus = await monitor.getTransferStatus(transferId);
    
    // Verify transfer is completed
    expect(updatedStatus.completed).to.equal(true);
  });
});
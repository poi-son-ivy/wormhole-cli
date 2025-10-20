"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("../hardhat.config");
const hardhat_1 = require("hardhat");
describe("WormholeMonitor", function () {
    // This test can run long, so we increase the timeout
    this.timeout(60000);
    it("Should deploy the contract successfully", async function () {
        // Mock addresses for testing
        const MOCK_WORMHOLE_BRIDGE = "0x4a8bc80Ed5a4067f1CCf107057b8270E0cC11A78";
        const MOCK_TOKEN_BRIDGE = "0xDB5492265f6038831E89f495670FF909aDe94bd9";
        const WormholeMonitor = await hardhat_1.ethers.getContractFactory("WormholeMonitor");
        const monitor = await WormholeMonitor.deploy(MOCK_WORMHOLE_BRIDGE, MOCK_TOKEN_BRIDGE);
        await monitor.waitForDeployment();
        const monitorAddress = await monitor.getAddress();
        (0, chai_1.expect)(hardhat_1.ethers.isAddress(monitorAddress)).to.be.true;
        // Check if bridge addresses are stored correctly
        (0, chai_1.expect)(await monitor.wormholeBridge()).to.equal(MOCK_WORMHOLE_BRIDGE);
        (0, chai_1.expect)(await monitor.tokenBridge()).to.equal(MOCK_TOKEN_BRIDGE);
    });
    it("Should record and retrieve transfer information", async function () {
        // Mock addresses for testing
        const MOCK_WORMHOLE_BRIDGE = "0x4a8bc80Ed5a4067f1CCf107057b8270E0cC11A78";
        const MOCK_TOKEN_BRIDGE = "0xDB5492265f6038831E89f495670FF909aDe94bd9";
        const WormholeMonitor = await hardhat_1.ethers.getContractFactory("WormholeMonitor");
        const monitor = await WormholeMonitor.deploy(MOCK_WORMHOLE_BRIDGE, MOCK_TOKEN_BRIDGE);
        await monitor.waitForDeployment();
        // Create a mock transfer
        const transferId = hardhat_1.ethers.keccak256(hardhat_1.ethers.toUtf8Bytes("test-transfer-1"));
        const sender = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
        const recipient = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC";
        const amount = hardhat_1.ethers.parseEther("1.0");
        const targetChain = 1; // Solana chain ID in Wormhole
        // Record transfer initiation
        await monitor.recordTransferInitiation(transferId, sender, recipient, amount, targetChain);
        // Get transfer status
        const status = await monitor.getTransferStatus(transferId);
        // Check if status is stored correctly
        (0, chai_1.expect)(status.sender).to.equal(sender);
        (0, chai_1.expect)(status.recipient).to.equal(recipient);
        (0, chai_1.expect)(status.amount).to.equal(amount);
        (0, chai_1.expect)(status.targetChain).to.equal(targetChain);
        (0, chai_1.expect)(status.completed).to.equal(false);
        // Record transfer completion
        await monitor.recordTransferCompletion(transferId, recipient, amount);
        // Get updated status
        const updatedStatus = await monitor.getTransferStatus(transferId);
        // Verify transfer is completed
        (0, chai_1.expect)(updatedStatus.completed).to.equal(true);
    });
});
//# sourceMappingURL=WormholeMonitor.test.js.map
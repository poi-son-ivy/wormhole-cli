import { expect } from "chai";
import { ethers } from "ethers";

describe("WormholeMonitor", function () {
    //potential to run long
    this.timeout(60000);

    it("Should deploy the contract successfully", async function() {
        // Get signers
        const [deployer] = await ethers.getSigners();
        
        // Mock addresses for testing
        const MOCK_WORMHOLE_BRIDGE = "0x4a8bc80Ed5a4067f1CCf107057b8270E0cC11A78";
        const MOCK_TOKEN_BRIDGE = "0xDB5492265f6038831E89f495670FF909aDe94bd9";
        
        // Get the contract factory and deploy
        const WormholeMonitor = await ethers.getContractFactory("WormholeMonitor");
        const monitor = await WormholeMonitor.deploy(MOCK_WORMHOLE_BRIDGE, MOCK_TOKEN_BRIDGE);
        await monitor.waitForDeployment();
        
        // Get the contract address
        const monitorAddress = await monitor.getAddress();
        expect(monitorAddress).to.be.properAddress;

        // Check if bridge addresses are stored correctly
        expect(await monitor.wormholeBridge()).to.equal(MOCK_WORMHOLE_BRIDGE);
        expect(await monitor.tokenBridge()).to.equal(MOCK_TOKEN_BRIDGE);
    });
});
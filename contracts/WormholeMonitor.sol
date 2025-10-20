// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title WormholeMonitor
 * @dev A contract to monitor Wormhole cross-chain activities
 * @author Ivy Astrix
 */
 contract WormholeMonitor {
    //Wormhole Core Bridge interface address
    address public wormholeBridge;

    //Wormhole Token Bridge interface address
    address public tokenBridge;

    //Mapping to track monitored transfers
    mapping(bytes32 => TransferStatus) public transferStatus;

    //Struct representation of transfer status
    struct TransferStatus {
        address sender;
        address recipient;
        uint256 amount;
        uint16 sourceChain;
        uint16 targetChain;
        uint256 timestamp;
        bool completed;
    }

    //Events for logging
    event TransferInitiated(bytes32 indexed transferId, address sender, uint16 targetChain, uint256 amount);
    event TransferCompleted(bytes32 indexed transferId, address recipient, uint256 amount);
    event BridgeAddressesUpdated(address wormholeBridge, address tokenBridge);

    /**
     * @dev Constructor to initialize contract
     * @param _wormholeBridge Address of Wormhole Core Bridge
     * @param _tokenBridge Address of Wormhole Token Bridge
     */
    constructor(address _wormholeBridge, address _tokenBridge) {
        wormholeBridge = _wormholeBridge;
        tokenBridge = _tokenBridge;
        emit BridgeAddressesUpdated(_wormholeBridge, _tokenBridge);
    }

    /**
     * @dev Updates bridge addresses
     * @param _wormholeBridge New Wormhole Core Bridge address
     * @param _tokenBridge New Token Bridge Address
     */
    function updateBridgeAddresses(address _wormholeBridge, address _tokenBridge) external {
        //TODO: access control
        wormholeBridge = _wormholeBridge;
        tokenBridge = _tokenBridge;
        emit BridgeAddressesUpdated(_wormholeBridge, _tokenBridge);
    }

    /**
     * @dev Records a new transfer initiation
     * @param transferId Unique ID for transfer
     * @param sender Address initiating transfer
     * @param recipient Target recipient address
     * @param amount Amount being transferred
     * @param targetChain Target chain ID
     */
    function recordTransferInitiation(
        bytes32 transferId,
        address sender,
        address recipient,
        uint256 amount,
        uint16 targetChain
    ) external {
        //TODO: access control

        transferStatus[transferId] = TransferStatus({
            sender: sender,
            recipient: recipient,
            amount: amount,
            sourceChain: getChainId(),
            targetChain: targetChain,
            timestamp: block.timestamp,
            completed: false
        });

        emit TransferInitiated(transferId, sender, targetChain, amount);
    }

    /**
     * @dev Records completion of a transfer
     * @param transferId Unique ID for the transfer
     * @param recipient Address receiving transfer
     * @param amount Amount transferred
     */
    function recordTransferCompletion(
        bytes32 transferId, 
        address recipient, 
        uint256 amount
        ) external {
        //TODO: access control

        require(transferStatus[transferId].sender != address(0), "Transfer not found");
        transferStatus[transferId].completed = true;

        emit TransferCompleted(transferId, recipient, amount);
    }

    /**
     * @dev Get status of a specific transfer
     * @param transferId ID of the transfer
     * @return TransferStatus struct containing details
     */
    function getTransferStatus(bytes32 transferId) external view returns (TransferStatus memory) {
        return transferStatus[transferId];
    }

    /**
     * @dev Helper function to get current chain ID
     * @return chainId the current chain ID
     */
    function getChainId() internal view returns (uint16) {
        uint256 id;
        assembly {
            id := chainid()
        }
        return uint16(id);
    }
 }



    
 

# Wormhole CLI

A command-line tool for monitoring and managing cross-chain token transfers via Wormhole.

## Features

- Monitor cross-chain token transfers in real-time
- Check token balances across multiple chains
- Validate transaction completion status
- View bridge analytics and liquidity

## Technology Stack

- TypeScript for the main CLI application
- Solidity for Ethereum/EVM chain interactions
- Rust for Solana integration

## Installation
```bash
npm install -g .
```

## Usage
```bash
# Monitor cross-chain transfers
wormhole-cli monitor

# Check balances across chains
wormhole-cli balance <address>

# Validate a cross-chain transaction
wormhole-cli validate <txHash>

# View bridge analytics
wormhole-cli analytics
```

## Development
```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build the project
npm run build
```
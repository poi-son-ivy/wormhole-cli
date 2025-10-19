import { Command } from "commander";
import chalk from 'chalk';
import ora from 'ora';

import { getTransferStatus, recordTransferInitiation } from '../ethereum/contract';
import { ethers } from 'ethers';


export function setupMonitorCommand(program: Command) {
    program
    .command('monitor')
    .description('Monitor cross-chain token transfers')
    .option('-c, --chain <chain>', 'Specify chain to monitor (ethereum, solana)', 'all')
    .option('-a, --address <address>', 'Filter by source/destination address')
    .option('-t, --token <token>', 'Filter by token symbol')
    .action(async (options) => {
      const spinner = ora('Connecting to networks...').start();

      try {
        // TODO: actual monitoring logic
        spinner.succeed('Connected to networks');
        console.log(chalk.green('Monitoring cross-chain transfers...'));
        console.log(chalk.yellow('This feature will connect to both Ethereum and Solana networks'));
        console.log(chalk.yellow('And use our custom Solidity contract for data enrichment'));

        // test contract interaction
        if (options.address) {
            // Generate a test transfer ID
            const transferId = ethers.keccak256(ethers.toUtf8Bytes(`test-${Date.now()}`));
            console.log(chalk.blue(`Creating test transfer with ID: ${transferId}`));
            
            await recordTransferInitiation(
              transferId,
              options.address,
              options.address, // Using same address as recipient for test
              "0.01", 
              1 // Solana chain ID
            );

            console.log(chalk.green('Test transfer initiated, fetching status...'));
        
            const status = await getTransferStatus(transferId);
            console.log(chalk.yellow('Transfer Status:'));
            console.log({
                sender: status.sender,
                recipient: status.recipient,
                amount: ethers.formatEther(status.amount),
                sourceChain: status.sourceChain,
                targetChain: status.targetChain,
                timestamp: new Date(Number(status.timestamp) * 1000).toISOString(),
                completed: status.completed
            });
        }

                // TODO: Implementation for filters
                console.log(`Chain filter: ${options.chain}`);
                if (options.address) console.log(`Address filter: ${options.address}`);
                if (options.token) console.log(`Token filter: ${options.token}`);
        
      } catch (error) {
        spinner.fail('Connection failed');
        console.error(chalk.red('Error:'), error);
      }
     });
}
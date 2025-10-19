import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { getTransferStatus } from '../ethereum/contract';
import { ethers } from 'ethers';

export function setupValidatorCommand(program: Command): void {
  program
    .command('validate <transferId>')
    .description('Validate a cross-chain transaction status')
    .action(async (transferId) => {
      const spinner = ora('Fetching transfer status...').start();
      
      try {
        const status = await getTransferStatus(transferId);
        spinner.succeed('Transfer information retrieved');
        
        console.log(chalk.yellow('Transfer Details:'));
        console.log({
          sender: status.sender,
          recipient: status.recipient,
          amount: ethers.formatEther(status.amount),
          sourceChain: status.sourceChain,
          targetChain: status.targetChain,
          timestamp: new Date(Number(status.timestamp) * 1000).toISOString(),
          completed: status.completed
        });
        
        if (status.completed) {
          console.log(chalk.green('✅ Transfer has been completed'));
        } else {
          console.log(chalk.yellow('⏳ Transfer is still pending'));
        }
        
      } catch (error) {
        spinner.fail('Failed to fetch transfer status');
        console.error(chalk.red('Error:'), error);
      }
    });
}
#!/usr/bin/env node
import { Command } from "commander";
import chalk from 'chalk';

// Import command modules (we'll create these next)
import { setupMonitorCommand } from './cli/monitor.js';
import { setupBalanceCommand } from './cli/balance.js';
import { setupValidatorCommand } from './cli/validator.js';
import { setupAnalyticsCommand } from './cli/analytics.js';
import process from "process";

const program = new Command();

console.log(chalk.blue('🌉 Wormhole Bridge Monitor CLI'));

program
    .version('0.1.0')
    .description('A CLI tool for monitoring Wormhole cross-chain activities');

// Register commands
setupMonitorCommand(program);
setupBalanceCommand(program);
setupValidatorCommand(program);
setupAnalyticsCommand(program);

program.parse(process.argv);

// Let's help our user along if they forget arguments
if (!process.argv.slice(2).length) {
    program.outputHelp();
}
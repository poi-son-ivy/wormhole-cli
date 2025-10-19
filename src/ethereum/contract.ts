import { ethers } from "ethers";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";

// env vars
dotenv.config();

// contract ABI from artifacts
const contractAbiPath = path.resolve(__dirname, "../../artifacts/contracts/WormholeMonitor.sol/WormholeMonitor.json");
const contractAbi = JSON.parse(fs.readFileSync(contractAbiPath, "utf8")).abi;

//after deployment
const CONTRACT_ADDRESS = "DEPLOYED_CONTRACT_ADDRESS";

export async function getContractInstance() {
  const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_URL);
  const signer = process.env.PRIVATE_KEY 
    ? new ethers.Wallet(process.env.PRIVATE_KEY, provider)
    : provider;
  
  return new ethers.Contract(CONTRACT_ADDRESS, contractAbi, signer);
}

export async function getTransferStatus(transferId: string): Promise<any> {
  const contract = await getContractInstance();

  return await contract.getTransferStatus?.(transferId);
}

export async function recordTransferInitiation(
  transferId: string,
  sender: string,
  recipient: string,
  amount: string,
  targetChain: number
): Promise<any> {
  const contract = await getContractInstance();
  const tx = await contract.recordTransferInitiation?.(
    transferId,
    sender,
    recipient,
    ethers.parseEther(amount),
    targetChain
  );
  return await tx.wait();
}

export async function recordTransferCompletion(
  transferId: string,
  recipient: string,
  amount: string
): Promise<any> {
  const contract = await getContractInstance();
  const tx = await contract.recordTransferCompletion?.(
    transferId,
    recipient,
    ethers.parseEther(amount)
  );
  return await tx.wait();
}
import { createPublicClient, http, createWalletClient, custom } from "viem";
import { base, baseSepolia } from "viem/chains";

// Base RPC URL
const rpcUrl = "https://base.drpc.org";
// const rpcUrl = 'https://sepolia.base.org';

// Public client
export const publicClient = createPublicClient({
  chain: base,
  transport: http(rpcUrl),
});

// Wallet client
export const walletClient = (wallet: any) =>
  createWalletClient({
    //   account: '0x',
    chain: base,
    transport: custom(wallet.provider),
  });

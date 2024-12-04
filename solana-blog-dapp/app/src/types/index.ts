import { PublicKey } from '@solana/web3.js';
import BN from 'bn.js';

export type BlogPost = {
  publicKey: PublicKey;
  account: {
    title: string;
    content: string;
    author: PublicKey;
    timestamp: BN;
  };
};

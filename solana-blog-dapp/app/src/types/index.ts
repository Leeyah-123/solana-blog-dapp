import * as anchor from '@coral-xyz/anchor';
import { PublicKey } from '@solana/web3.js';

export type BlogPost = {
  publicKey: PublicKey;
  account: {
    title: string;
    content: string;
    author: PublicKey;
    timestamp: anchor.BN;
  };
};

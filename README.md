# Solana Blog Decentralized Application

## Overview

A decentralized blogging platform built on Solana, allowing users to create, read, update, and delete blog posts using Solana.

## Live Deployment

- **Web Application**: [https://solana-blog-dapp.vercel.app](https://solana-blog-dapp.vercel.app)
- **Solana Program**: [Solana Explorer Link](https://solana.fm/address/8ouoyWWRuMmzGcJ64kpbQ8DCERKPX1k1JqDKbPJNN9ra?cluster=devnet-solana)

## Project Structure

```
solana-blog-dapp/
│
├── app/              # React frontend
│   ├── public/
│   ├── src/
│   │   ├── anchor/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── types/
│   │   └── App.tsx
│   ├── package.json
│   └── README.md
│
├── anchor/                # Solana Anchor program
│   ├── programs/
│   │   └── blog/
│   │       └── src/
│   ├── tests/
│   └── Cargo.toml
│
└── README.md
```

## Prerequisites

- Node.js (v16+)
- Yarn
- Rust
- Solana CLI
- Anchor
- Phantom Wallet or similar Solana wallet

## Setup and Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/solana-blog-dapp.git
cd solana-blog-dapp
```

### 2. Set Up Solana Devnet

```bash
solana config set --url devnet
solana airdrop 2
```

### 3. Install Dependencies

```bash
# Install Anchor dependencies
anchor build

# Install frontend dependencies
cd frontend
yarn
```

### 4. Deploy Anchor Program

```bash
anchor deploy
```

### 5. Run Frontend

```bash
yarn dev
```

## Features

- Connect Solana wallet
- Create blog posts
- View blog posts
- Edit your own posts
- Delete your own posts
- Fully decentralized

## Technologies

- Frontend: React, TypeScript
- Blockchain: Solana
- Smart Contract Framework: Anchor
- Wallet Integration: Solana Wallet Adapter

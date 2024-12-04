# Solana Blog Frontend

## Overview

React-based frontend for a decentralized Solana blog application, providing a user-friendly interface for blockchain-powered blogging.

## Features

- Wallet connection via Solana Wallet Adapter
- Create, read, update, and delete blog posts
- Responsive design with Tailwind CSS
- TypeScript support

## Project Structure

```
src/
│
├── pages/
│   ├── BlogListPage.tsx
│   ├── CreatePostPage.tsx
│   └── SinglePostPage.tsx
│
├── anchor/
│   └── idl.ts
│
├── types/
│   └── index.ts
│
├── assets/
│   └── ...
│
└── App.tsx
```

## Prerequisites

- Node.js (v16+)
- Yarn
- Solana Wallet (Phantom, Solflare, etc.)

## Installation

```bash
# Clone the repository
git clone https://github.com/School-of-Solana/program-Leeyah-123.git

# Navigate to frontend directory
cd solana-blog-dapp/app

# Install dependencies
yarn
```

## Running the Application

```bash
# Start development server
yarn dev

# Build for production
yarn build
```

## Key Dependencies

- React
- Solana Wallet Adapter
- Anchor
- Tailwind CSS
- React Router

## Wallet Connection

The application uses `@solana/wallet-adapter-react` for seamless wallet integration. Supported wallets include:

- Phantom
- Solflare
- Sollet
- And more...

## Error Handling

- Comprehensive error messages
- Wallet connection status indicators
- Transaction error logging

## Performance Optimization

- Lazy loading of components
- Efficient state management
- Minimal re-renders

## Deployment

```bash
# Build production version
yarn build

# Deploy to your preferred hosting platform
```

## Troubleshooting

- Ensure wallet is connected
- Check Solana network configuration
- Verify program deployment

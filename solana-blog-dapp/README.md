# Solana Blog Anchor Program

## Overview

A Solana smart contract (program) for a decentralized blogging platform, built using the Anchor framework.

## Program Structure

```
programs/
│
├── src/
│   └── lib.rs         # Main program logic
│
├── tests/
│   └── blog.ts        # Program integration tests
│
└── Cargo.toml         # Rust dependencies
```

## Features

- Create blog posts
- Update blog posts
- Delete blog posts
- Author-only modifications
- Timestamp tracking

## Prerequisites

- Rust
- Solana CLI
- Anchor Framework
- Cargo

## Program Instructions

1. `create_post`: Create a new blog post
2. `update_post`: Modify an existing post
3. `delete_post`: Remove a blog post

## Account Structures

- `Post`: Stores blog post data
  - `title`: Post title
  - `content`: Post content
  - `author`: Post creator's public key
  - `timestamp`: Post creation time

## Installation

```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install Solana CLI
sh -c "$(curl -sSfL https://release.solana.com/v1.10.0/install)"

# Install Anchor
cargo install --git https://github.com/project-serum/anchor anchor-cli --force
```

## Building the Program

```bash
# Build the Anchor program
anchor build

# Run tests
anchor test
```

## Deployment

```bash
# Set Solana cluster
solana config set --url devnet

# Deploy program
anchor deploy
```

## Program Development

```bash
# Create a new program
anchor new blog

# Generate IDL
anchor build

# Run local validator
solana-test-validator
```

## Error Handling

- Custom error types for various scenarios
- Detailed error messages
- Author authentication checks

## Security Considerations

- Author-only post modifications
- Strict access control
- Timestamp validation

## Testing

```bash
# Run Anchor tests
anchor test

## Deployment Checklist
1. Build program
2. Generate IDL
3. Deploy to devnet/mainnet
4. Verify program functionality
5. Update frontend with new program ID

## Common Issues
- Ensure correct Solana network
- Check wallet balance
- Verify program permissions
- Match frontend program ID
```

# ERC20 Token Deployment (Web3.js)

Deploy an ERC20 token to SEI testnet using pre-compiled bytecode. Works in webcontainers!

## Quick Deploy

```bash
npm install
PRIVATE_KEY=your_key npm run deploy
```

## Token Parameters

Edit in `scripts/deploy.js`:
- `TOKEN_NAME` - Your token name
- `TOKEN_SYMBOL` - Your token symbol  
- `INITIAL_SUPPLY` - Initial supply (without decimals)

## Requirements

- Private key (no 0x prefix)
- SEI testnet tokens: https://atlantic-2.app.sei.io/faucet

## Features

- Pre-compiled OpenZeppelin ERC20 bytecode
- No Hardhat/native dependencies needed
- Works in browser environments
- 18 decimal places
- Initial supply minted to deployer

## After Deployment

View on explorer: https://testnet.seistream.app/contracts/YOUR_CONTRACT_ADDRESS
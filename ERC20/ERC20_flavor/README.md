# ERC20 Token Deployment (ethers.js)

Deploy an ERC20 token to SEI testnet using pre-compiled bytecode with ethers.js.

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

- Private key (with or without 0x prefix)
- SEI testnet tokens: https://atlantic-2.app.sei.io/faucet

## Features

- Pre-compiled OpenZeppelin ERC20 bytecode
- Uses ethers.js for modern Web3 interactions
- No compilation needed - pre-compiled bytecode
- Works in both Node.js and browser environments
- 18 decimal places
- Initial supply minted to deployer

## After Deployment

View on explorer: https://testnet.seistream.app/contracts/YOUR_CONTRACT_ADDRESS
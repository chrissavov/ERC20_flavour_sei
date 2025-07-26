# ERC721 Pausable NFT Deployment (ethers.js)

Deploy an ERC721 NFT with pausable functionality to SEI testnet using pre-compiled bytecode with ethers.js.

## Quick Deploy

```bash
npm install
PRIVATE_KEY=your_key npm run deploy
```

## NFT Parameters

Edit in `scripts/deploy.js`:
- `NFT_NAME` - Your NFT collection name
- `NFT_SYMBOL` - Your NFT collection symbol  
- `OWNER_ADDRESS` - Contract owner address (optional, defaults to deployer)

## Requirements

- Private key (with or without 0x prefix)
- SEI testnet tokens: https://atlantic-2.app.sei.io/faucet

## Features

- Pre-compiled OpenZeppelin ERC721 bytecode
- Uses ethers.js for modern Web3 interactions
- No compilation needed - pre-compiled bytecode
- Works in both Node.js and browser environments
- **Pausable functionality**
- **Ownable (access control)**
- **Auto-incrementing token IDs**
- **safeMint function for secure minting**

## Advanced Usage

### Setting Owner

```bash
PRIVATE_KEY=your_key OWNER_ADDRESS=0x123... npm run deploy
```

### Pausable Features

This NFT includes pausable functionality:
- Owner can pause/unpause all transfers
- Prevents minting when paused
- Useful for emergency situations
- Compatible with marketplace integrations

## After Deployment

View on explorer: https://testnet.seistream.app/contracts/YOUR_CONTRACT_ADDRESS
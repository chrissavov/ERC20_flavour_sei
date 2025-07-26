# ERC721 Votes NFT Deployment (ethers.js)

Deploy an ERC721 NFT with voting capabilities to SEI testnet using pre-compiled bytecode with ethers.js.

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

- Pre-compiled OpenZeppelin ERC721Votes bytecode
- Uses ethers.js for modern Web3 interactions
- No compilation needed - pre-compiled bytecode
- Works in both Node.js and browser environments
- **Voting delegation support**
- **Checkpointing for historical voting power**
- **Ownable (access control)**
- **Auto-incrementing token IDs**
- **safeMint function for secure minting**

## Advanced Usage

### Setting Owner

```bash
PRIVATE_KEY=your_key OWNER_ADDRESS=0x123... npm run deploy
```

### Voting Features

This NFT includes ERC721Votes functionality:
- NFT holders can delegate voting power
- Each NFT counts as one vote
- Voting power is tracked through checkpoints
- Historical voting power queries supported
- Compatible with governance systems

## After Deployment

View on explorer: https://testnet.seistream.app/contracts/YOUR_CONTRACT_ADDRESS
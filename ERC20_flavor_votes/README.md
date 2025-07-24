# ERC20 Votes Token Deployment (Web3.js)

Deploy an ERC20 token with voting capabilities to SEI testnet using pre-compiled bytecode. Works in webcontainers!

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
- `OWNER_ADDRESS` - Contract owner address (optional, defaults to deployer)

## Requirements

- Private key (no 0x prefix)
- SEI testnet tokens: https://atlantic-2.app.sei.io/faucet

## Features

- Pre-compiled OpenZeppelin ERC20Votes bytecode
- No Hardhat/native dependencies needed
- Works in browser environments
- 18 decimal places
- Initial supply minted to deployer
- **Voting delegation support**
- **Permit functionality (gasless approvals)**
- **Ownable (access control)**
- **Checkpointing for historical voting power**

## Advanced Usage

### Setting Owner

```bash
PRIVATE_KEY=your_key OWNER_ADDRESS=0x123... npm run deploy
```

### Voting Features

This token includes ERC20Votes functionality:
- Token holders can delegate voting power
- Voting power is tracked through checkpoints
- Historical voting power queries supported
- Compatible with governance systems

## After Deployment

View on explorer: https://testnet.seistream.app/contracts/YOUR_CONTRACT_ADDRESS
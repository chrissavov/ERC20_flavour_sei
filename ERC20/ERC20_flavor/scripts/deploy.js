const { Web3 } = require('web3');
const fs = require('fs');
const path = require('path');

// Pre-compiled contract bytecode and ABI
const CONTRACT_BYTECODE = "0x60806040523480156200001157600080fd5b5060405162000d2e38038062000d2e8339810160408190526200003491620002d2565b82826003620000448382620003d4565b506004620000538282620003d4565b5050506200008a336200006b6200009360201b60201c565b6200007890600a620005b5565b620000849084620005cd565b62000098565b505050620005fd565b601290565b6001600160a01b038216620000c85760405163ec442f0560e01b8152600060048201526024015b60405180910390fd5b620000d660008383620000da565b5050565b6001600160a01b03831662000109578060026000828254620000fd9190620005e7565b909155506200017d9050565b6001600160a01b038316600090815260208190526040902054818110156200015e5760405163391434e360e21b81526001600160a01b03851660048201526024810182905260448101839052606401620000bf565b6001600160a01b03841660009081526020819052604090209082900390555b6001600160a01b0382166200019b57600280548290039055620001ba565b6001600160a01b03821660009081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516200020091815260200190565b60405180910390a3505050565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200023557600080fd5b81516001600160401b03808211156200025257620002526200020d565b604051601f8301601f19908116603f011681019082821181831017156200027d576200027d6200020d565b816040528381526020925086838588010111156200029a57600080fd5b600091505b83821015620002be57858201830151818301840152908201906200029f565b600093810190920192909252949350505050565b600080600060608486031215620002e857600080fd5b83516001600160401b03808211156200030057600080fd5b6200030e8783880162000223565b945060208601519150808211156200032557600080fd5b50620003348682870162000223565b925050604084015190509250925092565b600181811c908216806200035a57607f821691505b6020821081036200037b57634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115620003cf57600081815260208120601f850160051c81016020861015620003aa5750805b601f850160051c820191505b81811015620003cb57828155600101620003b6565b5050505b505050565b81516001600160401b03811115620003f057620003f06200020d565b620004088162000401845462000345565b8462000381565b602080601f831160018114620004405760008415620004275750858301515b600019600386901b1c1916600185901b178555620003cb565b600085815260208120601f198616915b82811015620004715788860151825594840194600190910190840162000450565b5085821015620004905787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b634e487b7160e01b600052601160045260246000fd5b600181815b80851115620004f7578160001904821115620004db57620004db620004a0565b80851615620004e957918102915b93841c9390800290620004bb565b509250929050565b6000826200051057506001620005af565b816200051f57506000620005af565b8160018114620005385760028114620005435762000563565b6001915050620005af565b60ff841115620005575762000557620004a0565b50506001821b620005af565b5060208310610133831016604e8410600b841016171562000588575081810a620005af565b620005948383620004b6565b8060001904821115620005ab57620005ab620004a0565b0290505b92915050565b6000620005c660ff841683620004ff565b9392505050565b8082028115828204841417620005af57620005af620004a0565b80820180821115620005af57620005af620004a0565b610721806200060d6000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c8063313ce56711610066578063313ce567146100fe57806370a082311461010d57806395d89b4114610136578063a9059cbb1461013e578063dd62ed3e1461015157600080fd5b806306fdde0314610098578063095ea7b3146100b657806318160ddd146100d957806323b872dd146100eb575b600080fd5b6100a061018a565b6040516100ad919061056b565b60405180910390f35b6100c96100c43660046105d5565b61021c565b60405190151581526020016100ad565b6002545b6040519081526020016100ad565b6100c96100f93660046105ff565b610236565b604051601281526020016100ad565b6100dd61011b36600461063b565b6001600160a01b031660009081526020819052604090205490565b6100a061025a565b6100c961014c3660046105d5565b610269565b6100dd61015f36600461065d565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b60606003805461019990610690565b80601f01602080910402602001604051908101604052809291908181526020018280546101c590610690565b80156102125780601f106101e757610100808354040283529160200191610212565b820191906000526020600020905b8154815290600101906020018083116101f557829003601f168201915b5050505050905090565b60003361022a818585610277565b60019150505b92915050565b600033610244858285610289565b61024f85858561030d565b506001949350505050565b60606004805461019990610690565b60003361022a81858561030d565b610284838383600161036c565b505050565b6001600160a01b0383811660009081526001602090815260408083209386168352929052205460001981101561030757818110156102f857604051637dc7a0d960e11b81526001600160a01b038416600482015260248101829052604481018390526064015b60405180910390fd5b6103078484848403600061036c565b50505050565b6001600160a01b03831661033757604051634b637e8f60e11b8152600060048201526024016102ef565b6001600160a01b0382166103615760405163ec442f0560e01b8152600060048201526024016102ef565b610284838383610441565b6001600160a01b0384166103965760405163e602df0560e01b8152600060048201526024016102ef565b6001600160a01b0383166103c057604051634a1406b160e11b8152600060048201526024016102ef565b6001600160a01b038085166000908152600160209081526040808320938716835292905220829055801561030757826001600160a01b0316846001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9258460405161043391815260200190565b60405180910390a350505050565b6001600160a01b03831661046c57806002600082825461046191906106ca565b909155506104de9050565b6001600160a01b038316600090815260208190526040902054818110156104bf5760405163391434e360e21b81526001600160a01b038516600482015260248101829052604481018390526064016102ef565b6001600160a01b03841660009081526020819052604090209082900390555b6001600160a01b0382166104fa57600280548290039055610519565b6001600160a01b03821660009081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405161055e91815260200190565b60405180910390a3505050565b600060208083528351808285015260005b818110156105985785810183015185820160400152820161057c565b506000604082860101526040601f19601f8301168501019250505092915050565b80356001600160a01b03811681146105d057600080fd5b919050565b600080604083850312156105e857600080fd5b6105f1836105b9565b946020939093013593505050565b60008060006060848603121561061457600080fd5b61061d846105b9565b925061062b602085016105b9565b9150604084013590509250925092565b60006020828403121561064d57600080fd5b610656826105b9565b9392505050565b6000806040838503121561067057600080fd5b610679836105b9565b9150610687602084016105b9565b90509250929050565b600181811c908216806106a457607f821691505b6020821081036106c457634e487b7160e01b600052602260045260246000fd5b50919050565b8082018082111561023057634e487b7160e01b600052601110045260246000fdfea2646970667358221220015ae62eff61d57b29ecb1c7dca6dc93b2c5b4af050ce80c55420e813ac8714b64736f6c63430008140033";

const CONTRACT_ABI = [{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"uint256","name":"initialSupply_","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"allowance","type":"uint256"},{"internalType":"uint256","name":"needed","type":"uint256"}],"name":"ERC20InsufficientAllowance","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"needed","type":"uint256"}],"name":"ERC20InsufficientBalance","type":"error"},{"inputs":[{"internalType":"address","name":"approver","type":"address"}],"name":"ERC20InvalidApprover","type":"error"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"ERC20InvalidReceiver","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"ERC20InvalidSender","type":"error"},{"inputs":[{"internalType":"address","name":"spender","type":"address"}],"name":"ERC20InvalidSpender","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];

async function main() {
  console.log("🚀 Starting ERC20 Token deployment...");

  // Constructor parameters - these will be modified by Bolt based on user input
  const TOKEN_NAME = "Bolt";
  const TOKEN_SYMBOL = "BOLT";
  const INITIAL_SUPPLY = 1000000; // 1 million tokens (without decimals)

  console.log(`\n📋 Deployment parameters:`);
  console.log(`   Name: ${TOKEN_NAME}`);
  console.log(`   Symbol: ${TOKEN_SYMBOL}`);
  console.log(`   Initial Supply: ${INITIAL_SUPPLY.toLocaleString()} tokens`);

  try {
    // Get configuration from environment
    const PRIVATE_KEY = process.env.PRIVATE_KEY;
    const RPC_URL = process.env.RPC_URL || "https://evm-rpc-testnet.sei-apis.com";

    if (!PRIVATE_KEY) {
      console.error("\n❌ Error: PRIVATE_KEY environment variable is required");
      console.log("\nUsage:");
      console.log("PRIVATE_KEY=your_private_key npm run deploy");
      process.exit(1);
    }

    // Initialize Web3
    const web3 = new Web3(RPC_URL);
    
    // Create account from private key
    const account = web3.eth.accounts.privateKeyToAccount('0x' + PRIVATE_KEY.replace('0x', ''));
    web3.eth.accounts.wallet.add(account);
    
    console.log(`\n🔑 Deployer: ${account.address}`);

    // Check balance
    const balance = await web3.eth.getBalance(account.address);
    console.log(`   Balance: ${web3.utils.fromWei(balance, 'ether')} SEI`);

    if (balance === '0') {
      console.error("\n❌ Error: Insufficient balance. Please get test SEI from the faucet:");
      console.log("   https://atlantic-2.app.sei.io/faucet");
      process.exit(1);
    }

    // Create contract instance
    const contract = new web3.eth.Contract(CONTRACT_ABI);

    // Prepare deployment
    console.log("\n⏳ Deploying contract...");
    const deployTx = contract.deploy({
      data: CONTRACT_BYTECODE,
      arguments: [TOKEN_NAME, TOKEN_SYMBOL, INITIAL_SUPPLY]
    });

    // Estimate gas
    const gas = await deployTx.estimateGas({ from: account.address });
    console.log(`   Estimated gas: ${gas}`);

    // Send deployment transaction
    const gasPrice = await web3.eth.getGasPrice();
    const gasLimit = BigInt(gas) * BigInt(120) / BigInt(100); // Add 20% buffer
    
    const newContract = await deployTx.send({
      from: account.address,
      gas: gasLimit.toString(),
      gasPrice: gasPrice.toString()
    });

    // Get the deployed contract address
    const tokenAddress = newContract.options.address;

    console.log(`\n✅ Token deployed successfully!`);
    console.log(`   Address: ${tokenAddress}`);

    // Get decimals and total supply for verification
    const decimals = await newContract.methods.decimals().call();
    const totalSupply = await newContract.methods.totalSupply().call();
    
    console.log(`\n📊 Token details:`);
    console.log(`   Decimals: ${decimals}`);
    console.log(`   Total Supply: ${web3.utils.fromWei(totalSupply, 'ether')} ${TOKEN_SYMBOL}`);

    // Save deployment info
    const deploymentInfo = {
      network: "sei-testnet",
      tokenAddress: tokenAddress,
      tokenName: TOKEN_NAME,
      tokenSymbol: TOKEN_SYMBOL,
      decimals: Number(decimals),
      initialSupply: INITIAL_SUPPLY,
      totalSupply: totalSupply.toString(),
      deploymentTransaction: "See explorer for transaction details",
      deployer: account.address,
      deployedAt: new Date().toISOString()
    };

    // Save deployment info to deployments directory
    const deploymentsPath = path.join(__dirname, "../deployments");
    if (!fs.existsSync(deploymentsPath)) {
      fs.mkdirSync(deploymentsPath, { recursive: true });
    }

    fs.writeFileSync(
      path.join(deploymentsPath, "sei-testnet-deployment.json"),
      JSON.stringify(deploymentInfo, null, 2)
    );

    // Save contract ABI
    fs.writeFileSync(
      path.join(deploymentsPath, "ERC20_flavor.json"),
      JSON.stringify({
        abi: CONTRACT_ABI,
        bytecode: CONTRACT_BYTECODE
      }, null, 2)
    );

    console.log(`\n📁 Deployment info saved to deployments/`);

    // SEI Testnet specific information
    console.log("\n🌊 SEI Testnet Deployment Info:");
    console.log(`   Network: SEI Atlantic-2 Testnet`);
    console.log(`   Chain ID: 1328`);
    console.log(`   Explorer: https://testnet.seistream.app/contracts/${tokenAddress}`);
    console.log(`   Faucet: https://atlantic-2.app.sei.io/faucet`);
    
    console.log("\n🎉 Deployment complete!");

  } catch (error) {
    console.error("\n❌ Deployment failed:", error.message);
    process.exit(1);
  }
}

main();
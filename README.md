# ERC20-batch-transfer
batch-transfer smart contract and script to call the contract

## How to use

### 1. Replace balanceSheet.js

[Get the balance sheet](https://github.com/hippocrat-dao/ERC20-holder-snapshot), which is a hashtable of keys(addresses) and values(amountsToTransfer).

Balance sheet is not limited to snapshot, can be sourced from various ways!

### 2. Replace CONTRACT_ADDRESS at constants.js

With your deployed one(if you modify BatchTransfer.sol, replace abi as well).

### 3. Create .env file in local and declare ETHERSCAN_API_KEY and SIGNER_PRIVATE_KEY

Just use free API key!

Signer private key must be of the batch-transfer contract owner.

### 4. Run batchTransfer.js

``` bash
$ node batchTransfer.js
```

1 batch transfer(including 220 transfer) executes per minute
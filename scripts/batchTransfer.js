const fs = require('fs');
const ethers = require('ethers');
const { CONTRACT_ADDRESS, CONTRACT_ABI } = require('./constants');
require('dotenv').config();

const provider = new ethers.providers.EtherscanProvider('homestead', process.env.ETHERSCAN_API_KEY);
const signer = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

let holders = [];
let balances = [];

const sleep = async (sec) => await new Promise(
    resolve => setTimeout(resolve, sec * 1000)); 

const batchTransfer = async () => {
    // read snapshot balanceSheet
    const snapshot = JSON.parse(
        await fs.promises.readFile(
            './scripts/balanceSheet.json',
            'utf-8')
    );
    // get holders and balances as array from snapshot
    const snapshotMap = new Map(Object.entries(snapshot));
    snapshotMap.forEach((value, key, map) => {
        holders.push(key);
        balances.push(ethers.BigNumber.from(
            BigInt(value)));
    });
    // 1 batchTransfer for 220 transfer
    for (let i = 0; i < parseInt(holders.length/220); i++) {
        console.log(`batch transfer ${i+1} starts`);
        const tx = await contract.batchTransfer(
            holders.slice(i * 220, (i+1) * 220), 
            balances.slice(i * 220, (i+1) * 220)
            );
        console.log(tx);
        // 1 min for 1 batchTransfer
        await sleep(60);
    }
    console.log('batch transfer final starts');
    const tx = await contract.batchTransfer(
        holders.slice(13200, holders.length-1), 
        balances(13200, balances.length-1),
        )
    console.log(tx);
    console.log('batch transfer final ends');
}
    
batchTransfer();
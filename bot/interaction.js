console.warn = () => {}; // to suppress web3 warnings
const Web3 = require('web3');
const sra = require("./sra");
const fs = require('fs');
var forge = require('node-forge');
const NodeRSA = require('node-rsa');
var BigInteger = require('node-rsa/src/libs/jsbn.js');
var HDWalletProvider = require("truffle-hdwallet-provider");
var address = "0x6DE29c6a03E2694C3217820ed2e595E24f1145B9";
var seed = "doctor grow remind robust fresh shaft stay crush clerk urge tiger dignity";
var contractAddress; // will have the deployed contract address
const provider = new HDWalletProvider(seed,"https://kovan.infura.io/v3/b1be893adce946fe83841884d990ebf3",0,2);
const web3 = new Web3(provider);
var abi = fs.readFileSync("abi.json").toString();

// will hold the index of the cards currently in play(max cards in here is 9)
var cardIndexUsed = new Array();

//howMany is how many random indexes you want to generate, must be integer. puts them in cardIndexUsed
function getRandomIndex(howMany){
    
    for(var i = 0 ; i < howMany ;i++){
        do{
        random = parseInt(forge.util.bytesToHex(forge.random.getBytesSync(32)),16);
        randomIndex = random % 52;
        }
        while(cardIndexUsed.includes(randomIndex));
        cardIndexUsed.push(randomIndex);
    }

}

async function deployContract(){
    const accounts = await web3.eth.getAccounts();
    //let abi = fs.readFileSync("abi.json").toString();
    let bytecode = fs.readFileSync("bytecode.txt").toString();
    console.log("Starting deployment of contract...");
    let contract = await new web3.eth.Contract(JSON.parse(abi)).deploy({data: '0x'+ bytecode}).send(
        {
            from: accounts[1],
            gas: 10000000,
            gasPrice: await web3.eth.getGasPrice()
        }
    );
    console.log("Deployment transaction finished broadcasting");
    contractAddress = await contract.options.address;
    console.log("Contract Address is: ",contractAddress);
}

async function deal(){
    await deployContract();
    console.log("STARTING DEAL FUNCTION");
    let encrDeck;

    //array to send to contract, will hold player and casinos hand
    let sendResult = new Array();

    //keygen
    sra.sra_keygen();
    sra.Deck();
    sra.encDeck();
    encrDeck = sra.getEncDeck();
    // shuffles encrypted deck
    sra.shuffle(encrDeck);
    // step two: generate four random indexes
    getRandomIndex(4);
    //step 3: 
    //this is the part where Ming would give which cards player chose, hard coded it for now
    let pChoice1 = 2;
    let pChoice2 = 0;
    let cChoice1 = 1;
    let cChoice2 = 3;
    
    //for players hand
    sendResult.push(sra.p1Decrypt(sra.p2Encrypt(encrDeck[cardIndexUsed[pChoice1]])));
    sendResult.push(sra.p1Decrypt(sra.p2Encrypt(encrDeck[cardIndexUsed[pChoice2]])));
    // for casinos hand
    sendResult.push(encrDeck[cardIndexUsed[cChoice1]]);
    sendResult.push(encrDeck[cardIndexUsed[cChoice2]]);
    console.log("Player card 1 is: ", sendResult[0]);
    console.log("Player card 2 is: ", sendResult[1]);
    console.log("Casino card 1 is: ", sendResult[2]);
    console.log("Casino card 2 is: ", sendResult[3]);
    //step 4: write code to send sendResult to the smart contract:
    console.log("Sending card deal....");
    const accounts = await web3.eth.getAccounts();
    let contractInstance = await new web3.eth.Contract(JSON.parse(abi),contractAddress);
    await contractInstance.methods.cardDeal(sendResult).send({
        from: accounts[1],
        gas: 1000000

    });
    console.log("Dealt cards were sent");
    // reading data from contract to see if it was set correctly
    const data = await contractInstance.methods.getData().call({
        from: accounts[1],
        gas: 1000000

    });
    console.log("Reading players hand from the smart contract I get: ", data);

}
deployContract();
//deal();
// close provider process 
provider.engine.stop();








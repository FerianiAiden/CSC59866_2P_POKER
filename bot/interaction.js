console.warn = () => {}; // to suppress web3 warnings
const Web3 = require('web3');
const web3 = new Web3('https://kovan.infura.io/v3/b1be893adce946fe83841884d990ebf3'); 
const sra = require("./sra");
var forge = require('node-forge');
const NodeRSA = require('node-rsa');
var BigInteger = require('node-rsa/src/libs/jsbn.js');

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

function deal(){
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
    
    //step 4: write code to send sendResult to the smart contract:
}
deal();
//console.log(sra.getDeck());

/***********code for sending to contract below, doesnt work yet*************** */

//thing to note, private functions not included in abi, so cant be used outside of contract

// var myAddress = "0x6DE29c6a03E2694C3217820ed2e595E24f1145B9"; // used to sign transactions
// var address = "0x14b1c23A47993AaD338770c4BE219a3E8D544003" // address of contract i deployed, later write code to automate this
// const contract = new web3.eth.Contract(abi,address);
// console.log("can interact with contract!!");
// var a = sra.deck;
// //console.log("A IS: ", a);
// sra.Deck();
// a = sra.getDeck();
// //console.log("A IS: ", a);
// // if transaction runs out of gas here, specify how much gas 
// async function sendDeck(){
// await contract.methods.setEncDec(a).send({
//     from: myAddress

// })
// console.log("Transaction was broadcasted to blockchain");
// }
// sendDeck();






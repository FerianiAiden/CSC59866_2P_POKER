var forge = require('node-forge');
const NodeRSA = require('node-rsa');
var BigInteger = require('node-rsa/src/libs/jsbn.js');
// keys will be in k1,k2 after sra_keygen
var k1;
var k2;

var suit = ["spades", "diamonds", "clubs", "hearts"];
var value = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var deck = new Array();

// deck of encrypted cards, THIS IS WHAT GETS SHUFFLED
var encryptedDeck = new Array();

// getters for other files 
function getK1(){return k1;}
function getK2(){return k2;}
function getEncDeck(){return encryptedDeck;}
function getDeck(){return deck;}

//each player has their own (e,d)
function sra_keygen(){
    let e1;
    let e2;
    
    forge.prime.generateProbablePrime(20,  function(err, num) {
        //console.log('random prime', num.toString(16));
         e1 = parseInt(num.toString(10));
    });
    forge.prime.generateProbablePrime(20,  function(err, num) {
        //console.log('random prime', num.toString(16));
         e2 = parseInt(num.toString(10));
    });
    k1 = new NodeRSA({b:512,e:e1});
    k1.setOptions({encryptionScheme: 'pkcs1'});
    p2N = k1.keyPair.n;
    p2P = k1.keyPair.p;
    p2Q = k1.keyPair.q;

    //making 2nd players key:
    k2 = new NodeRSA({b:512,e:e2});
    k2.setOptions({encryptionScheme: 'pkcs1'});
    k2.keyPair.n = p2N;
    k2.keyPair.p = p2P;
    k2.keyPair.q = p2Q;
    //computing phi(n) and d for k2
    pMinus = p2P.subtract(BigInteger.ONE);
    qMinus = p2Q.subtract(BigInteger.ONE);
    phiN = pMinus.multiply(qMinus);

    //converting e to biginteger
     eBig = new BigInteger(e2.toString());
    p2D = eBig.modInverse(phiN);
    //computing CRT stuff...
    dmp1 = p2D.mod(pMinus);
    dmq1 = p2D.mod(qMinus);
    coeff = p2Q.modInverse(p2P);
    k2.keyPair.d = p2D;
    k2.keyPair.dmp1 = dmp1;
    k2.keyPair.dmq1 = dmq1;
    k2.keyPair.coeff = coeff;
}

function p1Encrypt(m){
    // write function to manually determine cipher(c = m^e mod n ),ms is message as string
    let mBig = new BigInteger(m);
    let eBig = new BigInteger(k1.keyPair.e.toString());
    let cBig = mBig.modPow(eBig,k1.keyPair.n);
    let c = cBig.toString();
    return c;     
}
function p2Encrypt(m){
    // write function to manually determine cipher(c = m^e mod n )
    let mBig = new BigInteger(m);
    let eBig = new BigInteger(k2.keyPair.e.toString());
    let cBig = mBig.modPow(eBig,k2.keyPair.n);
    let c = cBig.toString();
    return c;  
}
function p1Decrypt(c){ 
    // computes m = c^d mod n, c is ciphertext, as string
    let cBig = new BigInteger(c);
    let d = k1.keyPair.d;
    let mBig = cBig.modPow(d,k1.keyPair.n);
   let m = mBig.toString();
    return m      
}
function p2Decrypt(c){
    // computes m = c^d mod n
    let cBig = new BigInteger(c);
    let d = k2.keyPair.d;
    let mBig = cBig.modPow(d,k2.keyPair.n);
    let m = mBig.toString();
    return m      
}

function Deck()
{
	for (var i = 0; i < suit.length; i++)
	{
		for (var j = 0; j < value.length; j++)
		{
            let message = value[j].concat(suit[i]);
            let messageBig = new BigInteger(message);
			var card = {Value: value[j], Suit: suit[i],Message: messageBig.toString()};
			deck.push(card);
		}
	}
}

//fisher-yates shuffle algorithm
async function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // get random number using node-forge
      random = parseInt(forge.util.bytesToHex(forge.random.getBytesSync(32)),16);
      randomIndex = random % currentIndex;
      currentIndex -= 1;
      //swap
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  }

function encDeck(){
    // encrypts whole deck with p1 key, will be stored in encryptedDeck
    for(var i = 0;i < deck.length;i++){
        encryptedDeck.push(p1Encrypt(deck[i].Message));
    }

}
 
/****************EXAMPLE SRA**************** */
// sra_keygen();
// const message = "test message";
// // message representation in biginteger
// messageBig = new BigInteger(message);
// console.log("Original message: ",messageBig);
// c1 = p1Encrypt(message);
// c2 = p2Encrypt(c1);
// d1 = p1Decrypt(c2);
// d2 = p2Decrypt(d1);
// d2Big = new BigInteger(d2);
// console.log("message after two decryptions is: ",d2Big);

//Deck();
//console.log("deck is: ",deck);
//encDeck();
//console.log("ENCRYPTED DECK IS: ", encryptedDeck);
//shuffle(encryptedDeck);
//console.log("ENCRYPTED DECK SHUFFLED IS: ", encryptedDeck);

/**************************************************************** */


function count(){
    var ans = new Array();
    for(var i = 0; i < value.length;i++){
        var card = {Value: value[i], Occurences: 0};
        ans.push(card);

    }
    
    for(var j = 0 ; j < ans.length;j++){
        for(var k = 0; k <deck.length;k++){
            if(ans[j].Value == deck[k].Value){

            ans[j].Occurences++;
            } 
        }
    }
    
    return ans;
}

module.exports = {sra_keygen,p1Encrypt,p1Decrypt,p2Encrypt,p2Decrypt,Deck,shuffle,encDeck,getK1,getK2,getDeck,getEncDeck};









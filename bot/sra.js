var forge = require('node-forge');
const NodeRSA = require('node-rsa');
var BigInteger = require('node-rsa/src/libs/jsbn.js');
var pkcs1 = require('node-rsa/src/schemes/pkcs1.js');
var crypt = require('crypto');
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
async function sra_keygen(){
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
    // just computes c = m^e mod n. does not pad m. m has to be buffer

    // write function to manually determine cipher(c = m^e mod n )
    let mBig = new BigInteger(m);
    let eBig = new BigInteger(k1.keyPair.e.toString());
    let cBig = mBig.modPow(eBig,k1.keyPair.n);
    let c = cBig.toBuffer("utf8");
    return c;     
}
function p2Encrypt(m){
    //pads message and ecncrypts it. m has to be buffer
    // write function to determine cipher(c = m^e mod n )
    let mBig = new BigInteger(m);
    let eBig = new BigInteger(k2.keyPair.e.toString());
    let cBig = mBig.modPow(eBig,k2.keyPair.n);
    let c = cBig.toBuffer("utf8");
    return c;  
}
function p1Decrypt(c){
    // computes m = c^d mod n, c is ciphertext, c is buffer of bytes 
    // returns message as a buffer, to turn to string just do toString()
    let cBig = new BigInteger(c);
    let d = k1.keyPair.d;
    let mBig = cBig.modPow(d,k1.keyPair.n);
   let m = mBig.toBuffer("utf8");
    return m;      
}
function p2Decrypt(c){
    // computes m = c^d mod n, c is ciphertext, c is buffer of bytes 
    // returns message as a buffer, to turn to string just do toString()
    let cBig = new BigInteger(c);
    let d = k2.keyPair.d;
    let mBig = cBig.modPow(d,k2.keyPair.n);
   let m = mBig.toBuffer("utf8");
    return m;      
}
function padMessage(m){
    // pads m with pkcs1, m has to be buffer
    let k1Scheme = pkcs1.makeScheme(k1.keyPair,'pkcs1');
    return k1Scheme.encPad(m,2);

}
function unPadMessage(m){
    // unpads message m assuming m was padding with pkcs1, m has to be buffer, returns buffer
    let k1Scheme = pkcs1.makeScheme(k1.keyPair,'pkcs1');
    byte_buf = Buffer.alloc(1); //one byte of zero
    buf_array = [byte_buf,m];
    padded_message = Buffer.concat(buf_array);
    final_m = k1Scheme.encUnPad(padded_message);
    return final_m;      
}

function Deck()
{
	for (var i = 0; i < suit.length; i++)
	{
		for (var j = 0; j < value.length; j++)
		{
            let message = value[j].concat(suit[i]);
			var card = {Value: value[j], Suit: suit[i],Message: Buffer.from(message)};
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
    // pads each card and encrypts it with k1. stored in encryptedDeck
    for(var i = 0;i < deck.length;i++){
        padded_m = padMessage(deck[i].Message);
        encryptedDeck.push(p1Encrypt(padded_m));
    }

}
//********************EXAMPLE SRA WITH PADDING************* */
// sra_keygen();
// const message = "testmessage";
// messageBuf = Buffer.from(message,'utf8');
// console.log("message is: ",message);
// console.log("message buffer is: ", messageBuf,"\n");

// padded_m = padMessage(messageBuf);
// console.log("Padded message is: ", padded_m);

// enc = p1Encrypt(padded_m);
// enc2 = p2Encrypt(enc);
// dec1 = p1Decrypt(enc2);
// dec2 = p2Decrypt(dec1);
// console.log("AFTER TWO DECRYPTIONS: ", dec2);
// console.log("MESSAGE UNPADDED IS: ",unPadMessage(dec2).toString());

//******************************************************************** */

/*********************SRA WITH PADDING EXAMPLE ON CARDS****************************************** */
// sra_keygen();
// Deck();
// encDeck();
// shuffle(encryptedDeck);
// //console.log(encryptedDeck);
// //my_string = encryptedDeck[0].toString("hex"); // buffer to hex string
// //console.log(my_string);
// enc2 = p2Encrypt(encryptedDeck[0]);
// dec1 = p1Decrypt(enc2);
// dec2 = p2Decrypt(dec1);
// console.log("RESULT AFTER TWO DECRYPTIONS: ",unPadMessage(dec2).toString());


/************************************************************************************* */

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

module.exports = {sra_keygen,p1Encrypt,p1Decrypt,p2Encrypt,p2Decrypt,Deck,shuffle,encDeck,getK1,getK2,getDeck,getEncDeck,padMessage,unPadMessage};









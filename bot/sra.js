var forge = require('node-forge');
const NodeRSA = require('node-rsa');
var BigInteger = require('node-rsa/src/libs/jsbn.js');
// keys will be in k1,k2 after sra_keygen
var k1;
var k2;

exports.BigInteger = BigInteger;
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
sra_keygen();
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

/****************EXAMPLE**************** */
const message = "test message";
// message representation in biginteger
messageBig = new BigInteger(message);
console.log("Original message: ",messageBig);
c1 = p1Encrypt(message);
c2 = p2Encrypt(c1);
d1 = p1Decrypt(c2);
d2 = p2Decrypt(d1);
d2Big = new BigInteger(d2);
console.log("message after two decryptions is: ",d2Big);





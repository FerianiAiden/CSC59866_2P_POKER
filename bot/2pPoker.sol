pragma solidity 0.7.4;
pragma experimental ABIEncoderV2;


contract Poker {
     
     enum STAGES {
         DEALING, //Will include blindfees
         PREFLOP,
         FLOP,
         TURN,
         RIVER,
         PAYOUT
          }
    
    STAGES stages;
    address payable public player1; //The first player to deploy the contract will be assigned player1
    address payable public player2; 
    uint256 public blindFeeBig = 0.002 ether;
    uint256 public blindFeeSmall = 0.001 ether;
    uint256 public betPlayer1;
    uint256 public betPlayer2;
    //their hands encrypted
    string[2] public playerHand;
    string[2] public casinoHand;
    
    //community pile cards (not encrypted)
    string[5] public communityPile;
    
    
    // hashes of their hand. Hashes them one by one and puts them here
    bytes32[2] public playerCommitment;
    bytes32[2] public casinoCommitment;
    bytes32[5] public communityPileCommitment;
    bytes32[2] public sharesCommitment; // first index is player, second is casino
    
    
    //bool public Folded = false; 
    //bool public gameOver;
    //uint256 public gameTimeInterval; 
    //uint256 public gameTime = 2**256 - 1;
    
    //event gameHosted();
    
    // struct gameState {
    //     uint8 num;
    //     address whoseTurn;
    // }
    
    //gameState public state;
    
    constructor() {
        player1 = msg.sender;
        stages = STAGES.DEALING;
        betPlayer1 = blindFeeBig; //first player to join is dealer aka P1, this part should be handled in joinGame
        
    }
    
    // function that can be called to receive ether, might not be needed
    receive() external payable{
        require(msg.value >= .001 ether,"Send at least .001 ether :) ");
        
    }
    
    // returns current balance of contract
    function getBalance() external view returns(uint){
        return address(this).balance;
    }
    // for player to join game
    function joinGame() public payable {
        //require(!gameOver, "Game was canceled."); // maybe take this out
        require(msg.value == blindFeeSmall, "invalid bet amount. Must be .001 ether");
        require(stages == STAGES.DEALING,"Not in the dealing phase");
        player2 = msg.sender;
        betPlayer2 = msg.value;
        // state.whoseTurn = player1; // this should adjust when determining who the Dealer is 
        
        //emit gameHosted();
        }
        
     // This is called when player wants to leave(press quit on front end), transfers the funds back to casino:
    function leaveGame() public {
        require(msg.sender == player1, "Only casino has access to this.");
        player1.transfer(address(this).balance);
    }
    
    // commits share of the player by hashing
    function commitPlayerShare(string memory x) public{
        sharesCommitment[0] = keccak256(abi.encodePacked(x));
    }
    
    function commitCasinoShare(string memory x) public{
        sharesCommitment[1] = keccak256(abi.encodePacked(x));
    }
    function getSharesCommit() public view returns(bytes32[2] memory){
        return sharesCommitment;
    }
    //deal function, assigns card to its according player
    function cardDeal(string[4] memory x) public{
        playerHand[0] = x[0];
        playerHand[1] = x[1];
        casinoHand[0] = x[2];
        casinoHand[1] = x[3];
        
        // now commitment
        playerCommitment[0] = keccak256(abi.encodePacked(x[0]));
        playerCommitment[1] = keccak256(abi.encodePacked(x[1]));
        casinoCommitment[0] = keccak256(abi.encodePacked(x[2]));
        casinoCommitment[1] = keccak256(abi.encodePacked(x[3]));
        
        //change stage of game
        stages = STAGES.PREFLOP;
    }
    
    function getP1Hand()public view returns ( string[2] memory){
        return playerHand;
    }
    
    function getP2Hand()public view returns ( string[2] memory){
        return casinoHand;
    }
    
    function getP1Commitment() public view returns(bytes32[2] memory){
        return casinoCommitment;
    }
    
    function getP2Commitment() public view returns(bytes32[2] memory){
        return playerCommitment;
    }
    
    function flop(string[3] memory x) public{
        communityPile[0] = x[0];
        communityPile[1] = x[1];
        communityPile[2] = x[2];
        
        //commitment 
        communityPileCommitment[0] = keccak256(abi.encodePacked(x[0]));
        communityPileCommitment[1] = keccak256(abi.encodePacked(x[1]));
        communityPileCommitment[2] = keccak256(abi.encodePacked(x[2]));
    }
    
    // getters for flop
    function getCommunityPile() public view returns (string[5] memory){
        return communityPile;
    }
    
    function getCommunityPileCommitment() public view returns (bytes32[5] memory){
        return communityPileCommitment;
    }
    
    function turn(string memory x) public{
        communityPile[3] = x;
        communityPileCommitment[3] = keccak256(abi.encodePacked(x));
    }
    
    function river(string memory x) public{
        communityPile[4] = x;
        communityPileCommitment[4] = keccak256(abi.encodePacked(x));
    }
    
    //functions to go to certain state below
    function goToFlop() public{
        require(msg.sender == player1);
        stages = STAGES.FLOP;
    }
    function goToTurn() public{
        require(msg.sender == player1);
        stages = STAGES.TURN;
    }
    function goToRiver() public{
        require(msg.sender == player1);
        stages = STAGES.RIVER;
    }
    function goToPayout() public {
        require(msg.sender == player1);
        stages = STAGES.PAYOUT;
    }
    
    
    
    function  Call(uint256 amount) public payable {
        // amount is how much to call in wei
       //require(msg.sender == state.whoseTurn, "Denied - not your turn");
       require(msg.value == amount, "Not calling by the correct amount");
       if(msg.sender == player1){
           betPlayer1+=amount;
       }
       
       else if(msg.sender == player2){
           betPlayer2+=amount;
       }
    }
    
    // this function might not need to be called in the front end as its not really doing anything
    function Check() public payable{
         require(msg.value == 0,"cant bet if you are checking");
    }
    
    function Raise(uint256 amount) payable public { //needs to be tweaked to control raise factor
        //require(msg.sender == state.whoseTurn, "Denied - not your turn");
        require(msg.value == amount,"raised by wrong amount");
         if ( msg.sender == player1){
             betPlayer1+=amount;
             
         }
        else if(msg.sender == player2){
           betPlayer2+=amount;
       }
    }
    
    // function to get contract ready for new game
    function restartGame() public{
        stages = STAGES.DEALING;
        betPlayer1 = blindFeeBig;
        betPlayer2 = 0;
        playerHand[0] = "";
        playerHand[1] = "";
        casinoHand[0] = "";
        casinoHand[1] = "";
        playerCommitment[0] = "";
        playerCommitment[1] = "";
        casinoCommitment[0] = "";
        casinoCommitment[1] = "";
        communityPile[0] = "";
        communityPile[1] = "";
        communityPile[2] = "";
        communityPile[3] = "";
        communityPile[4] = "";
        communityPileCommitment[0] = "";
        communityPileCommitment[1] = "";
        communityPileCommitment[2] = "";
        communityPileCommitment[3] = "";
        communityPileCommitment[4] = "";
        
    }
    
    function Fold() public {
        //require(msg.sender == state.whoseTurn, "Denied - not your turn");
         if ( msg.sender == player1){
             player2.transfer(betPlayer2+betPlayer1);
         }
        else if (msg.sender == player2){player1.transfer(betPlayer1+betPlayer2);}
        stages = STAGES.DEALING;
        restartGame();
        
    
    }
    //will complete this function once Orion finishes all of the implementation of the rules
    function splitPot(uint256 result) public{
        // bunch of requires here for reveal
        require(stages == STAGES.PAYOUT, "Denied - Not in Payout stage");
        if(result == 2){
            player1.transfer(betPlayer1);
            player2.transfer(betPlayer2);
        }
        
    }
    
    
}
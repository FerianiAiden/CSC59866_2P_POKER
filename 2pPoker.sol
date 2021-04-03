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
          
    /*/ Variables (more to add soon) /*/
    
    address payable public player1; //The first player to deploy the contract will be assigned player1
    address payable public player2; 
    
    
    uint256 public blindFeeBig = 0.002 ether;
    uint256 public blindFeeSmall = 0.001 ether;
    uint256 public betPlayer1;
    uint256 public betPlayer2;
    //their hand encrypted
    string[2] public playerHand;
    string[2] public casinoHand;
    string[5] public communityPile;
    
    
    // hashes of their hand. Hashes them one by one and puts them here
    bytes32[2] public playerCommitment;
    bytes32[2] public casinoCommitment;
    bytes32[5] public communityPileCommitment;
    
    
    bool public Folded = false; 
    bool public gameOver;
    uint256 public gameTimeInterval; 
    uint256 public gameTime = 2**256 - 1;
    
    event gameHosted();
    
    struct gameState {
        uint8 num;
        address whoseTurn;
    }
    
    gameState public state;
    

     //CommunityPile (?maybe)
    
    //Initialize method:
    
    constructor() payable {
        player1 = msg.sender;
        stages = STAGES.DEALING;
        betPlayer1 = blindFeeSmall; //first player to join is dealer aka P1, this part should be handled in joinGame
        
    }
    
        
    
    
    // modifier atStage(Stages _stage) {
    //         require( stage == _stage, "Action cannot be performed during this phase."
    //         );
    //         _;
    // }
    
    // function nextPhase() internal {
    //     stage = Stages(uint(stage)+1);
    // }
    
    
    // for player to join game
    function joinGame() public payable {
        require(!gameOver, "Game was canceled."); // maybe take this out
        require(msg.value == blindFeeBig, "invalid bet amount. Must be .002 ether");
        require(stages == STAGES.DEALING,"Not in the dealing phase");
        //more require statements to be implemented 
        
        player2 = msg.sender;
        betPlayer2 = msg.value;
        // state.whoseTurn = player1; // this should adjust when determining who the Dealer is 
        
        emit gameHosted();
        }
        
     // When P1 wants to cancel before any player joins the game - refunds their entry fee :
    function leaveGame() public {
        require(msg.sender == player1, "Only P1 can cancel the game.");
       // require(player2 == 0, "Action denied - game already started."); 
        msg.sender.transfer(address(this).balance);
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
    
    //functions to go to certain state below
    function goToFlop() public{
        stages = STAGES.FLOP;
    }
    function goToTurn() public{
        stages = STAGES.TURN;
    }
    function goToRiver() public{
        stages = STAGES.RIVER;
    }
    function goToPayout() public{
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
    
    function Check() public payable{
        //require(msg.sender == state.whoseTurn, "Denied - not your turn");
        //needs more require(s)
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
    
    function restartGame() public{
        // function that sets contract to initial state
        
    }
    
    function Fold() public {
        //require(msg.sender == state.whoseTurn, "Denied - not your turn");
         if ( msg.sender == player1){
             player2.transfer(betPlayer2+betPlayer1);
         }
        else if (msg.sender == player2){player1.transfer(betPlayer1+betPlayer2);
        stages = STAGES.DEALING;
        //restartGame function call here that sets contract to its initial state
            
        }
    
    }
    
    
    }
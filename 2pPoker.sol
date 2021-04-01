pragma solidity 0.7.4;
pragma experimental ABIEncoderV2;


    contract Poker {
     
     enum Stages {
         Dealing, //Will include blindfees
         PreFlop,
         Flop,
         Turn,
         River,
         Payout
          }
          
    /*/ Variables (more to add soon) /*/
    
    address payable public player1; //The first player to deploy the contract will be assigned player1
    address payable public player2; 
    
    
    uint256 public blindFeeBig = 0.002 ether;
    uint256 public blindFeeSmall = 0.001 ether;
    uint256 public betPlayer1;
    uint256 public betPlayer2;
    string[2] public playerHand;
    string[2] public casinoHand;
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
    
    constructor(uint256 _gameTimeInterval) payable {
        player1 = msg.sender;
        blindFeeSmall = msg.value; //first player to join is dealer aka P1
        gameTimeInterval = _gameTimeInterval; 
        
    }
    
        
    Stages public stage = Stages.Dealing;
    
    modifier atStage(Stages _stage) {
            require( stage == _stage, "Action cannot be performed during this phase."
            );
            _;
    }
    
    function nextPhase() internal {
        stage = Stages(uint(stage)+1);
    }
    
    
    
    function joinGame() public payable {
        require(!gameOver, "Game was canceled.");
        require(msg.value == blindFeeBig, "invalid bet amount");
        //more require statements to be implemented 
        
        player2 = msg.sender;
        state.whoseTurn = player1; // this should adjust when determining who the Dealer is 
        
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
    }
    
    function getP1Hand()public view returns ( string  [2] memory){
        return playerHand;
    }
    
    function getP2Hand()public view returns ( string  [2] memory){
        return casinoHand;
    }
    

    
    function  Call() public view {
       require(msg.sender == state.whoseTurn, "Denied - not your turn");
       
       if ( msg.sender == player1){
          betPlayer1 == betPlayer2;
       }
        else { betPlayer2 == betPlayer1;}
    }
    
    function Check() public {
        require(msg.sender == state.whoseTurn, "Denied - not your turn");
        //needs more require(s)
         if ( msg.sender == player1){
             state.whoseTurn = player1;
              }
        else {state.whoseTurn =player2;}
    }
    
    function Raise() payable public { //needs to be tweaked to control raise factor
        require(msg.sender == state.whoseTurn, "Denied - not your turn");
         if ( msg.sender == player1){
             msg.value > betPlayer1;
             
         }
        else {msg.value > betPlayer2;}
    }
    
    function Fold() public {
        require(msg.sender == state.whoseTurn, "Denied - not your turn");
         if ( msg.sender == player1){
             player2.transfer(betPlayer2+betPlayer1);
         }
        else {player1.transfer(betPlayer1+betPlayer2);
            
        }
    
    }
    
    
    
    
    
    
    
    
    }
pragma solidity 0.6.6;


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
    address payable public player2; //To join as P2, account must call join() 
    
    uint256 public blindFeeBig;
    uint256 public blindFeeSmall;
    uint256 public betAmount1;
    uint256 public betAmount2;
    uint256 public Pot;
    
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
    
    
    Stages public stage = Stages.Dealing;
    
    modifier atStage(Stages _stage) {
            require( stage == _stage, "Action cannot be performed during this phase."
            );
            _;
    }
    
    function nextPhase() internal {
        stage = Stages(uint(stage)+1);
    }
    
    modifier onlyDealer() {
        // require(msg.sender == , "Only the dealer can perform this action");
    _;
    }

    
    function joinGame() public payable {
        require(!gameOver, "Game was canceled.");
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
    
    /*/ Functions for Dealing start HERE /*/
    
    /*/ General postDealing functions /*/
    
    function  Call() public {}
    
    function Check() public {}
    
    function Raise() public {}
    
    function Fold() public {}
    
    /*/ Functions for PreFlop start HERE /*/
    
    /*/ Functions for Flop start HERE /*/
    
    /*/ Funtions for Turn start HERE /*/ 
    
    /*/ Functions for River start HERE /*/
    
    /*/ Functions for Payout start HERE /*/
    
    
    
    
    
    
    }
    
    
    
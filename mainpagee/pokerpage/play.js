const button = document.querySelector('#bet');
const button2 = document.querySelector('#fold')
const button3 = document.querySelector('#top_up');
const button4 = document.querySelector('#transfer');
const button5 = document.querySelector('#raise');
const button6 = document.querySelector('#check');
const button7 = document.querySelector('#call');
const status = document.querySelector('#status');
const milliethers = document.querySelector('#milliethersCount');
const text1 = document.querySelector('#betmsg');
const text2 = document.querySelector('#bet_total');

var milliethersCount = 100;
var max_card = 2;
var chose = 0;
var approve = false;
var bet_total = 0;
var clicked_bet = false;
var finished_Turn = false;
var finished_River = false;
var picked_2cards = false;
var timer = false;
var folded = false;
var first_round = true;
let call_bet = 1;
var casino_folded = false;
var casino_called = false;
var casino_raised = false;
var casino_checked = false;
var player_folded = false;
var player_called = false;
var player_raised = false;
var player_checked = false;
// var casino_card1 ="";
// var casino_card2 ="";
var casino_cards = [];
var player_cards = [];
var phase = "Pre-flop";
var playerIndex = [];
var casinoIndex = [];
var communityIndex = [];

document.getElementById("phase").innerText = phase;


var deck = ["1S","2S","3S","4S","5S","6S","7S","8S", "9S", "10S","11S","12S","13S",
"1D","2D","3D","4D","5D","6D","7D","8D", "9D", "10D","11D","12D","13D",
"1C","2C","3C","4C","5C","6C","7C","8C", "9C", "10C","11C","12C","13C",
"1H","2H","3H","4H","5H","6H","7H","8H", "9H", "10H","11H","12H","13H"
];

// function for the start button
function bet() {
  if (clicked_bet == true){
    document.getElementById("betmsg").innerText = "Game started already. You can either play the game or forfeit.";
  }
  else if (1 <= milliethersCount ){
    bet_total += 1;
    milliethersCount -= 1 ;
    milliethers.innerText = milliethersCount;
    document.getElementById("betmsg").innerText = "Placed 1 milliethers for small blind";
    document.getElementById("bet_total").innerText = "Total bet:" + bet_total;
    CasinoPlaceBigBlind();
    

    approve = true;
    clicked_bet = true;
    timeleft = 60;
    onTimer();
  }
  else{
    document.getElementById("betmsg").innerText = "You don't have not enough milliethers to bet.";
  }

}
function Casnio_pick_cards(){
  let r1 = Math.floor(Math.random() * deck.length);
  casino_cards.push(deck[r1]);
  casinoIndex.push(r1);
  //remove_cards_from_deck(deck, casino_card1);
  // let r2 = Math.floor(Math.random() * deck.length);
  // casino_card2 = deck[r2];
  // casinoIndex.push(r2);
  //remove_cards_from_deck(deck, casino_card2);
}


// function to remove the card from the deck after used
// function remove_cards_from_deck(array, card){
//   for(var i in array){
//     if(array[i]==card){
//         array.splice(i,1);
//         break;
//     }
//   }
// }



// add $ test

function top_up() {
   var topupValue = Number(document.getElementById('TEXTBOX_TOPUP').value);
   if (topupValue > 0){
   milliethersCount += topupValue;
   milliethers.innerText = milliethersCount;
   

   document.getElementById("betmsg").innerText = "Added " + topupValue +" milliethers";
  }
}
// remove $ test
function transfer() {
   var transValue = Number(document.getElementById('TEXTBOX_TRANS').value);
  if (milliethersCount >= transValue ){
    milliethersCount = milliethersCount - transValue;
    milliethers.innerText = milliethersCount;
     document.getElementById("betmsg").innerText = "Transferred " + transValue +" milliethers to your wallet successfully.";
   }
   else{
    document.getElementById("betmsg").innerText = "Not enough tokens";
   }
}

// function to choose first 4 cards
function pickCard1() {
  if (max_card > 0 && clicked_bet == true){
    pickaRandomCards("card1");
  }
}

function pickCard2() {
  if (max_card > 0 && clicked_bet == true){
    pickaRandomCards("card2");
  }
}


function pickCard3() {
  if (max_card > 0 && clicked_bet == true){
    pickaRandomCards("card3");
  }
}

function pickCard4() {
  if (max_card > 0 && clicked_bet == true){
    pickaRandomCards("card4");
  }
}
console.log(player_cards);

// randomize cards
function pickaRandomCards(id){
  let r1 = Math.floor(Math.random() * deck.length);
  var card = deck[r1];
  document.getElementById(id).style.display='none';
  document.getElementById(id).src = "./static/poker-img/"+card+".jpg";
  
  document.getElementById("status").innerText = "You picked " + card ;
  player_cards.push(card);
  playerIndex.push(r1);
  

  

  

  if(chose == 0){
    timeleft=61;
    document.getElementById("yourcard1").height = 225;
    document.getElementById("yourcard1").width = 150;

    document.getElementById("yourcard1").style.display='unset';
    document.getElementById("yourcard1").src = "./static/poker-img/"+card+".jpg" ;
    document.getElementById("yourcard1").value == "1";
    document.getElementById("yourcards").innerText = "Your Cards:" ;
    chose += 1
  }
  else {
    document.getElementById("yourcard2").height = 225;
    document.getElementById("yourcard2").width = 150;
    document.getElementById("yourcard2").style.display='unset';
    document.getElementById("yourcard2").src = "./static/poker-img/"+card+".jpg" ;
    document.getElementById("status1").innerText = "Casino's cards: ";
    document.getElementById("betmsg").innerText = "Choose call/ raise/ fold."
    document.getElementById("casinomsg").innerText = "";
    picked_2cards = true;
    
    document.getElementById("check").style.visibility='hidden';
    
    if (timer == true){
      timeleft=61;
    }
    else{
      onTimer();
    }
   
  }
  //remove_cards_from_deck(deck,card);
  Casnio_pick_cards();
  max_card -= 1;

}

//casion place blind (2milliethers)
function CasinoPlaceBigBlind(){
  bet_total += 2;
  document.getElementById("bet_total").innerText = "Total bet:" + bet_total;
  document.getElementById("casinomsg").innerText = "Casino placed a big blind (2 milliethers) , now pick the cards.";
}

//casino action choice check/fold/raise
 function CasinoAction(){
  //var action = Math.floor(Math.random() * 3);
  let action;
  let deckG = getDeck();
  let casinoHand = [deckG[casinoIndex[0]],deckG[casinoIndex[1]]];
  let communityPileG;
  
  //console.log(casinoHand);
  console.log("phase is: ", phase);
  if(phase == "Pre-flop"){
    console.log("pre-flop block");
    let result = EvaluateHand(casinoHand);
    action = decisionForPreFlop(result);
    console.log("their hand is: ", casinoHand);
    console.log("result is: ", result);
    console.log("action is",action);
  }
  else if(phase == "Flop"){
    console.log("flop block");
    communityPileG = [deckG[communityIndex[0]],deckG[communityIndex[1]], deckG[communityIndex[2]]];
    console.log("community pile is: ",communityPileG);
    casinoHand = casinoHand.concat(communityPileG);
    let result = EvaluateHand(casinoHand);
    action = decisionForFlop(result);
    console.log("their hand is: ", casinoHand);
    console.log("result is: ", result);
    console.log("action is",action);
  }
  else if(phase == "Turn"){
    console.log("turn block");
    communityPileG = [deckG[communityIndex[0]],deckG[communityIndex[1]], deckG[communityIndex[2]],deckG[communityIndex[3]]];
    console.log("community pile is: ",communityPileG);
    casinoHand = casinoHand.concat(communityPileG);
    let result = EvaluateHand(casinoHand);
    action = decisionForTurn(result);
    console.log("their hand is: ", casinoHand);
    console.log("result is: ", result);
    console.log("action is",action);
  }
  else if(phase == "River"){
    console.log("river block");
    communityPileG = [deckG[communityIndex[0]],deckG[communityIndex[1]], deckG[communityIndex[2]],deckG[communityIndex[3]],deckG[communityIndex[4]]];
    console.log("community pile is: ",communityPileG);
    casinoHand = casinoHand.concat(communityPileG);
    let result = EvaluateHand(casinoHand);
    action = decisionForRiver(result);
    console.log("their hand is: ", casinoHand);
    console.log("result is: ", result);
    console.log("action is",action);
  }

  if (action == 1){
    document.getElementById("casinomsg").innerText = "Dealer Checked! You can call Check/ fold/ raise";
    casino_checked = true;
    if(player_checked == true && phase == "showdown" ){ 
      document.getElementById("casinomsg").innerText = "player/casino wins";
    }
    else if ( phase =="Pre-flop"){
      change_phase();
    }
    document.getElementById("check").style.visibility='visible';
    document.getElementById("fold").style.visibility='visible';
    document.getElementById("raise").style.visibility='visible';
    document.getElementById("call").style.visibility='hidden';
  }
  else if (action == 0){
     document.getElementById("casinomsg").innerText = "Dealer Folded! You gained " + bet_total +" milliethers!";
     milliethersCount += bet_total;
     milliethers.innerText = milliethersCount;
     casino_folded = true;
     restart_game();
  }

  else if (action == 2){
    document.getElementById("casinomsg").innerText = "Dealer raised 5 milliethers! You can call/ raise/ fold.";
    call_bet = 5;
    bet_total += call_bet;
    document.getElementById("bet_total").innerText = "Total bet:" + bet_total;
    document.getElementById("call").style.visibility='visible';
    document.getElementById("fold").style.visibility='visible';
    document.getElementById("raise").style.visibility='visible';
    document.getElementById("check").style.visibility='hidden';
    casino_raised = true;
    
  }
}

//casino action choice call/fold/raise
function CasinoAction2(){
  let action;
  let deckG = getDeck();
  let casinoHand = [deckG[casinoIndex[0]],deckG[casinoIndex[1]]];
  let communityPileG;
  
  //console.log(casinoHand);
  console.log("phase is: ", phase);
  if(phase == "Pre-flop"){
    let result = EvaluateHand(casinoHand);
    action = decisionForPreFlop(result);
    console.log("their hand is: ", casinoHand);
    console.log("result is: ", result);
    console.log("action is",action);
  }
  else if(phase == "Flop"){
    communityPileG = [deckG[communityIndex[0]],deckG[communityIndex[1]], deckG[communityIndex[2]]];
    console.log("community pile is: ",communityPileG);
    casinoHand = casinoHand.concat(communityPileG);
    let result = EvaluateHand(casinoHand);
    action = decisionForFlop(result);
    console.log("their hand is: ", casinoHand);
    console.log("result is: ", result);
    console.log("action is",action);
  }
  else if(phase == "Turn"){
    communityPileG = [deckG[communityIndex[0]],deckG[communityIndex[1]], deckG[communityIndex[2]],deckG[communityIndex[3]]];
    console.log("community pile is: ",communityPileG);
    casinoHand = casinoHand.concat(communityPileG);
    let result = EvaluateHand(casinoHand);
    action = decisionForTurn(result);
    console.log("their hand is: ", casinoHand);
    console.log("result is: ", result);
    console.log("action is",action);
  }
  else if(phase == "River"){
    communityPileG = [deckG[communityIndex[0]],deckG[communityIndex[1]], deckG[communityIndex[2]],deckG[communityIndex[3]],deckG[communityIndex[4]]];
    console.log("community pile is: ",communityPileG);
    casinoHand = casinoHand.concat(communityPileG);
    let result = EvaluateHand(casinoHand);
    action = decisionForRiver(result);
    console.log("their hand is: ", casinoHand);
    console.log("result is: ", result);
    console.log("action is",action);
  }
  if (action == 1){

    document.getElementById("casinomsg").innerText = "Dealer called! Total bet + "+call_bet+ " You can call Check/ fold/ raise";
    bet_total += call_bet;
    document.getElementById("bet_total").innerText = "Total bet:" + bet_total;
    change_phase();
    casino_called = true;
    document.getElementById("check").style.visibility='visible';
    document.getElementById("fold").style.visibility='visible';
    document.getElementById("raise").style.visibility='visible';
    document.getElementById("call").style.visibility='hidden';
  }
  else if (action == 0){
     document.getElementById("casinomsg").innerText = "Dealer Folded! You gained " + bet_total +" milliethers!";
     milliethersCount += bet_total;
     milliethers.innerText = milliethersCount;
     casino_folded = true;
     restart_game();
   }

  else if (action == 2){
    document.getElementById("casinomsg").innerText = "Dealer raised 5 milliethers! You can call/ raise/ fold.";
    call_bet = 5;
    bet_total += call_bet;
    document.getElementById("bet_total").innerText = "Total bet:" + bet_total;
    document.getElementById("call").style.visibility='visible';
    document.getElementById("fold").style.visibility='visible';
    document.getElementById("raise").style.visibility='visible';
    document.getElementById("check").style.visibility='hidden';
    casino_raised = true;
  }
}

//function to show the community pile

function showCommunityCards_Flop(){
  var i;
  for (i = 1; i<=3; i++){
    let r = Math.floor(Math.random() * deck.length);
    var card = deck[r];
    document.getElementById("communitycards"+i).height = 225;
    document.getElementById("communitycards"+i).width = 150;
    document.getElementById("communitycards"+i).src = "./static/poker-img/"+card+".jpg" ;
    document.getElementById("communitycards"+i).style.display='unset';
    document.getElementById("communitycards").innerText = "Community pile:" ;
    communityIndex.push(r);
    //remove_cards_from_deck(deck,card);
    
  }
  for (i = 4; i<=5; i++){
    var card = deck[Math.floor(Math.random() * deck.length)];
    document.getElementById("communitycards"+i).height = 225;
    document.getElementById("communitycards"+i).width = 150;
    document.getElementById("communitycards"+i).style.display='unset';
    document.getElementById("communitycards"+i).src = "./static/poker-img/back.jpg" ;    
  }
}

//Turn function (show fourth card)

function Turn(){
    let r = Math.floor(Math.random() * deck.length);
    var card = deck[r];
    document.getElementById("communitycards4").src = "./static/poker-img/"+card+".jpg" ;
    communityIndex.push(r);
    //remove_cards_from_deck(deck, card);
}

//Turn function (show fifth card)
function River(){
  let r = Math.floor(Math.random() * deck.length);
  var card = deck[r];
  document.getElementById("communitycards5").src = "./static/poker-img/"+card+".jpg" ;
  communityIndex.push(r);
  //remove_cards_from_deck(deck, card);
  
}


//reveal casino cards
function showdown(){
  let deckG = getDeck();
  let playerHandG = [deckG[playerIndex[0]],deckG[playerIndex[1]]];
  let casinoHandG = [deckG[casinoIndex[0]],deckG[casinoIndex[1]]];
  let communityPileG = [deckG[communityIndex[0]],deckG[communityIndex[1]], deckG[communityIndex[2]],deckG[communityIndex[3]],deckG[communityIndex[4]]];
  console.log("playerIndex is: ", playerIndex);
  console.log("casinoIndex is: ", casinoIndex);
  //console.log("player hand g is: ",playerHandG);
  console.log("Players handG is: ", playerHandG);
  console.log("casino handG is: ", casinoHandG);
  console.log("community pileG is: ", communityPileG);
  console.log("Player cards is: ",player_cards);
  console.log("Casino card 1 is: ", casino_cards[0]);
  console.log("Casino card 2 is: ", casino_cards[1]);

  playerHandG = playerHandG.concat(communityPileG);
  casinoHandG = casinoHandG.concat(communityPileG);
   let resultPlayer = EvaluateHand(playerHandG);
   let resultCasino = EvaluateHand(casinoHandG);
   console.log("Players result is: ", resultPlayer);
   console.log("Casinos result is: ", resultCasino);
   //let finalResult = EvaluateWinner(resultPlayer,resultCasino);
   //console.log("final result is: ", finalResult);

   //document.getElementById("casinomsg").innerText = finalResult;
  for (i = 1; i <=4; i++){
  document.getElementById("card"+i).style.display='none';
  document.getElementById("card"+i).style.display='none';
  }
  document.getElementById("casinocard1").height = 225;
  document.getElementById("casinocard1").width = 150;
  document.getElementById("casinocard2").height = 225;
  document.getElementById("casinocard2").width = 150;
  document.getElementById("casinocard1").src = "./static/poker-img/"+casino_cards[0]+".jpg" ;
  document.getElementById("casinocard2").src = "./static/poker-img/"+casino_cards[1]+".jpg" ;
  document.getElementById("casinocard1").style.display='unset';
  document.getElementById("casinocard2").style.display='unset';
  

  phase = "Showdown";
  document.getElementById("phase").innerText = phase;

}

//check button function for player

function check(){
  if(picked_2cards == true && casino_checked == true && phase ==  "River"){ 
    showdown();
    document.getElementById("casinomsg").innerText = "player/casino wins";
  }
  else if (casino_checked == true && picked_2cards == true ){
    player_checked = true;
    casino_checked = false;
    //change_phase();
    document.getElementById("betmsg").innerText =  "You checked! " ;
    document.getElementById("casinomsg").innerText = "Waiting casino decision...";
    hide_all_button();
    setTimeout(function(){
      CasinoAction();

    }, 1000);
    change_phase();  
  }
  else if(casino_checked == false && picked_2cards == true ){
    document.getElementById("betmsg").innerText =  "You checked! " ;
    document.getElementById("casinomsg").innerText = "Waiting casino decision...";
    hide_all_button();
    setTimeout(function(){
      CasinoAction();
    }, 1000);  
    player_checked = true;
  }
  if (timer == true){
    timeleft=61;
  }

}




// raise button function for player

function raise(){
  var raise_amount = Number(document.getElementById('raise_amount').value);

  if (picked_2cards == true && raise_amount > milliethersCount){
    document.getElementById("status").innerText = "Not enough milliethers to raise";
  }
  else if(picked_2cards == true && raise_amount == 0){
    document.getElementById("status").innerText = "Raise amount not entered!";
  }
  else if(picked_2cards == true && raise_amount <= call_bet){
    document.getElementById("status").innerText = "Raise amount is less than call!";
  }

  else if (picked_2cards == true ){
     milliethersCount -= raise_amount ;
     milliethers.innerText = milliethersCount;
     bet_total += raise_amount;
     call_bet = raise_amount;
     document.getElementById("bet_total").innerText =  "Total bet: " + bet_total;
     document.getElementById("betmsg").innerText =  "You raised " + raise_amount +" milliethers!" ;
     document.getElementById("casinomsg").innerText = "Waiting casino decision...";
     hide_all_button();
     setTimeout(function(){
      CasinoAction2();

    }, 1000);
     //CasinoAction2();

  }
  if (timer == true){
    timeleft=61;
  }

}
// call button function for player

function call(){
  if (picked_2cards == true && call_bet> milliethersCount ){
    document.getElementById("status").innerText = "Not enough milliethers to call";

  }
  else if( picked_2cards == true && phase ==  "River" ){ 
    showdown();
    document.getElementById("casinomsg").innerText = "player/casino wins";
  }
  else if (picked_2cards == true && phase == "Pre-flop"){
    player_called = true;
    bet_total += call_bet;
    document.getElementById("betmsg").innerText = "You called using " + call_bet+ " milliethers";
    milliethersCount -= call_bet ;
    milliethers.innerText = milliethersCount;
    document.getElementById("bet_total").innerText = "Total bet:" + bet_total;
    //change_phase();
    // add 1s delay
    document.getElementById("casinomsg").innerText = "Waiting casino decision...";
    hide_all_button();
    setTimeout(function(){
      //change_phase();
      // CasinoAction();
      // change_phase();
    }, 1000); 
    //change_phase();
    CasinoAction();
    // setTimeout(function(){
    //   change_phase();
    // }, 1000);
    //change_phase();

  }
  else if (picked_2cards == true && casino_raised == true ){
    player_called = true;
    bet_total += call_bet;
    document.getElementById("betmsg").innerText = "You called using " + call_bet+ " milliethers";
    milliethersCount -= call_bet ;
    milliethers.innerText = milliethersCount;
    document.getElementById("bet_total").innerText = "Total bet:" + bet_total;
    document.getElementById("casinomsg").innerText = "";
    
  
    // if(casino_checked == true || casino_raised == true)
    // {
    //   change_phase();
    // }
    document.getElementById("casinomsg").innerText = "Waiting casino decision...";
    hide_all_button();
    setTimeout(function(){
      CasinoAction();
    }, 1000);
    
    if(casino_checked == true || casino_raised == true)
    {
      change_phase();
    }
    
  }
  else if (picked_2cards == true && casino_raised == false){
    //player_called_casino_not_raised= true;
    bet_total += call_bet;
    document.getElementById("betmsg").innerText = "You called using " + call_bet+ " milliethers";
    milliethersCount -= call_bet ;
    milliethers.innerText = milliethersCount;
    document.getElementById("bet_total").innerText = "Total bet:" + bet_total;
    document.getElementById("casinomsg").innerText = "Waiting casino decision...";
    hide_all_button();
    setTimeout(function(){
      CasinoAction();
    }, 1000);
    }

  if (timer == true){
    timeleft=61;
  }
  
}
// fold button function for player
function fold() {
  if(picked_2cards == true){
    folded = true;
    restart_game();
  }
}

// function to change phase

function change_phase(){
  if (phase == "Pre-flop"){
    showCommunityCards_Flop();
    
    phase = "Flop";
    document.getElementById("phase").innerText = phase;
  }
  else if(phase == "Flop"){
    Turn();
    
    phase = "Turn";
    document.getElementById("phase").innerText = phase;
  }
  else if(phase == "Turn"){
    River();
    
    phase = "River";
    document.getElementById("phase").innerText = phase;
  }
  resetCounter();


}


console.log(phase);


// timer function
var timeleft = 60;
function onTimer(){
  var downloadTimer = setInterval(function(){
  timeleft--;
  document.getElementById("mycounter").innerHTML= "Timer: " +timeleft;
  if(timeleft <= 0){
    clearInterval(downloadTimer);
    if (folded == true){
      alert("You folded! Game restart!");
    }

    restart_game();
  }
 },1000);
  timer = true;
  folded = false;
  casino_folded = false;
}


//function to hide button
function hide_all_button(){
  document.getElementById("check").style.visibility='hidden';
  document.getElementById("call").style.visibility='hidden';
  document.getElementById("fold").style.visibility='hidden';
  document.getElementById("raise").style.visibility='hidden';
}


//function to restart the game reset everything

function restart_game(){
  deck = ["1S","2S","3S","4S","5S","6S","7S","8S", "9S", "10S","11S","12S","13S",
"1D","2D","3D","4D","5D","6D","7D","8D", "9D", "10D","11D","12D","13D",
"1C","2C","3C","4C","5C","6C","7C","8C", "9C", "10C","11C","12C","13C",
"1H","2H","3H","4H","5H","6H","7H","8H", "9H", "10H","11H","12H","13H"
];
  //deck = deck1;
  timeleft = 1;
  max_card = 2;
  chose = 0;
  approve = false;
  bet_total = 0;
  call_bet = 1;
  clicked_bet = false;
  finished_Turn = false;
  finished_River = false;
  picked_2cards = false;
  timer = false;
  first_round = true;
  casino_folded = false;
  casino_called = false;
  casino_raised = false;
  casino_checked = false;
  player_folded = false;
  player_called = false;
  player_raised = false;
  player_checked = false;
  phase = "Pre-flop";
  playerIndex = [];
  casinoIndex = [];
  communityIndex = [];
  player_cards = [];
  casino_cards = [];
  
  document.getElementById("status1").innerText= "Pick two cards";
  document.getElementById("casinocard1").style.display='none';
  document.getElementById("casinocard2").style.display='none';
  document.getElementById("communitycards1").style.display='none';
  document.getElementById("communitycards2").style.display='none';
  document.getElementById("communitycards3").style.display='none';
  document.getElementById("communitycards4").style.display='none';
  document.getElementById("communitycards5").style.display='none';
  document.getElementById("yourcard1").style.display='none';
  document.getElementById("yourcard2").style.display='none';
  document.getElementById("card1").src="./static/poker-img/back.jpg";
  document.getElementById("card1").style.display='unset';
  document.getElementById("card2").style.display='unset';
  document.getElementById("card3").style.display='unset';
  document.getElementById("card4").style.display='unset';
  document.getElementById("card2").src="./static/poker-img/back.jpg";
  document.getElementById("card3").src="./static/poker-img/back.jpg";
  document.getElementById("card4").src="./static/poker-img/back.jpg";
  document.getElementById("bet_total").innerText = "Total bet: " + 0;
  document.getElementById("betmsg").innerText = "Game restarted !";
  document.getElementById("communitycards").innerText = "";
  document.getElementById("yourcards").innerText = "" ;
  document.getElementById("check").style.visibility='visible';
  document.getElementById("call").style.visibility='visible';
  document.getElementById("fold").style.visibility='visible';
  document.getElementById("raise").style.visibility='visible';
  document.getElementById("phase").innerText = phase;

}

//make button clickable

button.addEventListener('click', bet);
button2.addEventListener('click', fold);
button3.addEventListener('click', top_up);
button4.addEventListener('click', transfer);
button5.addEventListener('click', raise);
button6.addEventListener('click', check);
button7.addEventListener('click', call);




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
var finished_turn = false;
var finished_river = false;
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
var player_called_casino_not_raised= false;
var player_raised = false;
var player_checked = false;

var phase = "preflop";
document.getElementById("phase").innerText = phase;


var deck = ["1C","1D","1H","1S","2C","2D","2H","2S","3C","3D","3H","3S","4C","4D","4H","4S","5C","5D","5H","5S","6C","6D","6H","6S"
            ,"7C","7D","7H","7S","8C","8D","8H","8S","9C","9D","9H","9S","10C","10D","10H","10S","11C","11D","11H","11S","12C","12D","12H","12S",
            "13C","13D","13H","13S"];

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

function remove_cards_from_deck(array, card){
  for(var i in array){
    if(array[i]==card){
        array.splice(i,1);
        break;
    }
  }
}



console.log(milliethersCount);


 function top_up() {
   var topupValue = Number(document.getElementById('TEXTBOX_TOPUP').value);
   if (topupValue > 0){
   milliethersCount += topupValue;
   milliethers.innerText = milliethersCount;
   

   document.getElementById("betmsg").innerText = "Added " + topupValue +" milliethers";
  }
 }

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

function pickaRandomCards(id){
  var card = deck[Math.floor(Math.random() * deck.length)];
  document.getElementById(id).style.display='none';
  document.getElementById(id).src = "/poker-img/"+card+".jpg";
  document.getElementById("status").innerText = "You picked " + card ;

  if(chose == 0){
    timeleft=61;
    document.getElementById("yourcard1").height = 225;
    document.getElementById("yourcard1").width = 150;

    document.getElementById("yourcard1").style.display='unset';
    document.getElementById("yourcard1").src = "/poker-img/"+card+".jpg" ;
    document.getElementById("yourcard1").value == "1";
    document.getElementById("yourcards").innerText = "Your Cards:" ;
    chose += 1
  }
  else {
    document.getElementById("yourcard2").height = 225;
    document.getElementById("yourcard2").width = 150;
    document.getElementById("yourcard2").style.display='unset';
    document.getElementById("yourcard2").src = "/poker-img/"+card+".jpg" ;
    document.getElementById("status1").innerText = "Casino's cards: ";
    document.getElementById("betmsg").innerText = "You can now fold/call/raise"
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
  remove_cards_from_deck(deck,card);
  max_card -= 1;

}

function CasinoPlaceBigBlind(){
  bet_total += 2;
  document.getElementById("bet_total").innerText = "Total bet:" + bet_total;
  document.getElementById("casinomsg").innerText = "Casino placed a big blind (2 milliethers) , now pick the cards.";
}

function CasinoAction(){
  var action = Math.floor(Math.random() * 3);
  if (action == 0){
    document.getElementById("casinomsg").innerText = "Dealer Checked! You can call Check/ fold/ raise";
    casino_checked = true;
    if(player_checked == true && phase == "showdown" ){ 
      document.getElementById("casinomsg").innerText = "player/casino wins";
    }
    else if ( player_called_casino_not_raised== true ){
      player_called_casino_not_raised= false;
      change_phase();
     
    }
    document.getElementById("check").style.visibility='visible';
    document.getElementById("call").style.visibility='hidden';
  }
   else if (action == 1){
     document.getElementById("casinomsg").innerText = "Dealer Folded! You gained " + bet_total +" milliethers!";
     milliethersCount += bet_total;
     milliethers.innerText = milliethersCount;
     casino_folded = true;
     restart_game();
   }
  // else if (action == 1){
  //   document.getElementById("casinomsg").innerText = "Dealer Checked! You can call Check/ fold/ raise";
  //   casino_checked = true;
  //   if(player_checked == true && phase == "showdown" ){ 
  //     document.getElementById("casinomsg").innerText = "player/casino wins";
  //   }
  //   else if ( player_called_casino_not_raised== true ){
  //     player_called_casino_not_raised= false;
  //     change_phase();
     
  //   }
  //   document.getElementById("check").style.visibility='visible';
  //   document.getElementById("call").style.visibility='hidden';
  // }
  else if (action == 2){
    document.getElementById("casinomsg").innerText = "Dealer raised 5 milliethers!You can call/raise/fold";
    call_bet = 5;
    bet_total += call_bet;
    document.getElementById("bet_total").innerText = "Total bet:" + bet_total;
    document.getElementById("call").style.visibility='visible';
    document.getElementById("check").style.visibility='hidden';
    casino_raised = true;
    
  }
}

function CasinoAction2(){
  var action = Math.floor(Math.random() * 3);
  if (action == 0){

    document.getElementById("casinomsg").innerText = "Dealer called!Total bet +"+call_bet+ "You can call Check/ fold/ raise";
    bet_total += call_bet;
    document.getElementById("bet_total").innerText = "Total bet:" + bet_total;
    change_phase();
    casino_called = true;
    document.getElementById("check").style.visibility='visible';
    document.getElementById("call").style.visibility='hidden';
  }
  else if (action == 1){
     document.getElementById("casinomsg").innerText = "Dealer Folded! You gained " + bet_total +" milliethers!";
     milliethersCount += bet_total;
     milliethers.innerText = milliethersCount;
     casino_folded = true;
     restart_game();
   }
  // else if (action == 1){
  //   document.getElementById("casinomsg").innerText = "Dealer Checked! You can call Check/ fold/ raise";
  //   casino_checked = true;
  //   if(player_checked == true && phase == "showdown" ){ 
  //     document.getElementById("casinomsg").innerText = "player/casino wins";
  //   }
  //   else if ( player_called_casino_not_raised== true ){
  //     player_called_casino_not_raised= false;
  //     change_phase();
     
  //   }
  //   document.getElementById("check").style.visibility='visible';
  //   document.getElementById("call").style.visibility='hidden';
  // }
  else if (action == 2){
    document.getElementById("casinomsg").innerText = "Dealer raised 5 milliethers!You can call/raise/fold";
    call_bet = 5;
    bet_total += call_bet;
    document.getElementById("bet_total").innerText = "Total bet:" + bet_total;
    document.getElementById("call").style.visibility='visible';
    document.getElementById("check").style.visibility='hidden';
    casino_raised = true;
    
  }
}


function showCommunityCards_flop(){
  var i;
  for (i = 1; i<=3; i++){
    var card = deck[Math.floor(Math.random() * deck.length)];
    document.getElementById("communitycards"+i).height = 225;
    document.getElementById("communitycards"+i).width = 150;
    document.getElementById("communitycards"+i).src = "/poker-img/"+card+".jpg" ;
    document.getElementById("communitycards"+i).style.display='unset';
    document.getElementById("communitycards").innerText = "Community pile:" ;
    remove_cards_from_deck(deck,card);
    
  }
  for (i = 4; i<=5; i++){
    var card = deck[Math.floor(Math.random() * deck.length)];
    document.getElementById("communitycards"+i).height = 225;
    document.getElementById("communitycards"+i).width = 150;
    document.getElementById("communitycards"+i).style.display='unset';
    document.getElementById("communitycards"+i).src = "/poker-img/back.jpg" ;    
  }
}



function turn(){
    var card = deck[Math.floor(Math.random() * deck.length)];
    document.getElementById("communitycards4").src = "/poker-img/"+card+".jpg" ;
    remove_cards_from_deck(deck, card);
}

function river(){
  var card = deck[Math.floor(Math.random() * deck.length)];
  document.getElementById("communitycards5").src = "/poker-img/"+card+".jpg" ;
  remove_cards_from_deck(deck, card);
  
}

function forth_betting_round(){
  
}

function showdown(){
  var card = deck[Math.floor(Math.random() * deck.length)];
  for (i = 1; i <=4; i++){
  document.getElementById("card"+i).style.display='none';
  document.getElementById("card"+i).style.display='none';
  }
  for (i = 1; i <=2; i++){
    var card = deck[Math.floor(Math.random() * deck.length)];

    document.getElementById("casinocard"+i).height = 225;
    document.getElementById("casinocard"+i).width = 150;
    document.getElementById("casinocard"+i).src = "/poker-img/"+card+".jpg" ;
    document.getElementById("casinocard1").style.display='unset';
    document.getElementById("casinocard2").style.display='unset';
    remove_cards_from_deck(deck, card);

  }

}

function check(){
  if(casino_checked == true && phase ==  "Forth betting round"){ 
    showdown();
    document.getElementById("casinomsg").innerText = "player/casino wins";
  }
  else if (casino_checked == true && picked_2cards == true ){
    player_checked = true;
    casino_checked = false;
    change_phase();
    CasinoAction();

  }
  else if(casino_checked == false && picked_2cards == true ){ 
    CasinoAction();
    player_checked = true;
  }

  if (timer == true){
    timeleft=61;
  }

}






function raise(){
  var raise_amount = Number(document.getElementById('raise_amount').value);

  
  if (raise_amount > milliethersCount || raise_amount == 0){
    document.getElementById("status").innerText = "Not enough milliethers to raise";

  }

  else if (picked_2cards == true ){
    // bet_total += betamount;
     milliethersCount -= raise_amount ;
     milliethers.innerText = milliethersCount;
     bet_total += raise_amount;
     call_bet = raise_amount;
     document.getElementById("bet_total").innerText =  "Total bet: " + bet_total;
     document.getElementById("betmsg").innerText =  "You raised " + raise_amount ;
     CasinoAction2();
  
    if (timer == true){
      timeleft=61;
    }

  }

}

function change_phase(){
  if (phase == "preflop"){
    showCommunityCards_flop();
    
    phase = "flop";
    document.getElementById("phase").innerText = phase;
  }
  else if(phase == "flop"){
    turn();
    
    phase = "turn";
    document.getElementById("phase").innerText = phase;
  }
  else if(phase == "turn"){
    river();
    
    phase = "river";
    document.getElementById("phase").innerText = phase;
  }

  else if(phase == "river"){
    forth_betting_round();
    
    phase = "Forth betting round";
    document.getElementById("phase").innerText = phase;
  }

}


console.log(phase);
function call(){
  if(casino_checked == true && phase ==  "Forth betting round" ){ 
    showdown();
    document.getElementById("casinomsg").innerText = "player/casino wins";
  }
  else if (picked_2cards == true && casino_raised == true){
    player_called = true;
    bet_total += call_bet;
    document.getElementById("betmsg").innerText = "You called using " + call_bet+ " milliethers";
    milliethersCount -= call_bet ;
    milliethers.innerText = milliethersCount;
    document.getElementById("bet_total").innerText = "Total bet:" + bet_total;
    document.getElementById("casinomsg").innerText = "";
    //casino_raised == false;
    change_phase();
    CasinoAction();
    
    //finished_turn = true;
    
  }
  else if (picked_2cards == true && casino_raised == false){
    player_called_casino_not_raised= true;
    bet_total += call_bet;
    document.getElementById("betmsg").innerText = "You called using " + call_bet+ " milliethers";
    milliethersCount -= call_bet ;
    milliethers.innerText = milliethersCount;
    document.getElementById("bet_total").innerText = "Total bet:" + bet_total;
    CasinoAction();
    
    //finished_turn = true;
  }
  // e/lse if(finished_turn == false && finished_river == false && picked_2cards == true){ 
  //   bet_total += call_bet;
  //   document.getElementById("bet_total").innerText = "Total bet:" + bet_total;
  //   //river();
  //   finished_river = true;
  //   //CasinoAction();
  // }
  if (timer == true){
    timeleft=61;
  }
  
}

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
    //  else if (casino_folded == true){
    //   alert("Casino Folded! You win!");
    //  }
    //  else{
    //   alert("Time's up! Game restart! ");
    //  }
     restart_game();
    }
 },1000);
 timer = true;
 folded = false;
 casino_folded = false;
 }

function fold() {
  folded = true;
  restart_game();
}

function casino_fold() {
  casino_folded = true;
  restart_game();
}


function restart_game(){
    deck1 = ["1C","1D","1H","1S","2C","2D","2H","2S","3C","3D","3H","3S","4C","4D","4H","4S","5C","5D","5H","5S","6C","6D","6H","6S"
              ,"7C","7D","7H","7S","8C","8D","8H","8S","9C","9D","9H","9S","10C","10D","10H","10S","11C","11D","11H","11S","12C","12D","12H","12S",
              "13C","13D","13H","13S"];
    deck = deck1;
  timeleft = 1;
  max_card = 2;
  chose = 0;
  approve = false;
  bet_total = 0;
  call_bet = 1;
  clicked_bet = false;
  finished_turn = false;
  finished_river = false;
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
  player_called_casino_not_raised= false;
  phase = "preflop";
  
  console.log(deck);


  //document.getElementById("status1").innerText = "Pick 2 cards";
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
  document.getElementById("card1").src="/poker-img/back.jpg";
  document.getElementById("card1").style.display='unset';
  document.getElementById("card2").style.display='unset';
  document.getElementById("card3").style.display='unset';
  document.getElementById("card4").style.display='unset';
  document.getElementById("card2").src="/poker-img/back.jpg";
  document.getElementById("card3").src="/poker-img/back.jpg";
  document.getElementById("card4").src="/poker-img/back.jpg";
  document.getElementById("bet_total").innerText = "Total bet: " + 0;
  document.getElementById("betmsg").innerText = "Game restarted !";
  //document.getElementById("casinomsg").innerText = "";
  document.getElementById("communitycards").innerText = "";
  document.getElementById("yourcards").innerText = "" ;
  document.getElementById("check").style.visibility='visible';
  document.getElementById("call").style.visibility='visible';
  document.getElementById("phase").innerText = phase;
}


button.addEventListener('click', bet);
button2.addEventListener('click', fold);
button3.addEventListener('click', top_up);
button4.addEventListener('click', transfer);
button5.addEventListener('click', raise);
button6.addEventListener('click', check);
button7.addEventListener('click', call);




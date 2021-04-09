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

let milliethersCount = 0;
let max_card = 2;
let chose = 0;
var approve = false;
var bet_total = 0;
var clicked_bet = false;
var finished_turn = false;
var finished_river = false;
var picked_2cards = false;
var timer = false;
var folded = false;

var deck = ["1C","1D","1H","1S","2C","2D","2H","2S","3C","3D","3H","3S","4C","4D","4H","4S","5C","5D","5H","5S","6C","6D","6H","6S"
            ,"7C","7D","7H","7S","8C","8D","8H","8S","9C","9D","9H","9S","10C","10D","10H","10S","11C","11D","11H","11S","12C","12D","12H","12S",
            "13C","13D","13H","13S"];

function bet() {
  var betamount = Number(document.getElementById('Bet_amount').value);
  if (clicked_bet == true){
    document.getElementById("betmsg").innerText = "Game started already. You can either play the game or forfeit.";
  }
  else if (betamount == 0){
    document.getElementById("betmsg").innerText = "need at least 1 milliether to play the game";
  }
  else if (betamount <= milliethersCount ){
    bet_total += betamount;
    milliethersCount -= betamount ;
    milliethers.innerText = milliethersCount;
    document.getElementById("betmsg").innerText = "Used " + betamount +" milliethers to bet, now pick the cards.";
    document.getElementById("bet_total").innerText = "Your bet:" + bet_total;
    approve = true;
    clicked_bet = true;
    timeleft = 30;
    onTimer();
    
  }
  else{
    document.getElementById("betmsg").innerText = "You don't  have not enough milliethers to bet.";
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

console.log(deck);

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
    timeleft=31;
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
    showCommunityCards_flop();
    document.getElementById("betmsg").innerText = "Choose your action: raise/call/check/fold"
    picked_2cards = true;
    
    if (timer == true){
      timeleft=31;
    }
    else{
      onTimer();
    }
   
  }
  remove_cards_from_deck(deck,card);
  max_card -= 1;

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
    //remove_cards_from_deck(deck,card);
    
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

function check(){
  if (finished_turn == false && picked_2cards == true){
    turn();
    finished_turn = true;
  }
  else if(finished_river == false && picked_2cards == true){ 
    river();
    finished_river = true;
  }
  if (timer == true){
    timeleft=31;
  }
  else{
    onTimer();
  }
}



function raise(){
  var raise_amount = Number(document.getElementById('raise_amount').value);

  
  if (raise_amount > milliethersCount){
    document.getElementById("status").innerText = "Not enough milliethers to raise";

  }

  else{
    // bet_total += betamount;
     milliethersCount -= raise_amount ;
     milliethers.innerText = milliethersCount;
     bet_total += raise_amount;
     document.getElementById("bet_total").innerText =  "Your bet: " + bet_total;

    if (finished_turn == false && picked_2cards == true){
      turn();
      finished_turn = true;
    }
    else if(finished_river == false && picked_2cards == true){ 
      river();
      finished_river = true;
    }
    if (timer == true){
      timeleft=31;
    }
    else{
      onTimer();
    }
  }

}

function call(){
  if (finished_turn == false && picked_2cards == true){
    turn();
    finished_turn = true;
  }
  else if(finished_river == false && picked_2cards == true){ 
    river();
    finished_river = true;
  }
  if (timer == true){
    timeleft=31;
  }
  else{
    onTimer();
  }
  
}

var timeleft = 30;
function onTimer(){
 var downloadTimer = setInterval(function(){
 timeleft--;
 document.getElementById("mycounter").innerHTML= "Timer: " +timeleft;
 if(timeleft <= 0){
     clearInterval(downloadTimer);
     if (folded == true){
      alert("You folded! Game restart!");
     }
     else{
      alert("Time's up! Game restart! ");
     }
     restart_game();
    }
 },1000);
 timer = true;
 folded = false;
 }

function fold() {
  //location.reload();
  folded = true;
  restart_game();
}

function restart_game(){
  //  deck = ["1C","1D","1H","1S","2C","2D","2H","2S","3C","3D","3H","3S","4C","4D","4H","4S","5C","5D","5H","5S","6C","6D","6H","6S"
  //            ,"7C","7D","7H","7S","8C","8D","8H","8S","9C","9D","9H","9S","10C","10D","10H","10S","11C","11D","11H","11S","12C","12D","12H","12S",
  //            "13C","13D","13H","13S"];
  max_card = 2;
  chose = 0;
  approve = false;
  bet_total = 0;
  clicked_bet = false;
  finished_turn = false;
  finished_river = false;
  picked_2cards = false;
  timer = false;
  timeleft = 1;

  //document.getElementById("status1").innerText = "Pick 2 cards";
  document.getElementById("status1").innerText= "Pick two cards";
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
  document.getElementById("bet_total").innerText = "Your bet: " + 0;
  document.getElementById("betmsg").innerText = "Game restarted, enter your bet";
  document.getElementById("communitycards").innerText = "";
  document.getElementById("yourcards").innerText = "" ;
  
}


button.addEventListener('click', bet);
button2.addEventListener('click', fold);
button3.addEventListener('click', top_up);
button4.addEventListener('click', transfer);
button5.addEventListener('click', raise);
button6.addEventListener('click', check);
button7.addEventListener('click', call);




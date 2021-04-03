const button = document.querySelector('#bet');
const button2 = document.querySelector('#fold')
const button3 = document.querySelector('#top_up');
const button4 = document.querySelector('#transfer');
const button5 = document.querySelector('#raise')
const button6 = document.querySelector('#check')
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




 function top_up() {
   var topupValue = Number(document.getElementById('TEXTBOX_TOPUP').value);
   milliethersCount += topupValue;
   milliethers.innerText = milliethersCount;
   
   document.getElementById("status").innerText = "Added " + topupValue +" milliethers";
 }

function transfer() {
   var transValue = Number(document.getElementById('TEXTBOX_TRANS').value);
  if (milliethersCount >= transValue ){
    milliethersCount = milliethersCount - transValue;
    milliethers.innerText = milliethersCount;
     document.getElementById("status").innerText = "Transferred " + transValue +" milliethers to your wallet successfully.";
   }
   else{
    document.getElementById("status").innerText = "Not enough tokens";
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
    document.getElementById("yourcard1").height = 225;
    document.getElementById("yourcard1").width = 150;
    document.getElementById("yourcard1").src = "/poker-img/"+card+".jpg" ;
    document.getElementById("yourcard1").value == "1"
    chose += 1
  }
  else {
    document.getElementById("yourcard2").height = 225;
    document.getElementById("yourcard2").width = 150;
    document.getElementById("yourcard2").src = "/poker-img/"+card+".jpg" ;
    document.getElementById("status1").innerText = "Casino's cards: ";
    showCommunityCards_flop();
    picked_2cards = true;
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
    remove_cards_from_deck(deck,card);
    document.getElementById("communitycards").innerText = "Community pile:" ;
    
  }
  for (i = 4; i<=5; i++){
    var card = deck[Math.floor(Math.random() * deck.length)];
    document.getElementById("communitycards"+i).height = 225;
    document.getElementById("communitycards"+i).width = 150;
    document.getElementById("communitycards"+i).src = "/poker-img/back.jpg" ;
    remove_cards_from_deck(deck,card);
    
  }
}

function reveal_cards_flop(){
  for (i = 1; i <= 3;i ++){
    var card = deck[Math.floor(Math.random() * deck.length)];
    document.getElementById("communitycards"+i).src = "/poker-img/"+card+".jpg" ;
    remove_cards_from_deck(deck, card);
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
}

function raise(){
  if (finished_turn == false && picked_2cards == true){
    turn();
    finished_turn = true;
  }
  else if(finished_river == false && picked_2cards == true){ 
    river();
    finished_river = true;
  }
  
}




function fold() {
  location.reload();
}


button.addEventListener('click', bet);
button2.addEventListener('click', fold);
button3.addEventListener('click', top_up);
button4.addEventListener('click', transfer);
button6.addEventListener('click', check);
button5.addEventListener('click', raise);



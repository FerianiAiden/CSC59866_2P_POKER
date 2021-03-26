
// const button = document.querySelector('#flip');

const button3 = document.querySelector('#top_up');
 const button4 = document.querySelector('#transfer');
  const status = document.querySelector('#status');
 const milliethers = document.querySelector('#milliethersCount');
 const text1 = document.querySelector('#textboxmsg');



let milliethersCount = 0;
let max_card = 2;
let chose = 0;




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



var items = ["1C","1D","1H","1S","2C","2D","2H","2S","3C","3D","3H","3S","4C","4D","4H","4S","5C","5D","5H","5S","6C","6D","6H","6S"
            ,"7C","7D","7H","7S","8C","8D","8H","8S","9C","9D","9H","9S","10C","10D","10H","10S","11C","11D","11H","11S","12C","12D","12H","12S",
            "13C","13D","13H","13S"];



function changeImage() {
  if (max_card > 0){
    var item = items[Math.floor(Math.random() * items.length)];
    document.getElementById("imgClickAndChange").style.display='none';
    document.getElementById("imgClickAndChange").src = "/poker-img/"+item+".jpg";
    //document.getElementById('TEXTBOX_TOPUP').
    document.getElementById("status").innerText = "You chose " + item ;
    //document.getElementById("playercards").innerText +=  " "+item ;

if(chose == 0){
  document.getElementById("yourcard1").height = 225;
  document.getElementById("yourcard1").width = 150;
  document.getElementById("yourcard1").src = "/poker-img/"+item+".jpg" ;
  document.getElementById("yourcard1").value == "1"
  chose += 1
}
else {
  document.getElementById("yourcard2").height = 225;
  document.getElementById("yourcard2").width = 150;
  document.getElementById("yourcard2").src = "/poker-img/"+item+".jpg" ;
}
  max_card -= 1;
  }
}
function changeImage2() {
  if (max_card > 0){
    var item = items[Math.floor(Math.random() * items.length)];
    document.getElementById("imgClickAndChange2").style.display='none';
    document.getElementById("imgClickAndChange2").src = "/poker-img/"+item+".jpg";
    //document.getElementById('TEXTBOX_TOPUP').
    document.getElementById("status").innerText = "You chose " + item ;

    if(chose == 0){
      document.getElementById("yourcard1").height = 225;
      document.getElementById("yourcard1").width = 150;
      document.getElementById("yourcard1").src = "/poker-img/"+item+".jpg" ;
      document.getElementById("yourcard1").value == "1"
      chose += 1
    }
    else {
      document.getElementById("yourcard2").height = 225;
      document.getElementById("yourcard2").width = 150;
      document.getElementById("yourcard2").src = "/poker-img/"+item+".jpg" ;
    }
  max_card -= 1;
  }
}

function changeImage3() {
  if (max_card > 0){
    var item = items[Math.floor(Math.random() * items.length)];
    document.getElementById("imgClickAndChange3").style.display='none';
    document.getElementById("imgClickAndChange3").src = "/poker-img/"+item+".jpg";
    //document.getElementById('TEXTBOX_TOPUP').
    document.getElementById("status").innerText = "You chose " + item ;
    //document.getElementById("playercards").innerText +=  " "+item ;

    if(chose == 0){
      document.getElementById("yourcard1").height = 225;
      document.getElementById("yourcard1").width = 150;
      document.getElementById("yourcard1").src = "/poker-img/"+item+".jpg" ;
      document.getElementById("yourcard1").value == "1"
      chose += 1
    }
    else {
      document.getElementById("yourcard2").height = 225;
      document.getElementById("yourcard2").width = 150;
      document.getElementById("yourcard2").src = "/poker-img/"+item+".jpg" ;
    }
  max_card -= 1;
  }
}

function changeImage4() {
  if (max_card > 0){
    var item = items[Math.floor(Math.random() * items.length)];
    document.getElementById("imgClickAndChange4").style.display='none';
    document.getElementById("imgClickAndChange4").src = "/poker-img/"+item+".jpg";
    //document.getElementById('TEXTBOX_TOPUP').

    document.getElementById("status").innerText = "You chose " + item ;

    if(chose == 0){
      document.getElementById("yourcard1").height = 225;
      document.getElementById("yourcard1").width = 150;
      document.getElementById("yourcard1").src = "/poker-img/"+item+".jpg" ;
      document.getElementById("yourcard1").value == "1"
      chose += 1
    }
    else {
      document.getElementById("yourcard2").height = 225;
      document.getElementById("yourcard2").width = 150;
      document.getElementById("yourcard2").src = "/poker-img/"+item+".jpg" ;
    }
  max_card -= 1;
  }
}


button3.addEventListener('click', top_up);
button4.addEventListener('click', transfer);



//import gamelogic from "./gamelogic.js";
var suit = ["spades", "diamonds", "clubs", "hearts"];
var value = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var deck = new Array();
var botHand = [];

/*/
To understand the output:
0 means Fold 
1 means Check / Call
2 means Raise
/*/
 
// function Deck()

// {
// 	for (var i = 0; i < suit.length; i++)
// 	{
// 		for (var j = 0; j < value.length; j++)
// 		{
//             let message = value[j].concat(suit[i]);
// 			var card = {Value: value[j], Suit: suit[i]};
// 			deck.push(card);
// 		}
// 	}
// }
 // using Math.floor(random(1, 5))-1 to select random cards from deck[]
let CardCombos = new Map([
	["High Card", 1],
	["One Pair", 2],
	["Two Pair", 3],
	["Three of A Kind", 4],
	["Straight", 5],
	["Flush", 6],
	["Full House", 7],
	["Four of A Kind", 8],
	["Straight Flush", 9],
	["Royal Flush", 9]
	
]);

// Deck();

var handtocheck = [];
var counter = 0;
var pastHand = [];

function resetCounter(){counter = 0;}

var length = 7; //the evaluate function takes in arrays of size 7

function randomFill(handtocheck, length){
	for (i = 0; i < length; i++){
		handtocheck.push(deck[Math.round(random(0,51))]);
	}
	}

//console.log(handtocheck);


//console.log(CardCombos);

 function random(mn, mx) {  //retrieved from GeeksforGeeks
    return Math.random() * (mx - mn) + mn; 
} 


// function decisionForPreFlop(){
// 	return 1;

// //console.log(handtocheck);
//  //let combo = gamelogic.EvaluateHand(handtocheck); //Storing string result of EvalH




function decisionForFlop(combo)
{
	
//randomFill(handtocheck, length);
 combo = gamelogic.EvaluateHand(handtocheck); //Storing string result of EvalH
 pastHand.push(combo);
 
 
 if(CardCombos.has(combo)){

	if(CardCombos.get(combo) >= 2  || diff >= 2){
		if(counter > 0 ){return 1;}
		else{
			counter+=1;
			return 2;
		}
	}
			
		else if(CardCombos.get(combo) >= 3){
			return 1;
		} else if (CardCombos.get(combo) >= 2){
			return 1;
		} else return 1;
}
}

function decisionForTurn(combo){

	
	
	combo = gamelogic.EvaluateHand(handtocheck); //Storing string result of EvalH
	pastHand.push(combo);
	let diff = CardCombos.get(combo) - CardCombos.get(pastHand[0]);
	//console.log(handtocheck);

	if(CardCombos.has(combo,hand)){

		if(CardCombos.get(combo) >= 4 || diff >= 2)
		{
			if(counter > 0 ){return 1;}
			else{
				counter+=1;
				return 2;
			}
		}
			else if(CardCombos.get(combo) >= 2){
				return 1;
			} else if (CardCombos.get(combo) >= 4){
				return 1;
			} else return 1;
	}
}

function decisionForRiver(combo){

	
	combo = gamelogic.EvaluateHand(handtocheck); //Storing string result of EvalH

	
    let diff = CardCombos.get(combo) - CardCombos.get(pastHand[1]);
	

	//console.log(handtocheck);
	
	if(CardCombos.has(combo)){

		if(CardCombos.get(combo) >= 4 || diff >= 2)
		{
			if(counter > 0 ){return 1;}
			else{
				counter+=1;
				return 2;
			}
		}
			else if(CardCombos.get(combo) >= 2){
				return 1;
			} else if (CardCombos.get(combo) >= 2){
				return 1;
			} else return 1;
	}
}








var gamelogic = require("./gamelogic");
var suit = ["spades", "diamonds", "clubs", "hearts"];
var value = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var deck = new Array();
var botHand = [];

/*/
To understand the output:
0 means Fold 
1 means Check
2 means Call
3 means Raise

/*/
 
function Deck()

{
	for (var i = 0; i < suit.length; i++)
	{
		for (var j = 0; j < value.length; j++)
		{
            let message = value[j].concat(suit[i]);
			var card = {Value: value[j], Suit: suit[i]};
			deck.push(card);
		}
	}
}
 // using Math.floor(random(1, 5))-1 to select random cards from deck[]
let CardCombos = new Map([
	["High Card", 1],
	["One Pair", 2],
	["Two Pairs", 3],
	["Three of A Kind", 4],
	["Straight", 5],
	["Flush", 6],
	["Full House", 7],
	["Four of A Kind", 8],
	["Straight Flush", 9]
	
]);




Deck();

var handtocheck = [];

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


function decisionForPreFlop(handtocheck)
{



console.log(handtocheck);
 combo = gamelogic.EvaluateHand(handtocheck); //Storing string result of EvalH
	return combo;
 if(CardCombos.has(combo)){

	if(CardCombos.get(combo) >= 2){
		console.log("3");	}
		else console.log("1");
 }	
}


function decisionForFlop(handtocheck)
{
	var handtocheck = [];
	var length = 5;
randomFill(handtocheck, length);


 combo = gamelogic.EvaluateHand(handtocheck); //Storing string result of EvalH
 console.log(handtocheck);
 
 if(CardCombos.has(combo)){

	if(CardCombos.get(combo) >= 3){
		console.log("3");	}
		else if(CardCombos.get(combo) >= 3){
			console.log("2");
		} else if (CardCombos.get(combo) >= 2){
			console.log("1")
		} else console.log("0") ;
}
}

function decisionForTurn(handtocheck){

	
	
	combo = gamelogic.EvaluateHand(handtocheck); //Storing string result of EvalH
	console.log(handtocheck);

	if(CardCombos.has(combo)){

		if(CardCombos.get(combo) >= 8){
			console.log("3");	}
			else if(CardCombos.get(combo) >= 4){
				console.log("2");
			} else if (CardCombos.get(combo) >= 4){
				console.log("1")
			} else console.log("0") ;
	}
}

function decisionforRiver(handtocheck){

	
	combo = gamelogic.EvaluateHand(handtocheck); //Storing string result of EvalH
	console.log(handtocheck);
	
	if(CardCombos.has(combo)){

		if(CardCombos.get(combo) >= 8){
			console.log("3");	}
			else if(CardCombos.get(combo) >= 6){
				console.log("2");
			} else if (CardCombos.get(combo) >= 5){
				console.log("1")
			} else console.log("0") ;
	}
}







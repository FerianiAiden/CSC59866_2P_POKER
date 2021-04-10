var suit = ["spades", "diamonds", "clubs", "hearts"];
var value = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var deck - new Array();

function Deck()
{
	for (var i = 0; i < suit.length; i++)
	{
		for (var j = 0; j < value.length; i++)
		{
			var card = {Value: value[j], Suit: suit{i}};
			deck.push(card);
		}
	}
}

function EvaluateHand(handtocheck)
{
	//functions needed to make: one to count # of suit, # of values, and sorting by suit, value, and possibly a combo
	//also need a better way to connect player cards w community pile
	//ideally would take in this concated hand, sort, then count the amount of suit and values.
	var result = ""; //empty string that will be filled containing best hand e.g, "One Pair", holder in place for now, could change to an int representation
	var suitCounter = [0,0,0,0]; //used to tally occurences of suit in each hand
	var valueCounter = [0,0,0,0,0,0,0,0,0,0,0,0,0]; //used to tally occurences of card value in each hand

	//check for Straight Flush
	if (result == null)
	{
		result = checkStraightFlush(valueCounter, suitCounter);
	}
	//check for four of a kind
	if (result == null)
	{
		result = checkFourOfAKind(valueCounter);
	}
	//check for Full House
	if (result == null)
	{
		result = checkFullHouse(valueCounter);
	}
	//check for flush
	if (result == null)
	{
		result = checkFlush(suitCounter);
	}
	//check for straight
	if (result == null)
	{
		result = checkStraight(valueCounter);
	}
	//check for three of a kind
	if (result == null)
	{
		result = checkThreeOfAKind(valueCounter);
	}
	//check for two pair
	if (result == null)
	{
		result = checkTwoPair(valueCounter);
	}
	//check for one pair
	if (result == null)
	{
		result = checkOnePair(valueCounter);
	}
	//check for high card
	if (result == null)
	{
		result = checkHighCard(valueCounter);
	}

	return result;
}

 function checkOnePair(a)
 {
 	var resOP = "";

 	for (var i = a.length; i > 0; i--)
 	{
 		if (a[i-1] > 1)
 		{
 			resOP = "One Pair";
 			break;
 		}
 	}
 	return resOP;
 }

 function checkHighCard(a)
 {
 	var resHC = "";

 	for (var i = a.length; i > 0; i--)
 	{
 		if (a[i-1] > 0)
 		{
 			resHC = "High Card";
 			break;
 		}
 	}

 	return resHC;
 }

 function checkThreeOfAKind(a)
 {
 	var resTOK = "";

 	for (var i = a.length; i > 0; i--)
 	{
 		if (a[i-1] > 2)
 		{
 			resTOK = "Three of A Kind";
 			break;
 		}
 	}
 	return resTOK;
 }

function checkFourOfAKind(a)
 {
 	var resFOK = "";

 	for (var i = a.length; i > 0; i--)
 	{
 		if (a[i] = 4)
 		{
 			resFOK = "One Pair";
 			break;
 		}
 	}
 	return resOP;
 }

 function checkTwoPair(a)
 {
 	var resTP = "";
 	var pairOne = 0;
 	var pairTwo = 0;

 	for (var i = a.length; i >0; i--)
 	{
 		if ((pairOne < 1) || pairTwo < 1)
 		{
 			if((a[i-1] > 1) && (pairOne < 1))
 			{
 				pairOne = i-1;
 			}
 			else if (a[i-1] > 1)
 			{
 				pairTwo = i -1;
 			}
 		}
 		else
 		{
 			break;
 		}
 	}

 	if ((pairOne > 0) && (pairTwo > 0))
 	{
 		resTP = "Two Pairs"
 	} 

 	return resTP;
 }

 function checkStraight (a)
 {
 	var resStr = "";

 	for (var i = valueCounter.length; i > 4; i--)
 	{
 		if ((a[i-5] > 0) && (a[i-4] > 0) && (a[i-3] > 0) && (a[i-2] > 0) && (a[i-1] > 0))
 		{
 			resStr = "Straight";
 			break;
 		}
 	}
 	return resStr;
 }


 function checkFlush(a)
 {
 	var resFlush = "";

 	if (a[0] > 4 || a[1] > 4 || a[2] > 4 || a[3] > 4)
 	{
 		resFlush = "Flush";
 	}

 	return resFlush;
 }

function checkFullHouse(a)
{
	var resFH = "";
	var ThreeKind = 0;
	var TwoKind = 0;

	for (var i = a.length; i > 0; i--)
	{
		if ((ThreeKind < 1) || (TwoKind < 1))
		{
			if (a[i-1] > 2)
			{
				ThreeKind = i - 1;
			}
			else if (a[i-1] > 1)
			{
				TwoKind = i - 1;
			}
		}
		else
		{
			break;
		}
	}
	if (ThreeKind > 0 && TwoKind > 0)
	{
		resFH = "Full House";
	}
	return resFH;
}

function checkStraightFlush(a, b)
{
	var resSF = "";

	if (b[0] > 4 || b[1] > 4 ||b[2] > 4 ||b[3] > 4)
 	{
 		for (var i = b.length; i > 4; i--)
 		{
 			if ((b[i-5] > 0) && (b[i-4] > 0) && (b[i-3] > 0) && (b[i-2] > 0) && (b[i-1] > 0))
 			{
 				resSF = "Straight Flush";
 				break;
 			}
 		}
 	}
 	return resSF;
}

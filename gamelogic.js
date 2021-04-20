var suit = ["spades", "diamonds", "clubs", "hearts"];
var value = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var deck = [];

function Deck()
{
	for (var i = 0; i < suit.length; i++)
	{
		for (var j = 0; j < value.length; j++)
		{
			var card = {Value: value[j], Suit: suit[i]};
			deck.push(card);
		}
	}
}

Deck();

//console.log(deck[1]);


function EvaluateWinner(pHand, cHand, pHandString, cHandString)
{
	var winner = "";
	var pHandValue = 0;
	var cHandValue = 0;
	
	//Assign value to string, will become redundant if we switch to numerical representation instead of string
	//Assign value for Player Hand
	if (pHandString = "Straight Flush")
	{
		pHandValue = 9;
	}
	else if (pHandString = "Four of A Kind")
	{
		pHandValue = 8;
	}
	else if (pHandString = "Full House")
	{
		pHandValue = 7;
	}
	else if (pHandString = "Flush")
	{
		pHandValue = 6;
	}
	else if (pHandString = "Straight")
	{
		pHandValue = 5;
	}
	else if (pHandString = "Three of A Kind")
	{
		pHandValue = 4;
	}
	else if (pHandString = "Two Pair")
	{
		pHandValue = 3;
	}
	else if (pHandString = "One Pair")
	{
		pHandValue = 2;
	}
	else if (pHandString = "High Card")
	{
		pHandValue = 1;
	}

	//Assign value for Casino hand
	if (cHandString = "Straight Flush")
	{
		cHandValue = 9;
	}
	else if (cHandString = "Four of A Kind")
	{
		cHandValue = 8;
	}
	else if (cHandString = "Full House")
	{
		cHandValue = 7;
	}
	else if (cHandString = "Flush")
	{
		cHandValue = 6;
	}
	else if (cHandString = "Straight")
	{
		cHandValue = 5;
	}
	else if (cHandString = "Three of A Kind")
	{
		cHandValue = 4;
	}
	else if (cHandString = "Two Pair")
	{
		cHandValue = 3;
	}
	else if (cHandString = "One Pair")
	{
		cHandValue = 2;
	}
	else if (cHandString = "High Card")
	{
		cHandValue = 1;
	}
	
	//Compare hands and determine winner, go to tiebreaker if same
	if (pHandValue > cHandValue)
	{
		winner = "Player wins!" ;
	}
	else if (pHandValue < cHandValue)
	{
		winner = "Casino wins!" ;
	}
	else if (pHandValue == cHandValue)
	{
		winner = checkTie(pHand, cHand, pHandString, cHandString);
	}
	return winner;
}

function EvaluateHand(handtocheck)
{
	var result = ""; //empty string that will be filled containing best hand e.g, "One Pair", holder in place for now, could change to an int representation
	var suitCounter = [0,0,0,0]; //used to tally occurences of suit in each hand
	var valueCounter = [0,0,0,0,0,0,0,0,0,0,0,0,0]; //used to tally occurences of card value in each hand

	suitCounter = updateSuitCounter(handtocheck, suitCounter);
	valueCounter = updateSuitCounter(handtocheck, valueCounter);

	//check for Straight Flush
	if (result == "")
	{
		result = checkStraightFlush(valueCounter, suitCounter);
	}
	//check for four of a kind
	 if(result == "")
	{
		result = checkFourOfAKind(valueCounter);
	}
	//check for Full House
	if(result == "")
	{
		result = checkFullHouse(valueCounter);
	}
	//check for flush
	if(result == "")
	{
		result = checkFlush(suitCounter);
	}
	//check for straight
	if(result == "")
	{
		result = checkStraight(valueCounter);
	}
	//check for three of a kind
	if(result == "")
	{
		result = checkThreeOfAKind(valueCounter);
	}
	//check for two pair
	if(result == "")
	{
		result = checkTwoPair(valueCounter);
	}
	//check for one pair
	if(result == "")
	{
		result = checkOnePair(valueCounter);
	}
	//check for high card
	if(result == "")
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
 		if (a[i] == 4)
 		{
 			resFOK = "Four of A Kind";
 			break;
 		}
 	}
 	return resFOK;
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
 		resTP = "Two Pairs";
 	} 

 	return resTP;
}

function checkStraight (a)
{
 	var resStr = "";

 	for (var i = a.length; i > 4; i--)
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

function updateSuitCounter (handtocheck, sc)
{
	for (var i = 0; i < handtocheck.length; i++)
	{
		if (handtocheck[i].Suit == "spades")
		{
			sc[0] = sc[0] + 1;
		}
		else if (handtocheck[i].Suit == "diamonds")
		{
			sc[1] = sc[1] + 1;
		}
		else if (handtocheck[i].Suit == "clubs")
		{
			sc[2] = sc[2] + 1;
		}
		else if (handtocheck[i].Suit == "hearts")
		{
			sc[3] = sc[3] + 1;
		}
	}

	return sc;
}

function updateValueCounters (handtocheck, vc)
{
	for (var i = 0; i < handtocheck.length; i++)
	{
		if (handtocheck[i].Value == "A")
		{
			vc[0] = vc[0] + 1;
		}
		else if (handtocheck[i].Value == "2")
		{
			vc[1] = vc[1] + 1;
		}
		else if (handtocheck[i].Value == "3")
		{
			vc[2] = vc[2] + 1;
		}
		else if (handtocheck[i].Value == "4")
		{
			vc[3] = vc[3] + 1;
		}
		else if (handtocheck[i].Value == "5")
		{
			vc[4] = vc[4] + 1;
		}
		else if (handtocheck[i].Value == "6")
		{
			vc[5] = vc[5] + 1;
		}
		else if (handtocheck[i].Value == "7")
		{
			vc[6] = vc[6] + 1;
		}
		else if (handtocheck[i].Value == "8")
		{
			vc[7] = vc[7] + 1;
		}
		else if (handtocheck[i].Value == "9")
		{
			vc[8] = vc[8] + 1;
		}
		else if (handtocheck[i].Value == "10")
		{
			vc[9] = vc[9] + 1;
		}
		else if (handtocheck[i].Value == "J")
		{
			vc[10] = vc[10] + 1;
		}
		else if (handtocheck[i].Value == "Q")
		{
			vc[11] = vc[11] + 1;
		}
		else if (handtocheck[i].Value == "K")
		{
			vc[12] = vc[12] + 1;
		}
	}
	return vc;
}


function checkTie(pHand, cHand, pHandString, cHandString)
{
	var temppHand = pHand;
	var tempcHand = cHand;
	var tieResult = "";

	//Straight Flush tiebreaker
	if (pHandString == "Straight Flush" && cHandString == "Straight Flush")
	{
		var pSFlush1 = [];
		var pSFlush2 = [];
		var cSFlush1 = [];
		var cSFlush2 = [];

		//Converts A, K, Q, J to numerical values and stores all 7 cards into array. 2 lowest are then removed
		for (var i = 0; i < 7; i++)
		{
			if(temppHand[i].Value == "A")
			{
				temppHand[i].Value = 14;
			}
			else if(temppHand[i].Value == "K")
			{
				temppHand[i].Value = 13;
			}
			else if(temppHand[i].Value == "Q")
			{
				temppHand[i].Value = 12;
			}
			else if(temppHand[i].Value == "J")
			{
				temppHand[i].Value = 11;
			}
		}
		for (var j = 0; j < 7; j++)
		{
			if(tempcHand[j].Value == "A")
			{
				tempcHand[j].Value = 14;
			}
			else if(tempcHand[j].Value == "K")
			{
				tempcHand[j].Value = 13;
			}
			else if(tempcHand[j].Value == "Q")
			{
				tempcHand[j].Value = 12;
			}
			else if(tempcHand[j].Value == "J")
			{
				tempchand[j].Value = 11;
			}
		}
		for (var x = 0; x < 7; x++)
		{
			pSFlush1[x] = temppHand[x].Value;
			cSFlush1[x] = tempcHand[x].Value;
		}

		var pSFTemp1 = 0;
		var pSFTemp2 = 0;
		var pSFTemp3 = 0;
		var pSFTemp4 = 0;
		var pSFTemp5 = 0;
		var cSFTemp1 = 0;
		var cSFTemp2 = 0;
		var cSFTemp3 = 0;
		var cSFTemp4 = 0;
		var cSFTemp5 = 0;

		pSFlush1.sort((a,b) => (a.Suit > b.Suit ? 1 : -1)); //Sort by suit
		cSFlush1.sort((a,b) => (a.Suit > b.Suit ? 1 : -1)); //Sort by suit

		for (var k = 0; k < 3; k++)
		{
			if (pSFlush1.Suit[k] == "clubs" && pSFlush1.Suit[k+1] == "clubs" && pSFlush1.Suit[k+2] == "clubs" && pSFlush1.Suit[k+3] == "clubs" && pSFlush1.Suit[k+4] == "clubs")
			{
				pSFTemp5 = pSFlush1.Value[k];
				pSFTemp4 = pSFlush1.Value[k+1];
				pSFTemp3 = pSFlush1.Value[k+2];
				pSFTemp2 = pSFlush1.Value[k+3];
				pSFTemp1 = pSFlush1.Value[k+4]; 	
			}
			else if (pSFlush1.Suit[k] == "diamonds" && pSFlush1.Suit[k+1] == "diamonds" && pSFlush1.Suit[k+2] == "diamonds" && pSFlush1.Suit[k+3] == "diamonds" && pSFlush1.Suit[k+4] == "diamonds")
			{
				pSFTemp5 = pSFlush1.Value[k];
				pSFTemp4 = pSFlush1.Value[k+1];
				pSFTemp3 = pSFlush1.Value[k+2];
				pSFTemp2 = pSFlush1.Value[k+3];
				pSFTemp1 = pSFlush1.Value[k+4]; 	
			}
			else if (pSFlush1.Suit[k] == "hearts" && pSFlush1.Suit[k+1] == "hearts" && pSFlush1.Suit[k+2] == "hearts" && pSFlush1.Suit[k+3] == "hearts" && pSFlush1.Suit[k+4] == "hearts")
			{
				pSFTemp5 = pSFlush1.Value[k];
				pSFTemp4 = pSFlush1.Value[k+1];
				pSFTemp3 = pSFlush1.Value[k+2];
				pSFTemp2 = pSFlush1.Value[k+3];
				pSFTemp1 = pSFlush1.Value[k+4]; 	
			}
			else if (pSFlush1.Suit[k] == "spades" && pSFlush1.Suit[k+1] == "spades" && pSFlush1.Suit[k+2] == "spades" && pSFlush1.Suit[k+3] == "spades" && pSFlush1.Suit[k+4] == "spades")
			{
				pSFTemp5 = pSFlush1.Value[k];
				pSFTemp4 = pSFlush1.Value[k+1];
				pSFTemp3 = pSFlush1.Value[k+2];
				pSFTemp2 = pSFlush1.Value[k+3];
				pSFTemp1 = pSFlush1.Value[k+4]; 	
			}
		}
		for (var g = 0; g < 3; g++)
		{
			if (cSFlush1.Suit[g] == "clubs" && cSFlush1.Suit[g+1] == "clubs" && cSFlush1.Suit[g+2] == "clubs" && cSFlush1.Suit[g+3] == "clubs" && cSFlush1.Suit[g+4] == "clubs")
			{
				cSFTemp5 = cSFlush1.Value[g];
				cSFTemp4 = cSFlush1.Value[g+1];
				cSFTemp3 = cSFlush1.Value[g+2];
				cSFTemp2 = cSFlush1.Value[g+3];
				cSFTemp1 = cSFlush1.Value[g+4]; 	
			}
			else if (cSFlush1.Suit[g] == "diamonds" && cSFlush1.Suit[g+1] == "diamonds" && cSFlush1.Suit[g+2] == "diamonds" && cSFlush1.Suit[g+3] == "diamonds" && cSFlush1.Suit[g+4] == "diamonds")
			{
				cSFTemp5 = cSFlush1.Value[g];
				cSFTemp4 = cSFlush1.Value[g+1];
				cSFTemp3 = cSFlush1.Value[g+2];
				cSFTemp2 = cSFlush1.Value[g+3];
				cSFTemp1 = cSFlush1.Value[g+4]; 	
			}
			else if (cSFlush1.Suit[g] == "hearts" && cSFlush1.Suit[g+1] == "hearts" && cSFlush1.Suit[g+2] == "hearts" && cSFlush1.Suit[g+3] == "hearts" && cSFlush1.Suit[g+4] == "hearts")
			{
				cSFTemp5 = cSFlush1.Value[g];
				cSFTemp4 = cSFlush1.Value[g+1];
				cSFTemp3 = cSFlush1.Value[g+2];
				cSFTemp2 = cSFlush1.Value[g+3];
				cSFTemp1 = cSFlush1.Value[g+4]; 	
			}
			else if (cSFlush1.Suit[g] == "spades" && cSFlush1.Suit[g+1] == "spades" && cSFlush1.Suit[g+2] == "spades" && cSFlush1.Suit[g+3] == "spades" && cSFlush1.Suit[g+4] == "spades")
			{
				cSFTemp5 = cSFlush1.Value[g];
				cSFTemp4 = cSFlush1.Value[g+1];
				cSFTemp3 = cSFlush1.Value[g+2];
				cSFTemp2 = cSFlush1.Value[g+3];
				cSFTemp1 = cSFlush1.Value[g+4]; 	
			}
		}
		pSFlush2.push(pSFTemp1, pSFTemp2, pSFTemp3, pSFTemp4, pSFTemp5);
		cSFlush2.push(cSFTemp1, cSFTemp2, cSFTemp3, cSFTemp4, cSFTemp5);

		for (var y = 0; y < pSFlush2.length; y++)
		{
			if (pSFlush2[y] > cSFlush2[y])
			{
				tieResult = "Player wins!";
			}
			else if (pSFlush2[y] < cSFlush2[y])
			{
				tieResult = "Casino wins!";
			}
			else
			{
				tieResult = "Tie.";
			}
		}
	}

	//Four of a Kind tiebreaker
	if (pHandString == "Four of A Kind" && cHandString == "Four of a Kind")
	{
		var pFOK = [];
		var cFOK = [];

		for (var i = 0; i < 7; i++)
		{
			if(temppHand[i].Value == "A")
			{
				temppHand[i].Value = 14;
			}
			else if(temppHand[i].Value == "K")
			{
				temppHand[i].Value = 13;
			}
			else if(temppHand[i].Value == "Q")
			{
				temppHand[i].Value = 12;
			}
			else if(temppHand[i].Value == "J")
			{
				temppHand[i].Value = 11;
			}
		}
		for (var j = 0; j < 7; j++)
		{
			if(tempcHand[j].Value == "A")
			{
				tempcHand[j].Value = 14;
			}
			else if(tempcHand[j].Value == "K")
			{
				tempcHand[j].Value = 13;
			}
			else if(tempcHand[j].Value == "Q")
			{
				tempcHand[j].Value = 12;
			}
			else if(tempcHand[j].Value == "J")
			{
				tempchand[j].Value = 11;
			}
		}
		for (var x = 0; x < 7; x++)
		{
			pFOK[x] = temppHand[x].Value;
			cFOK[x] = tempcHand[x].Value;
		}
		pFOK.sort(function(a, b){return a-b});
		cFOK.sort(function(a, b){return a-b});
		var pFOKTemp = 0;
		var cFOKTemp = 0;

		for (var v = 0; v < pFOK.length; v++)
		{
			for (var w = 1; w < pFOK.length; w++)
			{
				if (pFOK[v] == pFOK[w])
				{
					pFOKTemp = pTOK[v];
					pFOK.splice(v, 1);
					pFOK.splice(w-1, 1);
					break;
				}
			}
		}
		for (var c = 0; c < pFOK.length; c++)
		{
			if (pFOK[c] == pFOKTemp)
			{
				pFOK.splice(c, 1);
			}
		}

		for (var a = 0; a < cFOK.length; a++)
		{
			for (var b = 1; b < cFOK.length; b++)
			{
				if (cFOK[a] == cFOK[b])
				{
					cFOKTemp = cFOK[b];
					cFOK.splice(a, 1);
					cFOK.splice(b-1, 1);
					break;
				}
			}
		}
		for (var d = 0; d < cTOK.length; d++)
		{
			if (cTOK[d] == cTOKTemp)
			{
				cTOK.splice(d, 1);
			}
		}

		pFOK.splice(0, 2);
		cFOK.splice(0, 2);
		pFOK.push(pFOKTemp);
		cFOK.push(cFOKTemp);

		for (var y = pFOK.length - 1; y >= 0; y--)
		{
			if (pFOK[y] > cFOK[y])
			{
				tieResult = "Player wins!";
				break;
			}
			else if (pTOK[y] < cTOK[y])
			{
				tieResult = "Casino wins!";
				break;
			}
			else
			{
				tieResult = "Tie.";
			}
		}
	}

	//Full House Tiebreaker
	if (pHandString == "Full House" && cHandString == "Full House")
	{
		var pFH = [];
		var cFH = [];
		//Converts A, K, Q, J to numerical values and stores all 7 cards into array. 2 lowest are then removed
		for (var i = 0; i < 7; i++)
		{
			if(temppHand[i].Value == "A")
			{
				temppHand[i].Value = 14;
			}
			else if(temppHand[i].Value == "K")
			{
				temppHand[i].Value = 13;
			}
			else if(temppHand[i].Value == "Q")
			{
				temppHand[i].Value = 12;
			}
			else if(temppHand[i].Value == "J")
			{
				temppHand[i].Value = 11;
			}
		}
		for (var j = 0; j < 7; j++)
		{
			if(tempcHand[j].Value == "A")
			{
				tempcHand[j].Value = 14;
			}
			else if(tempcHand[j].Value == "K")
			{
				tempcHand[j].Value = 13;
			}
			else if(tempcHand[j].Value == "Q")
			{
				tempcHand[j].Value = 12;
			}
			else if(tempcHand[j].Value == "J")
			{
				tempchand[j].Value = 11;
			}
		}
		for (var x = 0; x < 7; x++)
		{
			pFH[x] = temppHand[x].Value;
			cFH[x] = tempcHand[x].Value;
		}
		pFH.sort(function(a, b){return a-b});
		cFH.sort(function(a, b){return a-b});

		var pFHTemp1 = 0;
		var pFHTemp2 = 0;
		var cFHTemp1 = 0;
		var cFHTemp2 = 0;

		var pFHCount1 = 0;
		var pFHCount2 = 0;
		var cFHCount1 = 0;
		var cFHCount2 = 0;
		var pFHorder = [];
		var cFHorder = [];

		for (var a = 0; a < pFH.length; a++)
		{
			for (var b = 1; b < pFH.length; b++)
			{
				if ((pFH[a] == pFH[b]) && pFHCount1 < 1)
				{
					pFHTemp1 = pFH[b];
					pFH.splice(a, 1);
					pFH.splice(b-1, 1);
					pFHCount1++;
				}
				else if ((pFH[a] == pFH[b]) && pFHCount2 < 1)
				{
					pFHTemp2 = pFH[b];
					pFH.splice(a, 1);
					pFH.splice(b-1, 1);
					pFHCount2++;
				}	
			}
		}

		for (var c = 0; c < cFH.length; c++)
		{
			for (var d = 1; d < cFH.length; d++)
			{
				if ((cFH[c] == cFH[d]) && cFHCount1 < 1)
				{
					cFHTemp1 = cFH[d];
					cFH.splice(c, 1);
					cFH.splice(d-1, 1);
					cFHCount1++;
				}
				else if ((cFH[c] == cFH[d]) && cFHCount2 < 1)
				{
					cFHTemp2 = cFH[d];
					cFH.splice(c, 1);
					cFH.splice(d-1, 1);
					cFHCount2++;
				}	
			}
		}

		for (var e = 0; e < pFH.length; e++)
		{
			if ((pFH[e] == pFHTemp1) && pFHCount1 < 2)
			{
				pFH.splice(e);
				pFHorder.push(pFHTemp1, pFHTemp2);
				break;
			}
			else if ((pFH[e] == pFHTemp2) && pFHCount2 < 2)
			{
				pFH.splice(e);
				pFHorder.push(pFHTemp2, pFHTemp1);
				break;
			}
		}

		for (var f = 0; f < cFH.length; f++)
		{
			if ((cFH[f] == cFHTemp1) && cFHCount1 < 2)
			{
				cFH.splice(f);
				cFHorder.push(cFHTemp1, cFHTemp2);
				break;
			}
			else if ((cFH[f] == cFHTemp2) && cFHCount2 < 2)
			{
				cFH.splice(f);
				cFHorder.push(cFHTemp2, cFHTemp1);
				break;
			}
		}

		for (var g = 0; g < pFHorder.length; g++)
		{
			if (pFHorder[g] > cFHorder[g])
			{
				tieResult = "Player wins!";
				break;
			}
			else if (pTOK[g] < cTOK[g])
			{
				tieResult = "Casino wins!";
				break;
			}
			else
			{
				tieResult = "Tie.";
			}
		}
	}

	//Flush tiebreaker
	if (pHandString == "Flush" && cHandString == "Flush")
	{
		var pFV = [];
		var cFV = [];
		var pFS = [];
		var cFS = [];

		//Converts A, K, Q, J to numerical values and stores all 7 cards into array. 2 lowest are then removed
		for (var i = 0; i < 7; i++)
		{
			if(temppHand[i].Value == "A")
			{
				temppHand[i].Value = 14;
			}
			else if(temppHand[i].Value == "K")
			{
				temppHand[i].Value = 13;
			}
			else if(temppHand[i].Value == "Q")
			{
				temppHand[i].Value = 12;
			}
			else if(temppHand[i].Value == "J")
			{
				temppHand[i].Value = 11;
			}
		}
		for (var j = 0; j < 7; j++)
		{
			if(tempcHand[j].Value == "A")
			{
				tempcHand[j].Value = 14;
			}
			else if(tempcHand[j].Value == "K")
			{
				tempcHand[j].Value = 13;
			}
			else if(tempcHand[j].Value == "Q")
			{
				tempcHand[j].Value = 12;
			}
			else if(tempcHand[j].Value == "J")
			{
				tempchand[j].Value = 11;
			}
		}
		for (var x = 0; x < 7; x++)
		{
			pFV[x] = temppHand[x];
			cFV[x] = tempcHand[x];		
		}

		var pFTemp1 = 0;
		var pFTemp2 = 0;
		var pFTemp3 = 0;
		var pFTemp4 = 0;
		var pFTemp5 = 0;
		var cFTemp1 = 0;
		var cFTemp2 = 0;
		var cFTemp3 = 0;
		var cFTemp4 = 0;
		var cFTemp5 = 0;

		pFV.sort((a,b) => (a.Suit > b.Suit ? 1 : -1)); //Sort by suit
		cFV.sort((a,b) => (a.Suit > b.Suit ? 1 : -1)); //Sort by suit

		for (var k = 0; k < 3; k++)
		{
			if (pFV.Suit[k] == "clubs" && pFV.Suit[k+1] == "clubs" && pFV.Suit[k+2] == "clubs" && pFV.Suit[k+3] == "clubs" && pFV.Suit[k+4] == "clubs")
			{
				pFTemp5 = pFV.Value[k];
				pFTemp4 = pFV.Value[k+1];
				pFTemp3 = pFV.Value[k+2];
				pFTemp2 = pFV.Value[k+3];
				pFTemp1 = pFV.Value[k+4]; 	
			}
			else if (pFV.Suit[k] == "diamonds" && pFV.Suit[k+1] == "diamonds" && pFV.Suit[k+2] == "diamonds" && pFV.Suit[k+3] == "diamonds" && pFV.Suit[k+4] == "diamonds")
			{
				pFTemp5 = pFV.Value[k];
				pFTemp4 = pFV.Value[k+1];
				pFTemp3 = pFV.Value[k+2];
				pFTemp2 = pFV.Value[k+3];
				pFTemp1 = pFV.Value[k+4]; 	
			}
			else if (pFV.Suit[k] == "hearts" && pFV.Suit[k+1] == "hearts" && pFV.Suit[k+2] == "hearts" && pFV.Suit[k+3] == "hearts" && pFV.Suit[k+4] == "hearts")
			{
				pFTemp5 = pFV.Value[k];
				pFTemp4 = pFV.Value[k+1];
				pFTemp3 = pFV.Value[k+2];
				pFTemp2 = pFV.Value[k+3];
				pFTemp1 = pFV.Value[k+4]; 	
			}
			else if (pFV.Suit[k] == "spades" && pFV.Suit[k+1] == "spades" && pFV.Suit[k+2] == "spades" && pFV.Suit[k+3] == "spades" && pFV.Suit[k+4] == "spades")
			{
				pFTemp5 = pFV.Value[k];
				pFTemp4 = pFV.Value[k+1];
				pFTemp3 = pFV.Value[k+2];
				pFTemp2 = pFV.Value[k+3];
				pFTemp1 = pFV.Value[k+4]; 	
			}
		}
		for (var g = 0; g < 3; g++)
		{
			if (cFV.Suit[g] == "clubs" && cFV.Suit[g+1] == "clubs" && cFV.Suit[g+2] == "clubs" && cFV.Suit[g+3] == "clubs" && cFV.Suit[g+4] == "clubs")
			{
				cFTemp5 = cFV.Value[g];
				cFTemp4 = cFV.Value[g+1];
				cFTemp3 = cFV.Value[g+2];
				cFTemp2 = cFV.Value[g+3];
				cFTemp1 = cFV.Value[g+4]; 	
			}
			else if (cFV.Suit[g] == "diamonds" && cFV.Suit[g+1] == "diamonds" && cFV.Suit[g+2] == "diamonds" && cFV.Suit[g+3] == "diamonds" && cFV.Suit[g+4] == "diamonds")
			{
				cFTemp5 = cFV.Value[g];
				cFTemp4 = cFV.Value[g+1];
				cFTemp3 = cFV.Value[g+2];
				cFTemp2 = cFV.Value[g+3];
				cFTemp1 = cFV.Value[g+4]; 	
			}
			else if (cFV.Suit[g] == "hearts" && cFV.Suit[g+1] == "hearts" && cFV.Suit[g+2] == "hearts" && cFV.Suit[g+3] == "hearts" && cFV.Suit[g+4] == "hearts")
			{
				cFTemp5 = cFV.Value[g];
				cFTemp4 = cFV.Value[g+1];
				cFTemp3 = cFV.Value[g+2];
				cFTemp2 = cFV.Value[g+3];
				cFTemp1 = cFV.Value[g+4]; 	
			}
			else if (cFV.Suit[g] == "spades" && cFV.Suit[g+1] == "spades" && cFV.Suit[g+2] == "spades" && cFV.Suit[g+3] == "spades" && cFV.Suit[g+4] == "spades")
			{
				cFTemp5 = cFV.Value[g];
				cFTemp4 = cFV.Value[g+1];
				cFTemp3 = cFV.Value[g+2];
				cFTemp2 = cFV.Value[g+3];
				cFTemp1 = cFV.Value[g+4]; 	
			}
		}
		pFS.push(pFTemp1, pFTemp2, pFTemp3, pFTemp4, pFTemp5);
		cFS.push(cFTemp1, cFTemp2, cFTemp3, cFTemp4, cFTemp5);

		for (var y = 0; y < pFS.length; y++)
		{
			if (pFS[y] > cFS[y])
			{
				tieResult = "Player wins!";
			}
			else if (pFS[y] < cFS[y])
			{
				tieResult = "Casino wins!";
			}
			else
			{
				tieResult = "Tie.";
			}
		}
	}

	//Straight tiebreaker
	if (pHandString == "Straight" && cHandString == "Straight")
	{
		var pS = [];
		var cS = [];

		//Converts A, K, Q, J to numerical values and stores all 7 cards into array. 2 lowest are then removed
		for(var i = 0; i < 7; i++)
		{
			if(temppHand[i].Value == "A")
			{
				temppHand[i].Value = 14;
			}
			else if(temppHand[i].Value == "K")
			{
				temppHand[i].Value = 13;
			}
			else if(temppHand[i].Value == "Q")
			{
				temppHand[i].Value = 12;
			}
			else if(temppHand[i].Value == "J")
			{
				temppHand[i].Value = 11;
			}
		}
		for (var j = 0; j < 7; j++)
		{
			if(tempcHand[j].Value == "A")
			{
				tempcHand[j].Value = 14;
			}
			else if(tempcHand[j].Value == "K")
			{
				tempcHand[j].Value = 13;
			}
			else if(tempcHand[j].Value == "Q")
			{
				tempcHand[j].Value = 12;
			}
			else if(tempcHand[j].Value == "J")
			{
				tempchand[j].Value = 11;
			}
		}
		for (var x = 0; x < 7; x++)
		{
			pS[x] = temppHand[x].Value;
			cS[x] = tempcHand[x].Value;
		}
		pS.sort(function(a, b){return a-b});
		cS.sort(function(a, b){return a-b});

		var pSTemp1 = 0;
		var pSTemp2 = 0;
		var pSTemp3 = 0;
		var pSTemp4 = 0;
		var pSTemp5 = 0;
		var cSTemp1 = 0;
		var cSTemp2 = 0;
		var cSTemp3 = 0;
		var cSTemp4 = 0;
		var cSTemp5 = 0;

		for (var w = pS.length; w > 4; w--)
 		{
 			if ((pS[w-5] > 0) && (pS[w-4] > 0) && (pS[w-3] > 0) && (pS[w-2] > 0) && (pS[w-1] > 0))
 			{
 				pSTemp1 = pS[w-5];
 				pSTemp2 = pS[w-4];
 				pSTemp3 = pS[w-3];
 				pSTemp4 = pS[w-2];
 				pSTemp5 = pS[w-1];
 			}
 		}

 		for (var y = cS.length; y > 4; y--)
 		{
 			if ((cS[y-5] > 0) && (cS[y-4] > 0) && (cS[y-3] > 0) && (cS[y-2] > 0) && (cS[y-1] > 0))
 			{
 				cSTemp1 = cS[y-5];
 				cSTemp2 = cS[y-4];
 				cSTemp3 = cS[y-3];
 				cSTemp4 = cS[y-2];
 				cSTemp5 = cS[y-1];
 			}
 		}
 		pS.splice(0, 7);
 		cS.splice(0, 7);
 		pS.push(pSTemp1, pSTemp2, pSTemp3, pSTemp4, pSTemp5);
 		cS.push(cSTemp1, cSTemp2, cSTemp3, cSTemp4, cSTemp5);

 		//Compare the highest card in Straight. User w higher value wins. Split if they have same exact value
		if (pS[4] > cS[4])
		{
			tieResult = "Player wins!";
		}
		else if (pS[4] < cS[4])
		{
			tieResult = "Casino wins!";
		}
		else
		{
			tieResult = "Tie.";
		}
	}

	//Three of A Kind tiebreaker
	if (pHandString == "Three of A Kind" && cHandString == "Three of a Kind")
	{
		var pTOK = [];
		var cTOK = [];

		//Converts A, K, Q, J to numerical values and stores all 7 cards into array. 2 lowest are then removed
		for (var i = 0; i < 7; i++)
		{
			if(temppHand[i].Value == "A")
			{
				temppHand[i].Value = 14;
			}
			else if(temppHand[i].Value == "K")
			{
				temppHand[i].Value = 13;
			}
			else if(temppHand[i].Value == "Q")
			{
				temppHand[i].Value = 12;
			}
			else if(temppHand[i].Value == "J")
			{
				temppHand[i].Value = 11;
			}
		}
		for (var j = 0; j < 7; j++)
		{
			if(tempcHand[j].Value == "A")
			{
				tempcHand[j].Value = 14;
			}
			else if(tempcHand[j].Value == "K")
			{
				tempcHand[j].Value = 13;
			}
			else if(tempcHand[j].Value == "Q")
			{
				tempcHand[j].Value = 12;
			}
			else if(tempcHand[j].Value == "J")
			{
				tempchand[j].Value = 11;
			}
		}
		for (var x = 0; x < 7; x++)
		{
			pTOK[x] = temppHand[x].Value;
			cTOK[x] = tempcHand[x].Value;
		}
		pTOK.sort(function(a, b){return a-b});
		cTOK.sort(function(a, b){return a-b});
		
		var pTOKTemp = 0;
		var cTOKTemp = 0;

		for (var v = 0; v < pTOK.length; v++)
		{
			for (var w = 1; w < pTOK.length; w++)
			{
				if (pTOK[v] == pTOK[w])
				{
					pTOKTemp = pTOK[v];
					pTOK.splice(v, 1);
					pTOK.splice(w-1, 1);
					break;
				}
			}
		}
		for (var c = 0; c < pTOK.length; c++)
		{
			if (pTOK[c] == pTOKTemp)
			{
				pTOK.splice(c, 1);
				break;
			}
		}

		for (var a = 0; a < cTOK.length; a++)
		{
			for (var b = 1; b < cTOK.length; b++)
			{
				if (cTOK[a] == cTOK[b])
				{
					cTOKTemp = cTOK[b];
					cTOK.splice(a, 1);
					cTOK.splice(b-1, 1);
					break;
				}
			}
		}
		for (var d = 0; d < cTOK.length; d++)
		{
			if (cTOK[d] == cTOKTemp)
			{
				cTOK.splice(v, 1);
				break;
			}
		}

		pTOK.splice(0, 2);
		cTOK.splice(0, 2);
		pTOK.push(pTOKTemp);
		cTOK.push(cTOKTemp);


		//Compare the Two Pair value and Kickers. User w higher value wins. Split if they have same exact value
		for (var y = pTOK.length - 1; y >= 0; y--)
		{
			if (pTOK[y] > cTOK[y])
			{
				tieResult = "Player wins!";
				break;
			}
			else if (pTOK[y] < cTOK[y])
			{
				tieResult = "Casino wins!";
				break;
			}
			else
			{
				tieResult = "Tie.";
			}
		}
	}

	//Two Pairs tiebreaker
	if (pHandString == "Two Pairs" && cHandString == "Two Pairs")
	{
		var pTP = [];
		var cTP = [];

		//Converts A, K, Q, J to numerical values and stores all 7 cards into array. 2 lowest are then removed
		for (var i = 0; i < 7; i++)
		{
			if(temppHand[i].Value == "A")
			{
				temppHand[i].Value = 14;
			}
			else if(temppHand[i].Value == "K")
			{
				temppHand[i].Value = 13;
			}
			else if(temppHand[i].Value == "Q")
			{
				temppHand[i].Value = 12;
			}
			else if(temppHand[i].Value == "J")
			{
				temppHand[i].Value = 11;
			}
		}
		for (var j = 0; j < 7; j++)
		{
			if(tempcHand[j].Value == "A")
			{
				tempcHand[j].Value = 14;
			}
			else if(tempcHand[j].Value == "K")
			{
				tempcHand[j].Value = 13;
			}
			else if(tempcHand[j].Value == "Q")
			{
				tempcHand[j].Value = 12;
			}
			else if(tempcHand[j].Value == "J")
			{
				tempchand[j].Value = 11;
			}
		}
		for (var x = 0; x < 7; x++)
		{
			pTP[x] = temppHand[x].Value;
			cTP[x] = tempcHand[x].Value;
		}
		pTP.sort(function(a, b){return a-b});
		cTP.sort(function(a, b){return a-b});
		
		var pTPTemp1 = 0;
		var pTPTemp2 = 0;
		var cTPTemp1 = 0;
		var cTPTemp2 = 0;

		for (var v = 0; v < pTP.length; v++)
		{
			for (var w = 1; w < pTP.length; w++)
			{
				if ((pTP[v] == pTP[w]))
				{
					pTPTemp1 = pTP[v];
					pTP.splice(v, 1);
					pTP.splice(w-1, 1);
					break;
				}
			}
		}
		for (var c = 0; c < pTP.length; c++)
		{
			for (var d = 1; d < pTP.length; d++)
			{
				if (pTP[c] == pTP[d])
				{
					pTPTemp2 = pTP[cOP];
					pTP.splice(c, 1);
					pTP.splice(d-1, 1);
					break;
				}
			}
		}
		for (var a = 0; a < cTP.length; a++)
		{
			for (var b = 1; b < cTP.length; b++)
			{
				if (cTP[a] == cTP[b])
				{
					cTPTemp1 = cTP[b];
					cTP.splice(a, 1);
					cTP.splice(b-1, 1);
					break;
				}
			}
		}
		for (var e = 0; e < cTP.length; e++)
		{
			for (var f = 1; f < cTP.length; f++)
			{
				if (cTP[e] == cTP[f])
				{
					cTPTemp2 = cTP[e];
					cTP.splice(e, 1);
					cTP.splice(f-1, 1);
					break;
				}
			}
		}

		pTP.splice(0, 2);
		cTP.splice(0, 2);

		if (pTPTemp1 > pTPTemp2)
		{
			pTP.push(pTPTemp2);
			pTP.push(pTPTemp1);
		}
		else
		{
			pTP.push(pTPTemp1);
			pTP.push(pTPTemp2);
		}

		if (cTPTemp1 > cTPTemp2)
		{
			cTP.push(cTPTemp2);
			cTP.push(cTPTemp1);
		}
		else
		{
			cTP.push(cTPTemp1);
			cTP.push(cTPTemp2);
		}


		//Compare the Two Pair value and Kickers. User w higher value wins. Split if they have same exact value
		for (var y = pTP.length - 1; y >= 0; y--)
		{
			if (pTP[y] > cTP[y])
			{
				tieResult = "Player wins!";
				break;
			}
			else if (pTP[y] < cTP[y])
			{
				tieResult = "Casino wins!";
				break;
			}
			else
			{
				tieResult = "Tie.";
			}
		}
	}

	//One Pair tiebreaker
	if (pHandString == "One Pair" && cHandString == "One Pair")
	{
		var pOP = [];
		var cOP = [];

		//Converts A, K, Q, J to numerical values and stores all 7 cards into array. 2 lowest are then removed
		for (var i = 0; i < 7; i++)
		{
			if(temppHand[i].Value == "A")
			{
				temppHand[i].Value = 14;
			}
			else if(temppHand[i].Value == "K")
			{
				temppHand[i].Value = 13;
			}
			else if(temppHand[i].Value == "Q")
			{
				temppHand[i].Value = 12;
			}
			else if(temppHand[i].Value == "J")
			{
				temppHand[i].Value = 11;
			}
		}
		for (var j = 0; j < 7; j++)
		{
			if(tempcHand[j].Value == "A")
			{
				tempcHand[j].Value = 14;
			}
			else if(tempcHand[j].Value == "K")
			{
				tempcHand[j].Value = 13;
			}
			else if(tempcHand[j].Value == "Q")
			{
				tempcHand[j].Value = 12;
			}
			else if(tempcHand[j].Value == "J")
			{
				tempchand[j].Value = 11;
			}
		}
		for (var x = 0; x < 7; x++)
		{
			pOP[x] = temppHand[x].Value;
			cOP[x] = tempcHand[x].Value;
		}
		pOP.sort(function(a, b){return a-b});
		cOP.sort(function(a, b){return a-b});
		var pOPTemp = 0;
		var cOPTemp = 0;

		for (var v = 0; v < pOP.length; v++)
		{
			for (var w = 1; w < pOP.length; w++)
			{
				if (pOP[v] == pOP[w])
				{
					pOPTemp = pOP[v];
					pOP.splice(v, 1);
					pOP.splice(w-1, 1);
					break;
				}
			}
		}
		for (var a = 0; cOP.length < 7; a++)
		{
			for (var b = 1; cOP.length < 7; b++)
			{
				if (cOP[a] == cOP[b])
				{
					cOPTemp = cOP[b];
					cOP.splice(a, 1);
					cOP.splice(b-1, 1);
					break;
				}
			}
		}

		pOP.splice(0, 2);
		cOP.splice(0, 2);
		pOP.push(pOPTemp);
		cOP.push(cOPTemp);


		//Compare the Pair value and Kickers. User w higher value wins. Split if they have same exact value
		for (var y = pOP.length - 1; y >= 0; y--)
		{
			if (pOP[y] > cOP[y])
			{
				tieResult = "Player wins!";
				break;
			}
			else if (pOP[y] < cOP[y])
			{
				tieResult = "Casino wins!";
				break;
			}
			else
			{
				tieResult = "Tie.";
			}
		}
	}

	//High Card tiebreaker
	if (pHandString == "High Card" && cHandString == "High Card")
	{
		var pHigh = [];
		var cHigh = [];

		//Converts A, K, Q, J to numerical values and stores all 7 cards into array. 2 lowest are then removed
		for (var i = 0; i < 7; i++)
		{
			if(temppHand[i].Value == "A")
			{
				temppHand[i].Value = 14;
			}
			else if(temppHand[i].Value == "K")
			{
				temppHand[i].Value = 13;
			}
			else if(temppHand[i].Value == "Q")
			{
				temppHand[i].Value = 12;
			}
			else if(temppHand[i].Value == "J")
			{
				temppHand[i].Value = 11;
			}
		}
		for (var j = 0; j < 7; j++)
		{
			if(tempcHand[j].Value == "A")
			{
				tempcHand[j].Value = 14;
			}
			else if(tempcHand[j].Value == "K")
			{
				tempcHand[j].Value = 13;
			}
			else if(tempcHand[j].Value == "Q")
			{
				tempcHand[j].Value = 12;
			}
			else if(tempcHand[j].Value == "J")
			{
				tempchand[j].Value = 11;
			}
		}
		for (var x = 0; x < 7; x++)
		{
			pHigh[x] = temppHand[x].Value;
			cHigh[x] = tempcHand[x].Value;
		}
		pHigh.sort(function(a, b){return b-a});
		cHigh.sort(function(a, b){return b-a});
		pHigh.splice(5,2);
		cHigh.splice(5,2);

		//Compare the High Card and Kickers. User w higher value wins. Split if they have same exact value
		for (var y = 0; y < pHigh.length; y++)
		{
			if (pHigh[y] > cHigh[y])
			{
				tieResult = "Player wins!";
				break;
			}
			else if (pHigh[y] < cHigh[y])
			{
				tieResult = "Casino wins!";
				break;
			}
			else
			{
				tieResult = "Tie.";
			}
		}
	}
	return tieResult;
}

var hand = [deck[3],deck[4],deck[5],deck[16],deck[17],deck[18],deck[19]];
console.log(hand);
var result = EvaluateHand(hand);
console.log("result is: ", result);	

module.exports = {
  EvaluateHand,
  checkOnePair,
  checkHighCard,
  checkThreeOfAKind,
  checkFourOfAKind,
  checkTwoPair,
  checkStraight,
  checkFlush,
  checkFullHouse,
  checkStraightFlush,
  updateSuitCounter,
  updateValueCounters,
  checkTie,
  EvaluateWinner
}

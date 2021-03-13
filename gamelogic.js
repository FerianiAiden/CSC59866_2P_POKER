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

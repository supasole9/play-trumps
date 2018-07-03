function card(value, name, suit, symbol){
	this.value = value;
	this.name = name;
	this.suit = suit;
	this.symbol = symbol;
	this.id = name+suit[0];
}

function deck(){
	this.names = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
	this.suits = ['Hearts','Diamonds','Spades','Clubs'];
	this.symbols = ['&hearts;', '&diams;', '&spades;', '&clubs;'];
	var cards = [];

    for( var s = 0; s < this.suits.length; s++ ) {
        for( var n = 0; n < this.names.length; n++ ) {
            cards.push( new card( n+1, this.names[n], this.suits[s], this.symbols[s] ) );
        }
    }
    return cards;
}

function shuffledDeck(Deck){
	for (var i = Deck.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = Deck[i];
			Deck[i] = Deck[j];
			Deck[j] = temp;
	}
	return Deck
}

function newDECK(){
	let nDeck = deck();
	return shuffledDeck(nDeck);
}

function gameid() {
  let string = "";
  let alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 6; i++) {
    string += alphabets.charAt(Math.floor(Math.random() * alphabets.length ));
  }
  return string
}

module.exports = {
	deck: newDECK,
  shuffle: shuffledDeck,
  gameId: gameid
}

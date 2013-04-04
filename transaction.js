function Transaction(bitcoins, highlight, currency, currencyName) {
	Floatable.call(this);

	this.area = bitcoins * 100 + 3000;
	this.width = this.height = Math.sqrt(this.area / Math.PI) * 2;

	this.addImage(bubbleImage, this.width, this.height);
	
	var bitcoinString = "&#3647;" + bitcoins.toFixed(2);
	
	if (bitcoinString == "&#3647;0.00")
	bitcoinString = "<&#3647;0.01";
	
	if (!highlight) {
		this.addText(bitcoinString);
	} else {
		this.addText('<span style="color: yellow;">' + bitcoinString + '</span><br /><span style="color: cyan;">Donation</span><br /><span style="color: lime;">Thanks!</span>');
	}
	if (currency && currencyName) {
		this.addText('<br />' + currency.toFixed(2) + ' ' + currencyName);
	}
	this.initPosition();

	// Sound
	var maxBitcoins = 1000;
	var minVolume = 0.3;
	var maxVolume = 0.5;
	var volume = bitcoins / (maxBitcoins / (maxVolume - minVolume)) + minVolume;
	if (volume > maxVolume)
		volume = maxVolume;
	Sound.playRandomAtVolume(volume * 100);
}

extend(Floatable, Transaction);

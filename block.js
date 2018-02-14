function Block(height, numTransactions, outputTotal, blockSize) {
	Floatable.call(this);

	var outputBTC = Math.floor(outputTotal) + " FTC";
	var blockSizeKB = Math.floor(blockSize / 1024) + " KB";
    //console.log("block.js: outputTotal: "+ outputTotal+" outputBTC: "+outputBTC);
	//this.width = this.height = 250;
    
    // limit the size of the bubble by limiting the coins used to calculate it's size
    if (outputTotal >= 1000) {
        outputTotal = 1000;
    }
    this.area = outputTotal * 200 + 3000;
	this.width = this.height = Math.sqrt(this.area / Math.PI) * 2;

	this.addText("Block " + height + "<br />Transactions: " + numTransactions + "<br /> Volume: " + outputBTC + "<br />Size: " + blockSizeKB);
    this.addImage(blockImage, this.width, this.height);
	this.initPosition();

	// Sound
	Sound.playRandomSwell();
}

extend(Floatable, Block);

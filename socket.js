var satoshi = 100000000;

var DELAY_CAP = 1000;

var lastBlockHeight = 0;

var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200){
                aCallback(anHttpRequest.responseText);
            }
            else {
                aCallback('result: '+anHttpRequest.status);
            }
        }

        anHttpRequest.open( "GET", aUrl, true );            
        anHttpRequest.send( null );
    }
}

function TransactionSocket() {

}

TransactionSocket.init = function() {
	// Terminate previous connection, if any
	if (socket)
		socket.close();

	if ('WebSocket' in window) {
        eventNewTx = 'tx';
        eventNewBlock = 'block';
        room = 'inv';
    
    
    var client = new HttpClient();
    var fsightServer = "http://wb2:3001/";
    
    var socket = io(fsightServer);
    console.log('connecting to fsight....');
	StatusBox.reconnecting("blockchain");
    
    
    socket.on('connect', function() {
      // Join the room.
        StatusBox.connected("blockchain");
        console.log('connected, joining room!');
        socket.emit('subscribe', room);
        toggleInterface();        
    })
		//var connection = new ReconnectingWebSocket('ws://ws.blockchain.info:8335/inv');
		//socket = connection;
           


		//socket.on('connect', function() {
		//	console.log('Fsight.tips: Connection open!');
		//	StatusBox.connected("blockchain");
		//	var newTransactions = {
		//		"op" : "unconfirmed_sub"
		//	};
		//	var newBlocks = {
		//		"op" : "blocks_sub"
		//	};
		//	connection.send(JSON.stringify(newTransactions));
		//	connection.send(JSON.stringify(newBlocks));
		//	connection.send(JSON.stringify({
		//		"op" : "ping_tx"
		//	}));
			// Display the latest transaction so the user sees something.
		//})

		socket.on ('close', function() {
            //show interface
            toggleInterface();
			console.log('Blockchain.info: Connection closed');
			if ($("#blockchainCheckBox").prop("checked"))
				StatusBox.reconnecting("blockchain");
			else
				StatusBox.closed("blockchain");
		})

		socket.on('error', function(error) {
			console.log('Blockchain.info: Connection Error: ' + error);
		})

        var transacted = 0;
        var transactions=0;
        var bitcoins=0;

		socket.on(eventNewTx, function(data) {
            console.log("txout: "+data.valueOut);

			// New Transaction

			transacted += data.valueOut;
            //console.log("transacted "+ transacted);
            transactions++;

            bitcoins = (transacted / satoshi);
				//console.log("Transaction: " + bitcoins + " FTC");

            var donation = false;
            var soundDonation = false;
  
				setTimeout(function() {
					new Transaction(data.valueOut);
				}, Math.random() * DELAY_CAP);
/*
    if (data.op == "block") {
				var blockHeight = data.x.height;
				var transactions = data.x.nTx;
				var volumeSent = data.x.estimatedBTCSent;
				var blockSize = data.x.size;
				// Filter out the orphaned blocks.
				if (blockHeight > lastBlockHeight) {
					lastBlockHeight = blockHeight;
					console.log("New Block");
					new Block(blockHeight, transactions, volumeSent, blockSize);
				}
			}
			*/
})
            socket.on(eventNewBlock, function(data) {
                console.log("newBlock "+data+" transacted: "+transacted);
                client.get(fsightServer+'insight-api/block/'+data, function(response) {
                    console.log ("Web: " +response);
                }) 
                new Block(response.height, transactions, transacted, response.size);
                transacted =0;
                transactions=0;
            })

	} else {
		//WebSockets are not supported.
		console.log("No websocket support.");
		StatusBox.nosupport("blockchain");
	}
}

TransactionSocket.close = function() {
	try {
		socket.close();
    }
    catch (error) {
        console.log("warn: close of socket failed");
    }
	StatusBox.closed("blockchain");
}
function TradeSocket() {

}

TradeSocket.init = function() {
	// Terminate previous connection, if any
	/*
     * if (socket)
		socket.close();

	if ('WebSocket' in window) {
		var connection = new ReconnectingWebSocket('ws://websocket.mtgox.com:80/mtgox');
		

		StatusBox.reconnecting("mtgox");

		connection.onopen = function() {
			console.log('Mt.Gox: Connection open!');
			StatusBox.connected("mtgox");
			
			var unsubDepth = {
				"op" : "unsubscribe",
				"channel" : "24e67e0d-1cad-4cc0-9e7a-f8523ef460fe"
			}
			
			connection.send(JSON.stringify(unsubDepth));
		}

		connection.onclose = function() {
			console.log('Mt.Gox: Connection closed');
			if ($("#mtgoxCheckBox").prop("checked"))
				StatusBox.reconnecting("mtgox");
			else
				StatusBox.closed("mtgox");
		}

		connection.onerror = function(error) {
			console.log('Mt.Gox: Connection Error: ' + error);
		}

		connection.onmessage = function(e) {
			var message = JSON.parse(e.data);
			//console.log(message);
			
			if (message.trade) {
				//console.log("Trade: " + message.trade.amount_int / satoshi + " BTC | " + (message.trade.price * message.trade.amount_int / satoshi) + " " + message.trade.price_currency);
				// 0.57 BTC | 42.75 USD

				var bitcoins = message.trade.amount_int / satoshi;
				var currency = (message.trade.price * message.trade.amount_int / satoshi);
				var currencyName = message.trade.price_currency;
				
				setTimeout(function() {
					new Transaction(bitcoins, false, currency, currencyName);
				}, Math.random() * DELAY_CAP);
			}
		}
	} else {
		//WebSockets are not supported.
		console.log("No websocket support.");
		StatusBox.nosupport("mtgox");
	}
	*/
}

TradeSocket.close = function() {
    /*
	if (socket)
		socket.close();
	StatusBox.closed("mtgox");
	*/
}

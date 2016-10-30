
// Assignments
// there are 2 main external accounts: A and B
// we can see the balance of the contract on the web page
// whenever someone sends ether to it, half of it goes to account A and the other half to account B
// we can see the balances of A and B on the web page
// we can send ether to it from the web page
// It would be even better if you could team up with different people impersonating A, B and the ether sender, all cooperating on the B9Lab blockchain.

function floatFormat( number, n ) {
	var _pow = Math.pow( 10 , n ) ;

	return Math.round( number * _pow ) / _pow ;
}

function getDiff(before, after){
  diff = after - before;
  return floatFormat(web3.fromWei(diff.toString(), "ether"), 1);
}

contract('Splitter', function(accounts) {
  it("splits to half", function(done) {
    var splitter;
    var sender = accounts[1];
    var receiver_A = accounts[2];
    var receiver_B = accounts[3];
    var ether = 1e18;
    var money = ether * 10; // 10 Ether
    var gas = 21000;
    var balances = {}
    Splitter.new(receiver_A, receiver_B).
      then(function(_s) {
        splitter = _s;
        balances.sender = web3.eth.getBalance(sender);
        balances.receiver_A = web3.eth.getBalance(receiver_A);
        balances.receiver_B = web3.eth.getBalance(receiver_B);
        return splitter.split({from:sender, value:money})
      }).
      then(function() {
        var senderDiff =    getDiff(balances.sender, web3.eth.getBalance(sender));
        var receiverADiff = getDiff(balances.receiver_A, web3.eth.getBalance(receiver_A));
        var receiverBDiff = getDiff(balances.receiver_B, web3.eth.getBalance(receiver_B));
        assert.equal(senderDiff, -10);
        assert.equal(receiverADiff, 5);
        assert.equal(receiverBDiff, 5);
      }).then(done);
  });
});

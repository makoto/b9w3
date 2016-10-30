var accounts;
var sender;
var account_a;
var account_b;
var contract;

function setStatus(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
};

function refresh(){
  $('#contract-balance').text(web3.eth.getBalance(contract.address))
  $('#sender').text(web3.eth.getBalance(sender))
  $('#account-a').text(web3.eth.getBalance(account_a))
  $('#account-b').text(web3.eth.getBalance(account_b))
}

function split() {
  contract.split({from: sender, value:parseInt(amount.value)}).then(function() {
    refresh();
  }).catch(function(e) {
    setStatus("Error sending coin; see log.");
  });
};

window.onload = function() {
  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    accounts = accs;
    sender = accounts[0];
    account_a = web3.eth.accounts[1];
    account_b = web3.eth.accounts[2];
    contract = Splitter.deployed()

    refresh()
  });
}

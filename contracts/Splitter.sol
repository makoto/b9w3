pragma solidity ^0.4.2;

contract Splitter {
	address public splitA;
	address public splitB;
	uint share;
	function Splitter(address a, address b) {
		splitA = a;
		splitB = b;
	}

	function split() payable{
		share = this.balance / uint(2);
		if(!splitA.send(share)) throw;
		if(!splitB.send(share)) throw;
	}
}

// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.4.22 <0.9.0;
import "remix_tests.sol"; // this import is automatically injected by Remix.
import "remix_accounts.sol";
import "../github/FerianiAiden/CSC59866_2P_POKER/2pPoker.sol";

// Inherit 'Poker' contract
/// #value: 2
contract 2pPokertest is Poker{

    /// Define variables referring to different accounts
    address acc1; // player 1
    address acc2; // player 2

    /// Initiate accounts variable
    function beforeAll() public {
        acc1 = TestsAccounts.getAccount(1);
        acc2 = TestsAccounts.getAccount(2);
    }

    // Account 1 creates a new contract.
    // Tests if initialized balance is correct
    /// #sender: account-1
    /// #value: 3
    function testContractCreated() public payable {
        Assert.equal(msg.sender, acc1, 'acc1 should be the sender of this function check');
        Assert.equal(msg.value, 3, '2 should be the value of this function check');
        constructor();
        Assert.equal(getBalance(), msg.value, 'balance of contract should be 3');
    }

    // Account 1 starts a game with 1 wei and submits a choice of 0.
    // Tests if player choice is commited correctly and if the balance of the contract increased.
    /// #sender: account-1
    /// #value: 1
    function testPlayer1Commit() public payable {
        Assert.equal(msg.sender, acc1, 'acc1 should be the sender of this function check');
        Assert.equal(msg.value, 1, '1 should be the value of this function check');
        uint init_balance = getBalance();
        getP1Commitment();
        Assert.equal(get_balance(), init_balance + 1, 'Balance of contract should be 4');
    }

    // Account 2 starts a game with 1 wei and submits a choice of 1.
    // Tests if player choice is commited correctly and if the balance of the contract increased.
    /// #sender: account-2
    /// #value: 1
    function testPlayer2Commit() public payable {
        Assert.equal(msg.sender, acc2, 'acc2 should be the sender of this function check');
        Assert.equal(msg.value, 1, '1 should be the value of this function check');
        uint init_balance = getBalance();
        joinGame();
        getP2Commitment();
        Assert.equal(get_balance(), init_balance + 1, 'Balance of contract should be 5');
    }

    //Balance
    function checkBalance() public {
        Assert.equal(getBalance(), 5, "Balance should be 5 now");
    }


    //funds transferred to casino
    function testLeaveGame() public {
        leaveGame();
        Assert.equal(msg.sender, acc1, 'acc1 should be the sender of this function check');
        Assert.equal(getBalance(), 5, "Balance should be 7 now");
    }

    //tests Fold and restartGame functions
    function testFold() public{
        Fold();
        Assert.equal(getBalance(), 0, "Balance should be 0 now");
    }

}

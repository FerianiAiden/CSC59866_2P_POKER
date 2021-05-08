// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.7.4;
import "remix_tests.sol"; // this import is automatically injected by Remix.
import "remix_accounts.sol";
import "../github/FerianiAiden/CSC59866_2P_POKER/mainpagee/bot/2pPoker.sol";
pragma experimental ABIEncoderV2;

// File name has to end with '_test.sol', this file can contain more than one testSuite contracts
contract PokerTest is Poker{


    Poker instance;

    // Define variables referring to different accounts
    address acc0; // player 1
    address acc1; // player 2

    function beforeEach() public {
        // Create an instance of contract to be tested
        instance = new Poker();
    }


    // Initiate accounts variable
    function beforeAll() public {
        acc0 = TestsAccounts.getAccount(0);
        acc1 = TestsAccounts.getAccount(1);
    }

    // Account 0 creates a new contract.
    // Tests if initialized balance is correct
    /// #sender: account-0
    /// #value: 3
    function testContractCreated() public payable {
        Assert.equal(msg.sender, acc0, "Player 1 should be the sender of this function check");
        Assert.equal(msg.value, 3, "2 should be the value of this function check");
        instance.setBigBlind();
        Assert.equal(instance.getBalance(), msg.value, "balance of contract should be 3");
    }

    // Account 0 starts a game with 1 wei and submits a choice of 0.
    // Tests if player choice is commited correctly and if the balance of the contract increased.
    /// #sender: account-0
    /// #value: 1
    function testPlayer1Commit() public payable {
        Assert.equal(msg.sender, acc0, "acc0 should be the sender of this function check");
        Assert.equal(msg.value, 1, '1 should be the value of this function check');
        uint init_balance = instance.getBalance();
        getP1Commitment();


        Assert.equal(instance.getBalance(), init_balance + 1, 'Balance of contract should be 4');
    }

    // Account 1 starts a game with 1 wei and submits a choice of 1.
    // Tests if player choice is commited correctly and if the balance of the contract increased.
    /// #sender: account-1
    /// #value: 1
    function testPlayer2Commit() public payable {
        Assert.equal(msg.sender, acc1, 'acc1 should be the sender of this function check');
        Assert.equal(msg.value, 1, '1 should be the value of this function check');
        uint init_balance = instance.getBalance();
        getP2Commitment();

        Assert.equal(instance.getBalance(), init_balance + 1, 'Balance of contract should be 5');
    }

    //Balance
    function checkBalance() public {
        Assert.equal(instance.getBalance(), 5, "Balance should be 5 now");
    }


    //funds transferred to casino
    function testLeaveGame() public {
        leaveGame();
        Assert.equal(msg.sender, acc0, 'acc0 should be the sender of this function check');
        Assert.equal(instance.getBalance(), 0, "Balance should be 0 now");
    }

    //tests Fold and restartGame functions
    function testFold() public{
        Fold();
        Assert.equal(instance.getBalance(), 0, "Balance should be 0 now");
    }
}

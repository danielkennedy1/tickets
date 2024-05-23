// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Tickets is IERC20 {

    // Event details
    string public name;
    address public organiser;
    uint256 public override totalSupply;
    bool public ticketsForSale;
    uint public TICKET_PRICE = 100 wei;
    address public usher;

    mapping(address => uint256) public balances; // Store how much each address has, public so it's easy to see who has a ticket
    mapping(address => mapping(address => uint256)) public allowed; // For ERC20 allowance


    constructor(string memory _name, uint _initialSupply, address _usher) {
        organiser = msg.sender;
        name = _name;
        totalSupply = _initialSupply;
        usher = _usher;

        // Give all the tickets to the organiser
        balances[organiser] = _initialSupply;
        emit Transfer(address(0), organiser, _initialSupply);

        // Allow contract to tranfer tickets on owner's behalf
        allowed[organiser][address(this)] = totalSupply;

        // Set the sale to be on
        ticketsForSale = true;
    }

    // ERC20: Check how many tickets an address has
    function balanceOf(address account) public view returns (uint256) {
        return balances[account];
    }

    // ERC20: Move amount tickets from caller to recipient
    function transfer(address recipient, uint256 amount) public returns (bool) {
        require(balances[msg.sender] >= amount, "Not enough tickets");
        balances[msg.sender] -= amount;
        balances[recipient] += amount;
        emit Transfer(msg.sender, recipient, amount);
        return true;
    }

    // ERC20: Allow spender to transferFrom amount tickets on caller's behalf
    function approve(address spender, uint256 amount) public returns (bool) {
        allowed[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    // ERC20: Get the number of tickets that spender is allowed to transferFrom on owner's behalf
    function allowance(address owner, address spender) public view returns (uint256) {
        return allowed[owner][spender];
    }

    // ERC20: Move amount tickets from sender to recipient if caller has enough allowance to do so
    function transferFrom(address sender, address recipient, uint256 amount) public returns (bool) {
        require(amount <= balances[sender], "Insufficient balance");
        require(amount <= allowed[sender][msg.sender], "Insufficient allowance");
        
        balances[sender] -= amount;
        allowed[sender][msg.sender] -= amount;
        balances[recipient] += amount;
        emit Transfer(sender, recipient, amount);
        return true;
    }

    // Additional functions such as buying tickets or refunding
    function buyTickets(address buyer, uint256 amount) public payable {
        require(msg.value == amount * TICKET_PRICE, "Incorrect amount sent, check ticket price");
        require(balances[organiser] >= amount, "Not enough tickets available, check availability");
        require(ticketsForSale, "Event over, tickets are no longer for sale");

        balances[organiser] -= amount;
        balances[buyer] += amount;
        
        emit Transfer(organiser, buyer, amount);
    }

    // Called by patron to refund their ticket
    function refundTickets(uint256 amount) public {
        require(ticketsForSale, "Event over, tickets are no longer refundable");
        require(balances[msg.sender] >= amount, "Refund amount requested exceeds balance");

        balances[msg.sender] -= amount;
        balances[organiser] += amount;

        payable(msg.sender).transfer(amount * TICKET_PRICE);
    }

    // Called by organiser to end the event, and take funds
    function endSale() public {
        require(msg.sender == organiser, "Only organiser can end sale");

        uint amount = address(this).balance;
        // Ensure there are funds in the contract before proceeding
        require(amount > 0, "No funds available");

        payable(organiser).transfer(amount);

        ticketsForSale = false;
    }

    // Called by usher to take tickets from patron, admitting them to the event
    // Contract address is essentially a burn wallet
    function acceptTickets(address patron, uint256 amount) public {
        require(msg.sender == usher, "Only Usher can accept tickets");
        require(balances[patron] >= amount, "Patron must have the required numnber of tickets");

        balances[patron] -= amount;
        balances[address(this)] += amount;

        emit Transfer(patron, address(this), amount);
    }
}
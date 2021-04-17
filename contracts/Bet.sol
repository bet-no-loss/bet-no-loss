// SPDX-License-Identifier: MIT
pragma solidity 0.8.3;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./OracleInterface.sol";

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
/** 
 * This Ethereum smart-contract takes bets placed on sport events.  
 * It then invests all bets deposits for a given event (pot) in DeFi.  
 * Then once the event outcome is confirmed,
 * it makes the accrued interests ready for the winners 
 * to withdraw proportionnaly to their initial stake.  
 * Players do not loose their stake.
 *
 * @notice Takes bets and handles payouts for sport events
 * @title  a Smart-Contract in charge of handling bets on a sport event outcome where players do not loose their stake and winners earn the interests accrued on the stakes.
 * @author Tanteli, block74 
 */
contract Bet is Ownable, ReentrancyGuard {

    /**
     * @dev An instance of ERC20 DAI Token
     */
     IERC20 Dai;

     address private _owner;

    /** 
     * @dev list of all bets per player, ie. a map composed (player address => bet id) pairs
     */
    mapping(address => bytes32[]) private userToBets;

    /**
     *  @dev for any given event, get a list of all bets that have been made for that event
     *    map composed of (event id => array of bets) pairs
     */
    mapping(bytes32 => Bet[]) private eventToBets;

    /** 
     * @dev Address of the sport events Oracle
     */
    address internal oracleAddress = address(0);

    /**
     *  @dev Instance of the sport events Oracle (used to register sport events get their outcome).
     */
    OracleInterface internal betOracle = OracleInterface(oracleAddress); 

    /**
     * @dev minimum bet amount 
     */
    uint internal minimumBet = 0.1 ether;

    /**
     * @dev payload of a bet on a sport event
     */
    struct Bet {
        address user;          // who placed it
        bytes32 eventId;       // id of the sport event as registered in the Oracle
        uint    amount;        // bet amount
        uint8   chosenWinner;  // Index of the team that will win according to the player
    }

    /**
     * @dev Possible outcomes for a sport event
     */
    enum BettableOutcome {
        Team1,
        Team2
    }

    /**
     * @dev check that the passed in address is not 0. 
     */
    modifier notAddress0(address _address) {
        require(_address != address(0), "Address 0 is not allowed");
        _;
    }

    /**
     * @dev Sent once the Sport Event Oracle is set
     */
    event OracleAddressSet( address _address);

    /**
     * @dev Sent when once a bet is placed
     */
    event BetPlaced(
            bytes32 _eventId,
            address _player,
            uint8   _chosenWinner, 
            uint    _amount
    );

    /**
     * @param _tokenAddress the address of the deployed ERC20 DAI token 
     */
     constructor(address _tokenAddress) {
        require(_tokenAddress != address(0), "Address 0 is not allowed");
        Dai = IERC20(_tokenAddress);
        _owner = msg.sender;
    }

     /**
      * @return the DAI balance of the contract
      */
      function getContractDAIBalance() public view returns (uint) {
          return Dai.balanceOf(address(this));
      }

      /**
      * @notice Moves `_amount` tokens from `_sender` to this contract
      * @param _sender the address that owns  the tokens
      * @param _amount the amount to be deposited
      */
      function deposit(address _sender, uint _amount)
            external 
            notAddress0(_sender) 
    {
        // At least a minimum amount is required to be deposited
        require(_amount >= 10, "Amount deposited must be >= 10");
        Dai.transferFrom(_sender, address(this), _amount);
    }

    /**
      * @notice Sets `_amount` as the allowance of `_spender` over the caller's tokens.
      * @param _spender an address allowed to spend user's DAI
      * @param _amount the amount approved to be used by _spender
      */
      function approve(address _spender, uint _amount)
         external 
         notAddress0(_spender) 
    {
        Dai.approve(_spender, _amount);
    }

    /**
     * @notice sets the address of the sport event bet oracle contract to use 
     * @dev setting a wrong address may result in false return value, or error 
     * @param _oracleAddress the address of the sport event bet oracle 
     */
    function setOracleAddress(address _oracleAddress)
        external 
        onlyOwner notAddress0(_oracleAddress)
        returns (bool)
    {
        oracleAddress = _oracleAddress;
        betOracle = OracleInterface(oracleAddress);
        emit OracleAddressSet(oracleAddress);
        
        return betOracle.testConnection();
    }

    /**
     * @notice for testing purposes: make sure that the sport event oracle is callable 
     */
    function testOracleConnection() 
        public view returns (bool)
    {
        return betOracle.testConnection(); 
    }

   /**
     * @return the address of the oracle we use to get the sport events and their outcomes
     */
    function getOracleAddress() 
        external view returns (address)
    {
        return oracleAddress;
    }
 
    /**
     * @notice determines whether or not the user has already bet on the given sport event
     * @param _user address of a player
     * @param _eventId id of a event 
     * @param _chosenWinner the index of the participant to bet on (to win)
     */
    function _betIsValid(address _user, bytes32 _eventId, uint8 _chosenWinner)
        private pure returns (bool)
    {
        // if (userToBets[_user].length == 0) {
        //     userToBets[_user]
        // }
        return true;
    }

    /**
     * @notice determines whether or not bets may still be accepted for the given match
     * @param _eventId id of an event 
     */
    function _eventOpenForBetting(bytes32 _eventId)
        private pure returns (bool)
    {
        return true;
    }

    /**
     * @notice gets a list ids of all currently bettable events
     * @return pendingEvents the list of pending sport events 
     */
    function getBettableEvents()
        public view returns (bytes32[] memory pendingEvents)
    {
        return betOracle.getPendingEvents(); 
    }

    /**
     * @notice returns the full data of the specified event 
     * @param _eventId the id of the desired event
     * @return id   the id of the event
     * @return name the name of the event 
     * @return participants a string with the name of the event's participants separated with a pipe symbol ('|')
     * @return participantCount the number of the event's participants
     * @return date when the event takes place
     * @return outcome an integer that represents the event outcome
     * @return winner the index of the winner
     */
    function getEvent(bytes32 _eventId)
        public view returns (
            bytes32                   id,
            string memory             name, 
            string memory             participants,
            uint8                     participantCount,
            uint                      date, 
            OracleInterface.EventOutcome outcome, 
            int8                      winner
        )
    { 
        return betOracle.getEvent(_eventId); 
    }

    /**
     * @notice returns the full data of the most recent bettable sport event 
     * @return id   the id of the event
     * @return name the name of the event 
     * @return participants the name of the event's participants separated with a pipe symbol ('|')
     * @return participantCount the number of the event's participants
     * @return date when the event takes place
     * @return outcome an integer that represents the event outcome
     * @return winner the index of the winner (0 = TeamA, 1 = TeamB)
     */
    function getLatestEvent() 
        public view returns (
            bytes32                      id,
            string memory                name, 
            string memory                participants,
            uint                         participantCount, 
            uint                         date, 
            OracleInterface.EventOutcome outcome, 
            int8                         winner
        )
    { 
        return betOracle.getLatestEvent(true); 
    }

    /**
     * @notice places a bet on the given event 
     * @param _eventId      id of the sport event on which to bet 
     * @param _chosenWinner index of the supposed winner team
     */
    function placeBet(bytes32 _eventId, uint8 _chosenWinner) 
        public payable
        notAddress0(msg.sender) 
        nonReentrant
    {
        // At least a minimum amout is required to bet
        require(msg.value >= minimumBet, "Bet amount must be >= minimum bet");

        // // Make sure this is sport event exists (ie. already registered in the Oracle)
        require(betOracle.eventExists(_eventId), "Specified event not found"); 

        // The chosen winner must fall within the defined number of participants for this event
        require(_betIsValid(msg.sender, _eventId, _chosenWinner), "Bet is not valid");

        // Event must still be open for betting
        require(_eventOpenForBetting(_eventId), "Event not open for betting"); 


        // transfer the player's money into the contract's account 
        payable(address(this)).transfer(msg.value);

        // add the new bet 
        Bet[] storage bets = eventToBets[_eventId]; 
        bets.push( Bet(msg.sender, _eventId, msg.value, _chosenWinner)); 

        // add the mapping
        bytes32[] storage userBets = userToBets[msg.sender]; 
        userBets.push(_eventId);

        emit BetPlaced(
            _eventId,
            msg.sender,      // player
            _chosenWinner, 
            msg.value        // bet amount
        );
    }

    /**
     *  @notice A fallback function that allows this smart-contract to accept DAI ERC20 token
     */
    receive() external payable {
    }
}
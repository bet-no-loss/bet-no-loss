pragma solidity 0.8.3;

contract ipfsImage {
    string iHash;

    // write function
    function set(string memory _iHash) public{
        iHash = _iHash;
    }

    // Read function
    function get() public view returns (string memory){
        return iHash;
    }
}
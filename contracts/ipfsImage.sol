// SPDX-License-Identifier: MIT
pragma solidity 0.8.3;

/**
 * @notice TODO (one-liner short description)
 * @title TODO TODO: description
 * @author Lebeil
 */
contract ipfsImage {

    /**
     * @dev The IPFS image Hash of this image
     */
    string iHash;

    /**
     * @notice Write function: Set the passed in IPFS hash for this image
     * @param _iHash the IPFS hash of this image (as a string)
     */
    function set(string memory _iHash) 
        public 
    {
        iHash = _iHash;
    }

    /**
     * @notice Read Function: Get the IPFS Hash of this image
     * @return the IPFS hash of the image (as a string)
     */
    function get() 
        public view 
        returns (string memory)
    {
        return iHash;
    }
}
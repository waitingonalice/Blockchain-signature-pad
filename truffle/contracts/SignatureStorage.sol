// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SignatureStorage {
    string storedSignature;

    function get() public view returns (string memory) {
        return storedSignature;
    }

    function set(string memory newValue) public {
        storedSignature = newValue;
    }
}

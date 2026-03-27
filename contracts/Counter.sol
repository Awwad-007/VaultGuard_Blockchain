// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20; // Added the version here

contract Counter {
    uint public x;

    event Increment(uint value); // Added semi-colon

    function inc() public {
        x++;
        emit Increment(x);
    }

    function incBy(uint by) public {
        require(by > 0, "Must be greater than 0"); // Fixed the require syntax
        x += by;
        emit Increment(x);
    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract IncidentVault {
    uint256 public totalIncidents;
    address public admin;

    // This records WHO reported it and WHEN
    event IncidentReported(address indexed reporter, uint256 timestamp);

    constructor() {
        admin = msg.sender;
    }

    // This is your "Increment" function, but with meaning
    function reportIncident() public {
        totalIncidents++;
        emit IncidentReported(msg.sender, block.timestamp);
    }
}
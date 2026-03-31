// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract IncidentVault {
    uint256 public totalIncidents;
    address public admin;

    event IncidentReported(address indexed reporter, uint256 timestamp);

    constructor() {
        admin = msg.sender;
    }

    function reportIncident() public {
        totalIncidents += 1;
        emit IncidentReported(msg.sender, block.timestamp);
    }
}
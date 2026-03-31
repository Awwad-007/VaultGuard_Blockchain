import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("CounterModule", (m) => {
  // CHANGE THIS: "Counter" -> "IncidentVault"
  const counter = m.contract("IncidentVault"); 

  return { counter };
});
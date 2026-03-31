const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; 
const abi = [
    "function totalIncidents() public view returns (uint256)",
    "function reportIncident() public"
];

let provider;
let signer;
let contract;

async function init() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            // 1. Connect to MetaMask
            provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            signer = provider.getSigner();
            
            // 2. Initialize Contract
            contract = new ethers.Contract(contractAddress, abi, signer);
            
            document.getElementById('status').innerText = "Connected to Wallet";
            updateCount();
        } catch (error) {
            console.error("Connection failed", error);
            document.getElementById('status').innerText = "Connection Failed";
        }
    } else {
        document.getElementById('status').innerText = "Please install MetaMask!";
    }
}

async function updateCount() {
    try {
        const count = await contract.totalIncidents();
        document.getElementById('count').innerText = count.toString();
    } catch (err) {
        console.error("Error reading count:", err);
    }
}

document.getElementById('reportBtn').onclick = async () => {
    try {
        const tx = await contract.reportIncident();
        document.getElementById('status').innerText = "Reporting incident...";
        await tx.wait(); // Wait for block confirmation
        document.getElementById('status').innerText = "Incident Logged!";
        updateCount();
    } catch (err) {
        console.error("Transaction failed:", err);
        document.getElementById('status').innerText = "Transaction Cancelled";
    }
};

window.onload = init;
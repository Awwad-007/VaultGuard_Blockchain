const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
let contract;
let signer;

async function init() {
    if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        
        // This pulls the ABI from your local file
        const response = await fetch('./abi.json');
        const abi = await response.json();

        // Connect to the contract
        contract = new ethers.Contract(contractAddress, abi, provider);
        
        updateCount();
    } else {
        document.getElementById('status').innerText = "Please install MetaMask!";
    }
}

async function updateCount() {
    const count = await contract.totalIncidents(); // Or totalIncidents() if you renamed it
    document.getElementById('count').innerText = count.toString();
}

document.getElementById('reportBtn').onclick = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []); // Pops up MetaMask
    const signer = provider.getSigner();
    const contractWithSigner = contract.connect(signer);
    
    const tx = await contractWithSigner.inc(); // Calls your function
    document.getElementById('status').innerText = "Mining... ⛏️";
    await tx.wait();
    document.getElementById('status').innerText = "Incident Logged! ✅";
    updateCount();
};

init();
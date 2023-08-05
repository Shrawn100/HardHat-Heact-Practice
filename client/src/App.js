import { useState, useEffect } from "react";
import { ethers } from "ethers";

function App() {
  const [depositValue, setDepositValue] = useState();
  const [withdrawValue, setWithdrawValue] = useState();
  const [contractBalance, setContractBalance] = useState();
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  // The ERC-20 Contract ABI, which is a common contract interface
  // for tokens (this is the Human-Readable ABI format)
  const ABI = [
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_unlockTime",
          type: "uint256",
        },
      ],
      stateMutability: "payable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "when",
          type: "uint256",
        },
      ],
      name: "Withdrawal",
      type: "event",
    },
    {
      inputs: [],
      name: "deposit",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address payable",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "unlockTime",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "withdraw",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  // The Contract object
  const TokenContract = new ethers.Contract(contractAddress, ABI, signer);

  useEffect(() => {
    const connectWallet = async () => {
      await provider.send("eth_requestAccounts", []);
    };

    const getBalance = async () => {
      const balance = await provider.getBalance(contractAddress);
      setContractBalance(ethers.utils.formatEther(balance));
    };
    connectWallet().catch(console.error);
    getBalance().catch(console.error);
  }, []);
  let handleDepositChange = (e) => {
    setDepositValue(e.target.value);
  };
  let handleWithdrawChange = (e) => {
    setWithdrawValue(e.target.value);
  };

  let handleDepositSubmit = async (e) => {
    e.preventDefault();
    const ethValue = ethers.utils.parseEther(depositValue);
    const depositUpdate = await TokenContract.deposit({ value: ethValue });
    await depositUpdate.wait();
    setDepositValue();
    const balance = await provider.getBalance(contractAddress);
    setContractBalance(ethers.utils.formatEther(balance));
  };
  let handleWithdrawSubmit = async (e) => {
    e.preventDefault(withdrawValue);
    const withdrawUpdate = await TokenContract.withdraw();
    await withdrawUpdate.wait();
    setWithdrawValue();
    const balance = await provider.getBalance(contractAddress);
    setContractBalance(ethers.utils.formatEther(balance));
  };
  return (
    <div className="container">
      <div className="container text-center">
        <div className="row mt-5">
          <div className="col">
            <h1>Greetings</h1>
            <p>Contract balance: {contractBalance} ETH</p>
          </div>
          <div className="col">
            <form onSubmit={handleDepositSubmit}>
              <div className="mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="0"
                  value={depositValue}
                  onChange={handleDepositChange}
                />
              </div>
              <button type="submit" className="btn btn-success">
                Deposit
              </button>
            </form>
            <form onSubmit={handleWithdrawSubmit} className="mt-5">
              <div className="mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="0"
                  value={withdrawValue}
                  onChange={handleWithdrawChange}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Withdraw
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

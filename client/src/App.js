import { useState, useEffect } from "react";
import { ethers } from "ethers";

function App() {
  const [depositValue, setDepositValue] = useState(0);
  const [withdrawValue, setWithdrawValue] = useState(0);
  const [contractBalance, setContractBalance] = useState();
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

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
    console.log(depositValue);
  };
  let handleWithdrawSubmit = async (e) => {
    e.preventDefault(withdrawValue);
    console.log(withdrawValue);
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
                  placeholder="Hello world"
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

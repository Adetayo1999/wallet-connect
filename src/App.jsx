import { useState, useEffect } from "react";
import { providers, utils } from "ethers";
import Web3Modal from "web3modal";
import Header from "components/Header";
import Home from "components/Home";
import { Auth } from "auth";
import { useTheme } from "context";

function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [connectedAddress, setConnectedAddress] = useState(null);
  const [connectedAddressBalance, setConnectedAddressBalance] = useState(null);
  const [connectedNetwork, setConnectedNetwork] = useState(null);
  const [{ darkMode }] = useTheme();

  const getProviderOrSigner = async (needSigner = false) => {
    const web3modal = new Web3Modal({
      network: "rinkeby",
      cacheProvider: true,
      providerOptions: {},
    });
    const provider = await web3modal.connect();

    const web3Provider = new providers.Web3Provider(provider);

    const { name, chainId } = await web3Provider.getNetwork();
    setConnectedNetwork(name);
    if (chainId !== 4) {
      alert("Rinkeby Network Only");
      throw new Error("Connect To A Rinkeby Network");
    }

    if (needSigner) return web3Provider.getSigner();

    return web3Provider;
  };

  const connectWallet = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const [address, balance] = await Promise.all([
        signer.getAddress(),
        signer.getBalance(),
      ]);
      setConnectedAddress(address);
      setConnectedAddressBalance(utils.formatEther(balance));
      setWalletConnected(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (!walletConnected) {
      connectWallet();
    }
  });

  useEffect(() => {
    const handleAccountChange = (accounts) => {
      console.log(accounts);

      if (accounts.length === 0) {
        Auth.clearInjected(() => {
          setWalletConnected(false);
        });
      } else {
        connectWallet();
      }
    };
    window.ethereum.on("accountsChanged", handleAccountChange);
    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountChange);
    };
  });

  return (
    <div
      className={` ${
        darkMode === "dark"
          ? "bg-gray-900  text-gray-50"
          : "bg-gray-50 text-gray-900"
      }  transition `}
    >
      <Header
        address={connectedAddress}
        balance={connectedAddressBalance}
        network={connectedNetwork}
        walletConnected={walletConnected}
      />
      <Home connectWallet={connectWallet} />
    </div>
  );
}

export default App;

import { Auth } from "auth";
import React from "react";

function Home({ connectWallet }) {
  return (
    <div className="min-h-screen flex justify-center items-center">
      {!Auth.isInjected() && (
        <button
          onClick={connectWallet}
          className="bg-blue-600 text-gray-50 p-5 rounded hover:bg-blue-700"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}

export default Home;

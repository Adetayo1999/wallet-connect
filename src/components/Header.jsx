import { Auth } from "auth";
import { useTheme } from "context";
import React from "react";
import { truncateString } from "utils";
import Mode from "./Mode";

function Header({ network, address, balance, walletConnected }) {
  const [{ darkMode }] = useTheme();
  return (
    <div className="flex justify-between items-center w-full fixed py-5">
      <div className="w-[90%] mx-auto flex justify-between items-center">
        <h3>Connect DAPP</h3>
        <div className="flex items-center transition">
          {Auth.isInjected() && walletConnected && (
            <>
              <p
                className={`${
                  darkMode === "dark" ? "bg-gray-800" : "bg-gray-200"
                } py-2 px-3 mr-4 rounded-md`}
              >
                {network}
              </p>
              <div
                className={`flex justify-center items-center ${
                  darkMode === "dark" ? "bg-gray-800" : "bg-gray-200"
                } p-1 rounded-md `}
              >
                <span className="py-1 px-3 mr-1">
                  {Number(balance).toFixed(3)}ETH
                </span>
                <p
                  className={`"py-1 px-3 ${
                    darkMode === "dark" ? "bg-gray-700" : "bg-gray-100"
                  } rounded-md`}
                >
                  {truncateString(address)}
                </p>
              </div>
            </>
          )}
          <div className="mx-2"></div>
          <Mode />
        </div>
      </div>
    </div>
  );
}

export default Header;

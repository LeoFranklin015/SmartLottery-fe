import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";

const Header = () => {
  const { enableWeb3, account, isWeb3Enabled } = useMoralis();
  useEffect(() => {
    console.log(isWeb3Enabled);
  }, [isWeb3Enabled]);
  return (
    <div>
      {account ? (
        <h6>
          Connected to {account.slice(0, 6)}...
          {account.slice(account.slice.length - 4)}
        </h6>
      ) : (
        <button
          onClick={async () => {
            await enableWeb3();
          }}
        >
          Connect
        </button>
      )}
    </div>
  );
};

export default Header;

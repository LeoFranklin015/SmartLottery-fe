import { ConnectButton } from "web3uikit";

import React from "react";

const Connect = () => {
  return (
    <div>
      <div class="p-5  border-b-4 flex flex-row">
        <h1 class="px-4 py-4 font-bold text-2xl justify-center">
          Decentralized Lottery 💰
        </h1>

        <div class="ml-auto px-4 py-4">
          {" "}
          <ConnectButton />
        </div>
      </div>
    </div>
  );
};

export default Connect;

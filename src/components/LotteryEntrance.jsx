import React from "react";
import { Button } from "web3uikit";
import { useWeb3Contract } from "react-moralis";
const LotteryEntrance = () => {
  //   const { runContractFunction: enterRaffle } = useWeb3Contract({
  //     abi://,
  //     contractAddress: //,
  //     functionName : //,
  //     params :{},
  //     msgValue: //,
  //   });
  return (
    <div>
      <Button>Enter Lottery</Button>
    </div>
  );
};

export default LotteryEntrance;

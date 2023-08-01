import React, { useEffect, useState } from "react";
import { Button } from "web3uikit";
import { useWeb3Contract } from "react-moralis";
import abi from "../constants/abi.json";
import contractAddress from "../constants/contractAddress.json";
import console from "console-browserify";
// import { abi, contractAddress } from "../constants/index";
import { useMoralis } from "react-moralis";
import { ethers } from "ethers";
import { useNotification } from "web3uikit";

const LotteryEntrance = () => {
  const [entranceFee, setentranceFee] = useState("0");
  const [noOfPlayers, setnoOfPlayers] = useState("0");
  const [RecentWinner, setRecentWinner] = useState("0");
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const raffleAddress =
    chainId in contractAddress ? contractAddress[chainId][0] : null;
  const {
    runContractFunction: enterRaffle,
    isLoading,
    isFetching,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "enterRaffle",
    params: {},
    msgValue: entranceFee,
  });

  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "getEntranceFee",
    params: {},
  });

  const { runContractFunction: getRecentWinner } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "getRecentWinner",
    params: {},
  });
  const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "getNumberOfPlayers",
    params: {},
  });
  const dispatch = useNotification();
  const update = async () => {
    const fee = await getEntranceFee();
    const numplayer = await getNumberOfPlayers();
    const recentWinner = await getRecentWinner();
    setentranceFee(fee.toString());
    setnoOfPlayers(numplayer.toString());
    setRecentWinner(recentWinner);
  };
  useEffect(() => {
    if (isWeb3Enabled) {
      update();
    }
  }, [isWeb3Enabled]);

  const enterLottery = async () => {
    await enterRaffle({
      onSuccess: handleSuccess,
      onError: (error) => console.log(error),
    });
  };

  const handleSuccess = async (tx) => {
    try {
      console.log("entering");
      await tx.wait(1);
      update();
      handleNotification(tx);
      console.log("sucess");
    } catch (error) {
      console.log(error);
    }
  };

  const handleNotification = () => {
    dispatch({
      type: "info",
      message: "Transaction Completed",
      title: "Notification",
      position: "topR",
      icon: "bell",
    });
  };
  return (
    <div class="mt-9 ml-9">
      <button
        onClick={enterLottery}
        class="rounded-full bg-blue-400 hover:bg-blue-300 px-2 py-2 text-white ml-auto"
        disabled={isLoading || isFetching}
      >
        {" "}
        {isLoading || isFetching ? (
          <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full" />
        ) : (
          "Enter Raffle"
        )}
      </button>

      {raffleAddress ? (
        <div>
          <div>
            Entrance Fee : {ethers.utils.formatUnits(entranceFee, "ether")} ETH{" "}
          </div>

          <div> No of players : {noOfPlayers}</div>

          <div> Recent Winner : {RecentWinner}</div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
export default LotteryEntrance;

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
  const { runContractFunction: enterRaffle } = useWeb3Contract({
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
    <div>
      <button onClick={enterLottery}> Enter Lottery</button>

      {raffleAddress ? (
        <h2>
          Entrance Fee : {ethers.utils.formatUnits(entranceFee, "ether")} ETH{" "}
          <br />
          No of players : {noOfPlayers}
          <br />
          Recent Winner : {RecentWinner}
        </h2>
      ) : (
        <></>
      )}
    </div>
  );
};

export default LotteryEntrance;

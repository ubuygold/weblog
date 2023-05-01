import Layout from "@/components/Layout";
import { Divider, Stats } from "react-daisyui";
import {
  useTokenBalance,
  useContract,
  useAddress,
  Web3Button,
} from "@thirdweb-dev/react";
import AidogeABI from "@/abi/aidoge";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";

const contractAddress = "0x09e18590e8f76b6cf471b3cd75fe1a1a9d2b2c2b";
const airdropAddress = "0x5845696f6031bfd57b32e6ce2ddea19a486fa5e5";

export default function Earn() {
  const { contract } = useContract(contractAddress, AidogeABI);
  const wallet_address = useAddress();

  const { data: totalStakeBalance, isLoading: totalLoading } = useTokenBalance(
    contract,
    airdropAddress
  );
  const [totalStakeBalanceValue, setTotalStakeBalanceValue] = useState(0);
  useEffect(() => {
    if (totalStakeBalance) {
      const totalBalance =
        parseInt(totalStakeBalance.value.toString()) /
        10 ** totalStakeBalance.decimals;
      setTotalStakeBalanceValue(totalBalance);
    }
  }, [totalStakeBalance]);

  const { data: stakeBalance } = useTokenBalance(contract, wallet_address);
  const [stakeBalanceValue, setStakeBalanceValue] = useState(0);
  useEffect(() => {
    if (stakeBalance) {
      const balance =
        parseInt(stakeBalance.value.toString()) / 10 ** stakeBalance.decimals;
      setStakeBalanceValue(balance);
    }
  }, [stakeBalance]);

  return (
    <Layout>
      <div className="container w-full lg:w-2/3">
        <div className="text-center font-mono">
          <h1 className="text-5xl">Staking FUCKDOGE to Earn ARB</h1>
          <h2 className="text-2xl">And Become a DOGE HODLER</h2>
          <br />
          <h2 className="text-2xl">At least 80% APY.</h2>
        </div>
        <div className="flex flex-col bg-base-300 rounded-box py-4 my-4">
          <h2 className="text-lg pl-6 font-sans">Statistics</h2>
          <Divider className="my-0" />
          <Stats className="stats-vertical lg:stats-horizontal bg-base-300">
            <Stats.Stat>
              <Stats.Stat.Item variant="title">Staking</Stats.Stat.Item>
              {totalLoading ? (
                <Loading />
              ) : (
                <Stats.Stat.Item variant="value" className="text-sm lg:text-lg">
                  {totalStakeBalanceValue}
                  <span className="text-sm"> FUCKDOGE</span>
                </Stats.Stat.Item>
              )}
            </Stats.Stat>
            <Stats.Stat>
              <Stats.Stat.Item variant="title">APY</Stats.Stat.Item>
              <Stats.Stat.Item variant="value" className="text-sm lg:text-lg">
                10000%
              </Stats.Stat.Item>
            </Stats.Stat>
          </Stats>
        </div>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-1/2 bg-base-300 rounded-box flex flex-col py-4">
            <h2 className="text-lg font-sans pl-6">My Staking</h2>
            <Divider className="my-0" />
            <Stats className="bg-base-300">
              <Stats.Stat className="stat-vertical mx-auto gap-2">
                <Stats.Stat.Item
                  variant="title"
                  className="mx-auto flex flex-col gap-2"
                >
                  <Image
                    src="/binance.png"
                    alt="staking"
                    width={40}
                    height={40}
                    className="h-10"
                  />
                </Stats.Stat.Item>
                <Stats.Stat.Item
                  variant="value"
                  className="text-center text-2xl"
                >
                  {stakeBalanceValue}
                </Stats.Stat.Item>
                <div className="flex flex-row gap-x-2 w-full">
                  {stakeBalanceValue && stakeBalanceValue > 0 ? (
                    <>
                      <Web3Button
                        contractAddress={contractAddress}
                        className="bg-amber-500 text-primary-content w-1/2"
                      >
                        Stake
                      </Web3Button>
                      <Web3Button
                        contractAddress={contractAddress}
                        className="bg-amber-500 text-primary-content w-1/2"
                      >
                        Claim & Unstake
                      </Web3Button>
                    </>
                  ) : (
                    <>
                      <Web3Button
                        contractAddress={contractAddress}
                        className="bg-amber-500 text-primary-content w-full"
                      >
                        Stake
                      </Web3Button>
                    </>
                  )}
                </div>
              </Stats.Stat>
            </Stats>
          </div>

          <div className="w-full lg:w-1/2 bg-base-300 rounded-box flex flex-col py-4">
            <h2 className="text-lg font-sans pl-6">My Rewards</h2>
            <Divider className="my-0" />
            <Stats className="bg-base-300">
              <Stats.Stat className="stat-vertical mx-auto gap-2">
                <Stats.Stat.Item
                  variant="title"
                  className="mx-auto flex flex-col gap-2"
                >
                  <Image
                    src="/arbitrum-logo.png"
                    alt="staking"
                    width={40}
                    height={40}
                    className="h-10"
                  />
                </Stats.Stat.Item>
                <Stats.Stat.Item
                  variant="value"
                  className="text-center text-2xl"
                >
                  {stakeBalanceValue}
                </Stats.Stat.Item>
                <div className="flex flex-row gap-x-2 w-full">
                  <Web3Button
                    contractAddress={contractAddress}
                    className={
                      stakeBalanceValue > 0
                        ? "bg-amber-500 text-primary-content w-full"
                        : "bg-gray-500 text-primary-content w-full"
                    }
                    isDisabled={stakeBalanceValue == 0}
                  >
                    Claim
                  </Web3Button>
                </div>
              </Stats.Stat>
            </Stats>
          </div>
        </div>
      </div>
    </Layout>
  );
}

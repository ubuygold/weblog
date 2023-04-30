import Layout from "@/components/Layout";
import { Divider, Input, Progress } from "react-daisyui";
import AidogeABI from "@/abi/aidoge";
import { useEffect, useState } from "react";
import { BigNumber } from "ethers";
import {
  useTokenBalance,
  useAddress,
  useClaimToken,
  useTokenSupply,
  useContract,
  Web3Button,
} from "@thirdweb-dev/react";

const contractAddress = "0x09e18590e8f76b6cf471b3cd75fe1a1a9d2b2c2b";
const airdropAddress = "0x5845696f6031bfd57b32e6ce2ddea19a486fa5e5";

const Airdrop: React.FC = () => {
  const [received_per, setReceivedPer] = useState(0);
  const { contract } = useContract(contractAddress, AidogeABI);
  const { data: totalSupply } = useTokenSupply(contract);
  const { data: airdropBalance } = useTokenBalance(contract, airdropAddress);
  const { mutateAsync: claimToken } = useClaimToken(contract);
  const wallet_address = useAddress();

  useEffect(() => {
    if (totalSupply && airdropBalance) {
      const received_per = BigNumber.from(airdropBalance.value)
        .mul(100)
        .div(totalSupply.value);
      setReceivedPer(received_per.toNumber());
    }
  }, [totalSupply, airdropBalance]);

  return (
    <Layout>
      <div className="text-base-content font-mono rounded-box p-4 lg:p-8 w-full lg:w-1/2 bg-base-300 h-auto lg:mx-auto flex flex-col">
        <div className="items-center text-center text-lg lg:text-2xl">
          <h1 className="items-center text-2xl">Airdrop</h1>
        </div>
        <Divider />
        <div className="flex flex-col gap-4">
          <p className="items-center text-center ">
            Airdrop is ok now. Lorem LSDoge 30 trillion token airdrop is for
            ARB, AIdoge, ACID, vACID, esACID, and sACID holders. Unclaimed
            tokens may be burned after a certain period.
          </p>
          <div className="w-3/4 mx-auto flex flex-col gap-4 mt-6">
            <div className="w-full flex flex-row text-sm lg:text-md justify-between">
              <p>Received:{received_per}%</p>
              <p>Total:21000000</p>
            </div>
            <Progress
              color="warning"
              className="bg-secondary"
              value={received_per}
              max={100}
            />
          </div>
          <div className="form-control w-3/4 mx-auto">
            <label className="label">You can claim:</label>
            <Input placeholder="0" disabled={true} />
          </div>
          <Web3Button
            contractAddress={contractAddress}
            action={() =>
              claimToken({
                to: wallet_address as string,
                amount: 100,
              })
            }
            className="w-3/4 mx-auto bg-yellow-600"
          >
            CLAIM
          </Web3Button>
        </div>
      </div>
    </Layout>
  );
};

export default Airdrop;

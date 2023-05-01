import { Footer } from "react-daisyui";
import Image from "next/image";
import Link from "next/link";

const FootBar: React.FC = () => {
  return (
    <div className="z-40 w-full fixed bottom-0 left-0 p-2">
      <Footer className="bg-ghost text-base-content h-10 rounded-box items-center p-2 justify-end">
        <div className="flex flex-row gap-x-2 items-center">
          <p className="font-mono text-md">Troll Clan Lab</p>
          <div className="flex flex-row gap-x-2">
            <Link href="https://twitter.com">
              <Image
                src="/social/twitter.svg"
                alt="twitter"
                width={25}
                height={25}
              />
            </Link>
            <Link href="https://discord.com">
              <Image
                src="/social/discord.svg"
                alt="discord"
                width={25}
                height={25}
              />
            </Link>
          </div>
        </div>
      </Footer>
    </div>
  );
};

export default FootBar;

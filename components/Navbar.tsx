import { Button, Dropdown, Menu, Navbar } from "react-daisyui";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ConnectWallet } from "@thirdweb-dev/react";

interface IMenuItem {
  name: string;
  url: string;
}

const MenuItem: React.FC<IMenuItem> = ({ name, url }) => {
  // get current page
  const router = useRouter();
  const colorClass = (): string => {
    if (router.pathname == url) {
      return "text-base-content";
    } else return "text-primary";
  };
  return (
    <Menu.Item>
      <Link href={url} className={colorClass()}>
        {name}
      </Link>
    </Menu.Item>
  );
};

const Nav: React.FC = () => {
  const navList = [
    { name: "Home", url: "/" },
    {
      name: "Earn",
      url: "/earn",
    },
    {
      name: "LP",
      url: "/lp",
    },
    {
      name: "Airdrop",
      url: "/airdrop",
    },
    {
      name: "Docs",
      url: "docs",
    },
  ];
  return (
    <div className="z-40 w-full fixed top-0 left-0 p-2">
      <Navbar className="bg-base-200 text-base-content shadow-xl rounded-box px-2">
        <Navbar.Start className="gap-x-2">
          <Dropdown className="block lg:hidden">
            <Button className="bg-base-200 border-base-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 stroke-base-content"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </Button>
            <Dropdown.Menu className="w-60 gap-y-2">
              {navList.map((item) => (
                <MenuItem name={item.name} url={item.url} key={item.name} />
              ))}
              <ConnectWallet className="bg-yellow-600 text-white" />
            </Dropdown.Menu>
          </Dropdown>

          <Image
            src="/arbitrum-logo.png"
            alt="logo"
            width={72}
            height={72}
            className="w-10"
          />
          <h1 className="font-mono text-2xl text-white">FUCKDOGE</h1>
        </Navbar.Start>
        <Navbar.Center className="hidden lg:flex">
          <Menu horizontal>
            {navList.map((item) => (
              <MenuItem name={item.name} url={item.url} key={item.name} />
            ))}
          </Menu>
        </Navbar.Center>
        <Navbar.End className="hidden lg:flex">
          <ConnectWallet className="bg-amber-500 text-white h-12" />
        </Navbar.End>
      </Navbar>
    </div>
  );
};

export default Nav;

import Nav from "./Navbar";
import Footer from "./Footer";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const Layout: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <main
      className={`flex bg-base-100 flex-col text-base-content items-center justify-between p-10 pt-32 ${inter.className}`}
    >
      <Nav />
      {props.children}
      <Footer />
    </main>
  );
};

export default Layout;

import { Footer } from "react-daisyui";
import Image from "next/image";

const FootBar: React.FC = () => {
  return (
    <div className="z-40 w-full fixed bottom-0 left-0 p-2">
      <Footer className="bg-ghost text-base-content h-10 rounded-box items-center p-2">
        <div>Troll Clan Lab. 2023</div>
        <div></div>
      </Footer>
    </div>
  );
};

export default FootBar;

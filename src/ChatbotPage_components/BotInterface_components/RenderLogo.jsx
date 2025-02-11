import { useSelector } from "react-redux";
import superchatLogo from "../../assets/superchat_logo.webp";
import superchatLogo_white from "../../assets/superchat_logo_white.webp"

const RenderLogo = () => {
  const { darkmode } = useSelector((store) => store.user);

  return (
    <div 
      className="absolute flex justify-center items-center gap-0 top-44"
      role="banner"
      aria-label="Superchat Brand Logo"
    >
      <img
        src={darkmode ? superchatLogo_white : superchatLogo}
        alt="Superchat Logo"
        className="w-[40px] h-[45px]"
        width="40"
        height="45"
        loading="eager"
        // Add explicit dimensions for better CLS
        style={{ aspectRatio: '40/45' }}
      />
      <h1 
        className={`text-4xl py-1 bg-gradient-to-r ${
          darkmode 
            ? "from-[#F5EEF8] to-[#D0D3D4]" 
            : "from-[#6F036C] to-[#FF6F61E5]"
        } bg-clip-text text-transparent`}
        aria-label="Superchat"
      >
        uperchat
      </h1>
    </div>
  );
};

export default RenderLogo;
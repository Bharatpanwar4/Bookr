import { FlameKindling } from "lucide-react";

const Logo = () => {
  return (
    <h1 className="text-4xl flex items-center gap-4 font-bold leading-[0.95] tracking-tight">
      <FlameKindling className=" size-8" />
      <span className="bg-linear-to-r from-blue-400 via-purple-400 to-orange-400 bg-clip-text text-transparent">
        Bookr
      </span>
    </h1>
  );
};

export default Logo;

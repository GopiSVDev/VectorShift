import { FaPlay } from "react-icons/fa";

const Header = () => {
  return (
    <div className="w-full h-[42px] px-5 py-2 flex items-center justify-between border-b border-gray-400 ">
      <p className="font-medium text-sm">Pipelines</p>
      <button
        type="button"
        className="flex items-center justify-center rounded-md py-2 border text-xs hover:cursor-pointer pl-3 pr-4 bg-green-100 hover:bg-green-200 active:bg-green-300 border-green-500 text-green-800"
      >
        <div className="flex flex-row items-center gap-2">
          <FaPlay />
          <div>Run</div>
        </div>
      </button>
    </div>
  );
};

export default Header;

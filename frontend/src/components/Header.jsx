import SubmitButton from "./SubmitButton";

const Header = () => {
  return (
    <div className="w-full h-[42px] px-5 py-2 flex items-center justify-between border-b border-gray-400 ">
      <p className="font-medium text-sm">Pipelines</p>
      <SubmitButton />
    </div>
  );
};

export default Header;

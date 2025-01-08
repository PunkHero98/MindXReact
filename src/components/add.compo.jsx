import { IoFlag } from "react-icons/io5";
import { HiXMark } from "react-icons/hi2";
function Addnew() {
  return (
    <div className="w-[700px] h-[600px] bg-slate-100 rounded-lg px-4 py-2">
      <div className="first_row flex justify-between items-center">
        <div className=" w-fit p-1 rounded-xl bg-red-200">
          <IoFlag className="text-3xl text-green-500" />
        </div>
        <HiXMark className="text-3xl " />
      </div>
    </div>
  );
}

export default Addnew;

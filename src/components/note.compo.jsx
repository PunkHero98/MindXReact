import { LuPencilLine } from "react-icons/lu";
import { BsPaperclip } from "react-icons/bs";
import { RiFlagFill } from "react-icons/ri";
import { FaClock } from "react-icons/fa6";
function Note({items , onEdit}){
    return(
        <div className="mt-4 bg-white px-4 rounded-lg">
            <div className="top flex justify-between py-4">
                <h1 className="font-semibold text-base">{items.title}</h1>
                <LuPencilLine className="text-2xl" onClick={onEdit}/>
            </div>
            <div className="text_container mb-5">
                <p>{items.description}</p>
            </div>
            <span className="bg-[#0013FE] text-white p-2 rounded-md">{items.assignment}</span>
            <hr className="mt-5 mb-3"/>
            <div className="bottom flex justify-center items-center gap-8 pb-4">
                <div className="clip flex justify-center items-center hover:shadow  hover:shadow-black">
                    <BsPaperclip className="text-3xl" />
                    <label className="font-semibold" htmlFor="">3</label>
                </div>
                <RiFlagFill className="text-red-500 text-3xl"/>
                <div className="dueTime flex justify-center items-center">
                    <FaClock className="text-2xl mr-1"/>
                    <label className="font-semibold" htmlFor="">{items.date}</label>
                </div>
            </div>
        </div>
    )
};

export default Note;
import { BsThreeDots } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import Note from "./note.compo.jsx";
function Card({toggle , onEdit , title , items}){
return(
    <div className={`${toggle && 'blur-sm opacity-50'}mx-4 px-4 py-6 bg-[#E6ECF0] rounded-lg`}>
        <div className="top_show flex justify-between items-center">
            <div className="left flex items-center">
                <h2 className="text-xl font-bold mr-8">{title}</h2>
                <span className="numberOfNote flex justify-center items-center w-8 h-8 rounded-full bg-[#D5D5D5] text-base font-semibold">{items.length}</span>
            </div>
            <div className="right flex items-center">
                <div className="add flex justify-center items-center w-8 h-8 rounded-full bg-[#D5D5D5] text-sm mr-4"><FaPlus /></div>
                <div className="more flex justify-center items-center w-8 h-8 rounded-full bg-[#D5D5D5] text-sm"><BsThreeDots /></div>
            </div>
        </div>
        <div className="main">
            {items.map((f , index)=>(
                <Note key={`${f.date}-${f.title}`} onEdit={()=> onEdit(f)} items={f}/>
            ))}
        </div>
    </div>
)
}
export default Card;
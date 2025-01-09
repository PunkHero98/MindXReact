import { IoFlag } from "react-icons/io5";
import { HiXMark } from "react-icons/hi2";
import { useState ,useEffect  } from "react";
import { Select , Input , DatePicker   } from 'antd';
import moment from 'moment';
import React from "react";
const { TextArea } = Input;

function Addnew({onXmarkClick , onSave ,note}) {
  const [id, setId] = useState(null); 
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null);
  const [assignment, setAssignment] = useState("Lucy");
  const [status, setStatus] = useState("To do");
  const [check, setCheck] = useState('---');

  useEffect(() => {
    if (note) {
      setId(note.id || null);
      setTitle(note.title);
      setDescription(note.description);
      setAssignment(note.assignment);
      setDate(note.date);
      setStatus(note.status);
    }
  }, [note]);

  const handleSave = () => {
    const updatedNote = {id, title, description, assignment, date ,status };
    onSave(updatedNote);

    setTitle("");
    setDescription("");
    setDate("");
    setAssignment("");
    setStatus("To do");
  };
  const handleDate = (date ,dateString) =>{
    if (date) {
      const customFormat = date.format("MMM Do YYYY");
      setDate(customFormat); // Lưu chuỗi
    } else {
      setDate(null); // Xử lý nếu không chọn ngày
    }
  }
  const handleAssingment =(value) =>{
    setAssignment(value)
  }
  const handleStatus = (value) =>{
    setStatus(value);
  }
  const checkTitle = () =>{
    if(title == ''){
      setCheck('Title is required');
    }else{
      setCheck('---');
      handleSave();
    }
  }
  return (
    <div className="w-[700px] h-[600px] bg-white rounded-lg px-4 py-2 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[12] border-2 shadow-lg">
      <div className="first_row flex justify-between items-center ">
        <div className=" w-fit p-1 rounded-xl border-2">
          <IoFlag className="text-3xl text-green-500" />
        </div>
        <div className="hover:cursor-pointer hover:bg-[#7F56D9] hover:text-white w-fit p-1 rounded-md">
          <HiXMark className="text-3xl " onClick={onXmarkClick} />
        </div>
      </div>
      <h2 className="table_name text-left text-3xl mt-6 mb-10">{id ? "Edit Task" : "Save Task"}</h2>
      <div className="second_row flex gap-6">
        <div className="title w-4/6 flex flex-col">
          <label className="text-xl mb-1">Title<span className="text-red-500">*</span></label>
         
          <Input showCount value={title} style={{height: 50}} status={check == '---' ? '' : 'error'} maxLength={50} onChange={(e)=>setTitle(e.target.value)} />
          <div className={`${check == '---' ?'opacity-0' : 'text-red-500' }`}><span>{check}</span></div>
        </div>
        <div className="endDate w-2/6 flex flex-col">
        <label className="text-xl mb-1" htmlFor="">End Date <span className="text-red-500">*</span></label>
       
        <DatePicker value={date ? moment(date, "MMM Do YYYY") : null} style={{height: 50,}} format="DD-MMM-YYYY" onChange={handleDate} needConfirm />
        <div className="opacity-0"><span>----</span></div>
        </div>
      </div>
      <div className="third flex gap-6">
        <div className="description w-4/6 flex flex-col">
          <label className="text-xl mb-1" htmlFor="">Description <span className="text-red-500">*</span></label>
         
          <TextArea
            placeholder="Enter description"
            value={description}
            onChange={e=>setDescription(e.target.value)}
            autoSize={{
              minRows: 2,
              maxRows: 6,
            }}
          />
          <div className="opacity-0"><span>----</span></div>
        </div>
        <div className="assign w-2/6 flex flex-col">
          <label className="text-xl mb-1" htmlFor="">Assign <span className="text-red-500">*</span></label>
            <Select
              style={{
                height: 50,
                zIndex: 50,
              }}
              value={assignment}
              onChange={handleAssingment}
              options={[
                {
                  label: <span>manager</span>,
                  title: 'manager',
                  options: [
                    {
                      label: <span>Jack</span>,
                      value: 'Jack',
                    },
                    {
                      label: <span>Lucy</span>,
                      value: 'Lucy',
                    },
                  ],
                },
                {
                  label: <span>engineer</span>,
                  title: 'engineer',
                  options: [
                    {
                      label: <span>Chloe</span>,
                      value: 'Chloe',
                    },
                    {
                      label: <span>Lucas</span>,
                      value: 'Lucas',
                    },
                  ],
                },
                {
                  label: <span>school</span>,
                  title: 'school',
                  options: [
                    {
                      label: <span>MindX</span>,
                      value: 'MindX',
                    },
                  ],
                },
              ]}
            />
          <div className="opacity-0"><span>----</span></div>
        </div>
      </div>
      <div className="fourth_row flex flex-col">
        <label className="text-xl mb-1" htmlFor="">Status <span className="text-red-500">*</span></label>
          <Select  style={{
                height: 50,
                zIndex: 50,
                width: 200,
              }}
              value={status}
              onChange={handleStatus}
              options={[
                {
                  label: <span>To do</span>,
                  value: 'To do',
                },
                {
                  label: <span>In Progress</span>,
                  value: 'In Progress',
                },
                {
                  label: <span>In Review</span>,
                  value: 'In Review',
                },
                {
                  label: <span>Done</span>,
                  value: 'Done',
                },
              ]}/>
          <div className="opacity-0"><span>----</span></div>
      </div>
      <div className="last_row flex justify-between items-center">
        <button onClick={onXmarkClick} className="cancel w-[46%] p-3 border-2 rounded-xl text-xl ">Cancel</button>
        <button onClick={checkTitle} className="save bg-[#7F56D9] w-[46%] p-3 border-2 rounded-xl text-xl text-white">Save</button>
      </div>
    </div>
  );
}

export default Addnew;

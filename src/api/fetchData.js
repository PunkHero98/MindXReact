import { getNote ,insertNote} from "./apiHandle";
import { notification } from "antd";

const fetchDataForItems = async (setItems) =>{
    try{
      const result = await getNote();
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if(result.success === true){
        setItems(() => (
          result.data.filter( item => item.username === currentUser.username)
        ));
        return;
      }
      notification.error({
        message: result.message,
        placement: "topRight",
        duration: 1.5,
      });
      return;
    }catch(err){
      notification.error({
        message: err.message,
        placement: "topRight",
        duration: 1.5,
      });
    }
  }
const fetchDataForAdItems = async ({ title, description, assignment, date, status , setItems ,setLoading }) => {
    try {
        const {username } = JSON.parse(localStorage.getItem('currentUser'));
        const updatedNote = { title, description, assignment, date, status , username };
        const result = await insertNote(updatedNote);
        if (result.success === true) {
        // onSave(result.data.data);
        const note = result.data.data;
        fetchDataForItems(
            setItems(
            (prevItems) =>
              prevItems.some((n) => n["_id"] === note["_id"]) // Kiểm tra xem có ghi chú với _id trùng không
                ? prevItems.map(
                    (n) => (n["_id"] === note["_id"] ? { ...n, ...note } : n) // Nếu có _id trùng, cập nhật ghi chú
                  )
                : [...prevItems, { ...note }] // Nếu không có _id trùng, thêm ghi chú mới vào
          ));
          setLoading(false);
        notification.success({
            message: "Success",
            placement: "topRight",
            duration: 1.5,
        });
        return;
        }

        notification.error({
        message: result.message,
        placement: "topRight",
        duration: 1.5,
        });
    } catch (err) {
        notification.error({
        message: err.message,
        description: "Please try it again later !",
        placement: "topRight",
        duration: 1.5,
        });
    }
}
export {fetchDataForItems , fetchDataForAdItems};
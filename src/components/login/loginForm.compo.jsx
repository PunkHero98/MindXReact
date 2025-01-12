import { Button, Input, notification } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  Loading3QuartersOutlined,
} from "@ant-design/icons";
import { getUser , getDepartment } from "../../api/apiHandle.js";
import { useState } from "react";
import PropTypes from "prop-types";
function LoginForm({ handleLogin, setName, openRegisForm }) {
  const [usernameValue, setUsernameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const [userNameNotification, setUserNameNotification] = useState("---");
  const [emailNotification, setEmailNotification] = useState("---");
  const [passwordNotification, setPasswordNotification] = useState("---");

  const [isLoading, setIsLoading] = useState(false);

  const userNoti = userNameNotification === "---";
  const emailNoti = emailNotification === "---";
  const passwordNoti = passwordNotification === "---";

  function getUsernamesByDepartmentName(response, departmentName) {
    const department = response.find(group => group.name === departmentName);
    if (department && department.member) {
        return department.member
            .filter(member => member !== null) // Loại bỏ giá trị null
            .map(member => member.username); // Lấy danh sách username
    }
    return [];
  }

  const handleDepartment = async (name) => {
    try {
      const result = await getDepartment();
      if (result.success === false) {
        notification.error({
          message:
            "Error when get data !",
          description: result.message,
          placement: "topRight",
          duration: 1.5,
        });
        return null;
      }
      return  getUsernamesByDepartmentName(result.data, name);
    } catch (err) {
      notification.error({
        message: err.message,
        description: "Please try it again later !",
        placement: "topRight",
        duration: 1.5,
      });
      return null;
    }
  };
  const checkLogin = async () => {
    try {
      setIsLoading(true);
      const result = await getUser();
      if (result.success === false) {
        notification.error({
          message: "Error when fetching",
          description: result.message,
          placement: "topRight",
          duration: 1.5,
        });
        setIsLoading(false);
        return;
      }
      const user = result.data.find((item) => item.username === usernameValue);

      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (usernameValue === "") {
        setUserNameNotification("Cannot leave this field blank !");
      } else {
        setUserNameNotification("---");
      }

      if (emailValue === "") {
        setEmailNotification("Cannot leave this field blank !");
      } else if (!regex.test(emailValue)) {
        setEmailNotification("Invalid Email Format !");
      } else {
        setEmailNotification("---");
      }

      if (passwordValue === "") {
        setPasswordNotification("Cannot leave this field blank !");
      } else {
        setPasswordNotification("---");
      }

      if (user) {
        if (user.password === passwordValue && emailValue === user.email) {
          setTimeout(() => {
            handleLogin();
          }, 1000);
          const userss = JSON.stringify({
            user_id: user["_id"],
            username: user.username,
            department: user.department
          });
          setName(user.username);
          const selectUser = await handleDepartment(user.department);
          localStorage.setItem("selectUser", JSON.stringify(selectUser));
          localStorage.setItem("currentUser", userss);
          setIsLoading(false);
          notification.success({
            message: "Login Successful",
            description: "You have logged in successfully!",
            placement: "topRight",
            duration: 1.5,
          });
          return;
        } else {
          if (user.password !== passwordValue) {
            setPasswordNotification("Incorrect password !");
            setIsLoading(false);
          }
          if (emailValue !== user.email) {
            setEmailNotification("Email does not match with username !");
            setIsLoading(false);
          }
        }
      } else {
        setUserNameNotification("Username not found !");
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      notification.error({
        message: err.message,
        description: "Please try it again later !",
        placement: "topRight",
        duration: 1.5,
      });
    }
  };

  const className = "h-10 text-base mt-2 merriweather";

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      checkLogin();
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-stone-300 ">
      <div className="main py-6 bg-white h-2/3 w-1/3 border-2 rounded-xl border-stone-300 flex flex-col items-center justify-between">
        <div className="head mb-4 flex flex-col text-center gap-6 ">
          <h1 className="text-4xl mt-10 pacifico text-[#1677ff]">
            Work Management System
          </h1>
        </div>
        <form action="" onKeyDown={handleKeyDown} className="w-full flex flex-col items-center mt-4 ">
          <div className="w-full px-10">
            <label
              htmlFor="usernameInput"
              className="text-base merriweather-bolder "
            >
              Username
            </label>
            <Input
              status={userNoti ? "" : "error"}
              id="usernameInput"
              value={usernameValue}
              onChange={(e) => setUsernameValue(e.target.value)}
              className={className}
            />
            <div
              className={`${
                userNoti ? "opacity-0" : "text-[#f5222d]"
              } merriweather-bolder notification mb-4 mt-1 text-sm`}
            >
              <span>{userNameNotification}</span>
            </div>
          </div>
          <div className="w-full px-10">
            <label
              htmlFor="emailInput"
              className="text-base merriweather-bolder "
            >
              Email
            </label>
            <Input
              status={emailNoti ? "" : "error"}
              id="emailInput"
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              className={className}
            />
            <div
              className={`${
                emailNoti ? "opacity-0" : "text-[#f5222d]"
              } merriweather-bolder notification mb-4 mt-1 text-sm`}
            >
              <span>{emailNotification}</span>
            </div>
          </div>
          <div className="w-full px-10">
            <label
              htmlFor="passwordInput"
              className="text-base merriweather-bolder "
            >
              Password
            </label>
            <Input.Password
              status={passwordNoti ? "" : "error"}
              id="passwordInput"
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
              className={className}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
            <div
              className={`${
                passwordNoti ? "opacity-0" : "text-[#f5222d]"
              } merriweather-bolder notification mb-2 mt-1 text-sm`}
            >
              <span>{passwordNotification}</span>
            </div>
          </div>
        </form>
        <div className=" btn_container flex justify-between w-full px-10 mt-7">
          <Button
            className="w-[43%] pacifico h-14 text-2xl"
            variant="outlined"
            color="primary"
            onClick={openRegisForm}
          >
            Register
          </Button>
          <Button
            className="w-[43%] h-14 pacifico text-2xl"
            variant="solid"
            color="primary"
            onClick={checkLogin}
            disabled={isLoading}
          >
            {!isLoading ? "Login" : <Loading3QuartersOutlined spin />}
          </Button>
        </div>
      </div>
    </div>
  );
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
  openRegisForm: PropTypes.func.isRequired,
};
export default LoginForm;

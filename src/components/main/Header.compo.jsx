import { Button, Input, Space, Dropdown } from "antd";
import { UserOutlined, CalendarTwoTone } from "@ant-design/icons";
import PropTypes from "prop-types";
const { Search } = Input;

function HeaderApp({
  isAddNewVisible,
  handleSearch,
  openAddNew,
  handleLogout,
  username,
}) {
  const items = [
    {
      label: (
        <a
          href="https://www.antgroup.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Setting
        </a>
      ),
      key: "0",
    },
    {
      label: (
        <a
          href="https://www.aliyun.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          User
        </a>
      ),
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: (
        <a onClick={handleLogout} target="_blank" rel="noopener noreferrer">
          Logout
        </a>
      ),
      key: "3",
    },
  ];

  return (
    <div className="flex flex-col px-8">
      <div
        className={`${
          isAddNewVisible && "blur-sm opacity-50"
        } upperContainer flex justify-between items-center  py-10`}
      >
        <h1 className="pacifico text-3xl text-[#1677ff]">
          Work Management System
        </h1>
        <Search
          placeholder="Search title or description"
          className="roboto-slab-base text-lg w-[500px] mr-32"
          enterButton
          size="large"
          onSearch={handleSearch}
        />
        <div className="flex items-center gap-4">
          <h4 className="mr-4 text-2xl pacifico">Welcome , {username} !</h4>
          <Dropdown
            menu={{ items }}
            trigger={["click"]}
            overlayClassName="w-[200px] "
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space className="border  bg-[#1677ff] text-white hover:bg-white hover:border-[#1677ff] hover:text-[#1677ff] p-2 rounded-md ">
                <UserOutlined className="text-2xl " />
              </Space>
            </a>
          </Dropdown>
        </div>
      </div>
      <div className="navbar mb-8 rounded-full flex items-center border border-[#1677ff] h-12">
        <Button
          onClick={openAddNew}
          variant={"solid"}
          color="primary"
          className={`${
            isAddNewVisible && "blur-sm opacity-50"
          } addNew pacifico rounded-l-3xl rounded-r-xl h-12 text-xl tracking-wide `}
        >
          Add New
        </Button>
        <Button
          variant="solid"
          color="primary"
          className="h-12 rounded-r-xl rounded-l-xl ml-20 text-2xl"
        >
          <span className="pacifico text-xl mr-1">Calendar</span>
          <CalendarTwoTone className="" twoToneColor={["#fffff", "#1677ff"]} />
        </Button>
      </div>
    </div>
  );
}

HeaderApp.propTypes = {
  isAddNewVisible: PropTypes.bool.isRequired,
  handleSearch: PropTypes.func.isRequired,
  openAddNew: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};
export default HeaderApp;

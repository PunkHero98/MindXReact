import { Button, Input } from "antd";
import PropTypes from "prop-types";
const { Search } = Input;

function HeaderApp({ isAddNewVisible, handleSearch, openAddNew }) {
  return (
    <div
      className={`${
        isAddNewVisible && "blur-sm opacity-50"
      } upperContainer flex justify-between items-center px-8 py-5`}
    >
      <Search
        placeholder="Search title or description"
        className="roboto-slab-base text-lg w-[500px]"
        enterButton
        size="large"
        onSearch={handleSearch}
      />
      <Button
        onClick={openAddNew}
        variant={"solid"}
        color="primary"
        size="large"
        className={`${
          isAddNewVisible && "blur-sm opacity-50"
        } addNew pacifico text-xl tracking-wide `}
      >
        Add New
      </Button>
    </div>
  );
}

HeaderApp.propTypes = {
  isAddNewVisible: PropTypes.bool.isRequired,
  handleSearch: PropTypes.func.isRequired,
  openAddNew: PropTypes.func.isRequired,
};
export default HeaderApp;

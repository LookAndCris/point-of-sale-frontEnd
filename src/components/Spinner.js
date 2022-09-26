import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

const Spinner = () => {
  return (
    <div className="spinner">
      <Spin indicator={antIcon} className="spinner-border" />
    </div>
  );
};

export default Spinner;

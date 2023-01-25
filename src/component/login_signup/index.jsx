import { Outlet } from "react-router-dom";
import index from "./index.module.css";
import img from "../../assests/vecteezy_smartphone-app-layout_-removebg-preview.png";

const LogSign = () => {
  return (
    <>
      <div className={index.grid}>
        <div className={index.grid_item1}>
          <img src={img} alt="logsignimage" />
        </div>
        <div className={index.grid_item2}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default LogSign;

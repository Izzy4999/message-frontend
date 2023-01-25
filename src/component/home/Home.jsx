import { useState } from "react";
import { Navigate } from "react-router-dom";
import home from "./home.module.css";

const Home = () => {
  const [selected, setSelected] = useState(false);
  const res = localStorage.getItem("notFirst");
  const handleChange = () => {
    setSelected(!selected);
  };
  const handleSubmit = () => {
    localStorage.setItem("notFirst", true);
    window.location = "/login";
    setSelected(false);
  };
  return res ? (
    <Navigate to="/login" replace={true} />
  ) : (
    <div className={home.center}>
      <h4 className={home.heading}>Welcome to chat Home</h4>
      <p className={home.body_text}>
        Read our Privacy Policy. Tap "I here by agree" to accept the Terms of
        services
      </p>
      <div className={home.content}>
        <input
          id="agreement"
          type="checkbox"
          value="agreement"
          onChange={handleChange}
          checked={selected}
        />
        <label htmlFor="agreement">I Here by Agree</label>
      </div>
      <button
        className={home.btn_design}
        disabled={!selected}
        onClick={handleSubmit}
      >
        Continue
      </button>
    </div>
  );
};

export default Home;

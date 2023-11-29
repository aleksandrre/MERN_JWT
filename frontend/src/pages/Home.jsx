import React, { useContext, useEffect, useState } from "react";
import MyTable from "../components/MyTable";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../App";

const Home = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { token } = useContext(MyContext);
  useEffect(() => {
    const getdata = async () => {
      const response = await fetch("https://mern-jwt.onrender.com//rap", {
        headers: {
          authorization: `border ${token.jwttoken}`,
        },
      });
      const data = await response.json();
      setData(data);
    };
    getdata();
  }, []);

  return (
    <div>
      <button
        onClick={() => navigate("/registration")}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
      >
        Registration
      </button>
      <button
        onClick={() => navigate("/signIn")}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
      >
        Sign In
      </button>
      {token.jwttoken ? <MyTable data={data} /> : ""}
    </div>
  );
};

export default Home;

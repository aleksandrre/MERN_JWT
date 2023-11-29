import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import { MyContext } from "../App";

const UpdateArtist = () => {
  const [data, setData] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(MyContext);

  useEffect(() => {
    const getdata = async () => {
      const response = await fetch(`https://mern-jwt.onrender.com//rap/${id}`, {
        headers: {
          authorization: `Bearer ${token.jwttoken}`,
        },
      });
      const data = await response.json();
      setData(data);
    };
    getdata();
  }, []);

  async function postData() {
    try {
      const response = await fetch(`https://mern-jwt.onrender.com//rap/${id}`, {
        method: "PUT",
        headers: {
          authorization: `Bearer ${token.jwttoken}`,

          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      navigate("/");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">
        Update Artist
      </h1>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Name</label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Genre</label>
        <input
          type="text"
          value={data.genre}
          onChange={(e) => setData({ ...data, genre: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Age</label>
        <input
          type="text"
          value={data.age}
          onChange={(e) => setData({ ...data, age: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
      <button
        onClick={() => postData()}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
      >
        Update
      </button>

      <BackButton className="mt-4" />
    </div>
  );
};

export default UpdateArtist;

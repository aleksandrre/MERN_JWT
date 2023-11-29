import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import { MyContext } from "../App";

const CreateArtist = () => {
  const [data, setData] = useState({
    name: "",
    genre: "",
    age: "",
  });
  const navigate = useNavigate();
  const { token } = useContext(MyContext);

  const [errors, setErrors] = useState({});

  const handleValidation = () => {
    const newErrors = {};

    if (!data.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!data.genre.trim()) {
      newErrors.genre = "Genre is required";
    }

    if (!data.age.trim()) {
      newErrors.age = "Age is required";
    } else if (isNaN(data.age) || +data.age < 1) {
      newErrors.age = "Age must be a positive number";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  async function postData() {
    if (!handleValidation()) {
      return;
    }

    try {
      const response = await fetch("https://mern-jwt.onrender.com//rap", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token.jwttoken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 201) {
        navigate("/");
      } else {
        console.error("Failed to create artist.");
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">
        Create Artist
      </h1>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Name</label>
        <input
          type="text"
          value={data.name}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${
            errors.name ? "border-red-500" : ""
          }`}
          onChange={(e) =>
            setData({ ...data, name: e.target.value, age: data.age })
          }
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Genre</label>
        <input
          type="text"
          value={data.genre}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${
            errors.genre ? "border-red-500" : ""
          }`}
          onChange={(e) =>
            setData({ ...data, genre: e.target.value, age: data.age })
          }
        />
        {errors.genre && (
          <p className="text-red-500 text-xs mt-1">{errors.genre}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Age</label>
        <input
          type="number"
          value={data.age}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${
            errors.age ? "border-red-500" : ""
          }`}
          onChange={(e) =>
            setData({
              ...data,
              age: e.target.value,
              name: data.name,
              genre: data.genre,
            })
          }
        />
        {errors.age && (
          <p className="text-red-500 text-xs mt-1">{errors.age}</p>
        )}
      </div>
      <button
        onClick={() => postData()}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
      >
        Post
      </button>

      <BackButton />
    </div>
  );
};

export default CreateArtist;

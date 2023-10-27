import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import { MyContext } from "../App";

const DeleteArtist = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useContext(MyContext);

  const deleteArtist = async () => {
    const response = await fetch(`http://localhost:4001/rap/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token.jwttoken}`,
      },
    });
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">
        Confirm Deletion
      </h1>
      <p className="text-gray-600 mb-4">
        Are you sure you want to delete this artist?
      </p>
      <button
        onClick={() => deleteArtist()}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200 mr-2"
      >
        Delete
      </button>
      <BackButton className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 hover:text-gray-800 transition duration-200" />
    </div>
  );
};

export default DeleteArtist;

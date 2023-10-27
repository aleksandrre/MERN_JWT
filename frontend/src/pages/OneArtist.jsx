import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import { MyContext } from "../App";

const OneArtist = () => {
  const [data, setData] = useState({});
  const { id } = useParams();
  const { token } = useContext(MyContext);

  useEffect(() => {
    const getOneArtist = async () => {
      const response = await fetch(`http://localhost:4001/rap/${id}`, {
        headers: {
          authorization: `border ${token.jwttoken}`,
        },
      });
      const artistData = await response.json();
      setData(artistData);
    };
    getOneArtist();
  }, [id]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">
        Artist Details
      </h1>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2 text-gray-700">Name:</h2>
        <p className="text-gray-600">{data.name}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2 text-gray-700">Genre:</h2>
        <p className="text-gray-600">{data.genre}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2 text-gray-700">Age:</h2>
        <p className="text-gray-600">{data.age}</p>
      </div>
      <BackButton />
    </div>
  );
};

export default OneArtist;

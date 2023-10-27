import React from "react";
import { Link } from "react-router-dom";

const BackButton = () => {
  return (
    <Link
      to="/"
      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 hover:text-gray-800 transition duration-200 inline-block mt-4"
    >
      Back
    </Link>
  );
};

export default BackButton;

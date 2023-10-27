import { createContext, useState } from "react";

import "./App.css";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import CreateArtist from "./pages/CreateArtist";
import OneArtist from "./pages/OneArtist";
import DeleteArtist from "./pages/DeleteArtist";
import UpdateArtist from "./pages/UpdateArtist";
import Registration from "./pages/registrationSignin/Registration";
import SignIn from "./pages/registrationSignin/SignIn";
export const MyContext = createContext();
function App() {
  const [token, setToken] = useState({});
  console.log(token.jwttoken);
  return (
    <MyContext.Provider value={{ token, setToken }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/getOne/:id" element={<OneArtist />} />
        <Route path="/create" element={<CreateArtist />} />
        <Route path="/delete/:id" element={<DeleteArtist />} />
        <Route path="/update/:id" element={<UpdateArtist />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </MyContext.Provider>
  );
}

export default App;

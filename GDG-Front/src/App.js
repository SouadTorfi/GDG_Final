import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";
import Dashboard from "./Dashboard/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dolls from "./pages/Dolls";
import Hoops from "./pages/Hoops";
import PsychologicalFacts from "./pages/PsychologicalFacts";
import FillDolls from "./pages/FillDolls";
import DollsHouse from "./pages/DollsHouse";
import { useEffect, useState } from "react";
import axios from "axios";
import UserLogin from "./pages/UserLogin";
import NotFound from "./pages/NotFound";
import Story from "./pages/Story";
import "./App.css";
import { Pagination } from "@mui/material";
import DollById from "./pages/DollById";
// import OneDoll from "./pages/OneDoll";

function App() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getcategories();
  }, []);

  const getcategories = async () => {
    let res = await axios.get(`http://localhost:2000/api/categories`);
    try {
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Home />} />
        {localStorage.getItem("token") !== null ? (
          <Route index path="/dashboard/*" element={<Dashboard />} />
        ) : (
          <Route path="*" element={<NotFound />} />
        )}
        =
        <Route path="/adminlogin" element={<Login />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/loading" element={<Loader />} />
        <Route path="/story" element={<Story />} />
        <Route path="/facts/:name" element={<PsychologicalFacts />} />
        <Route path="/filldoll/:name" element={<FillDolls />} />
        <Route path="/dollhouse/:name" element={<DollsHouse />} />
        <Route path="/product/:id" element={<DollById />} />
        <Route path="*" element={<NotFound />} />
        {categories.map((each) => {
          return each.name == "dolls" ? (
            <Route
              key={each._id}
              path="/dolls"
              element={<Dolls id={each._id} />}
            />
          ) : (
            <Route
              key={each._id}
              path="/hoops"
              element={<Hoops id={each._id} />}
            />
          );
        })}
        {/* <Route path="/dolls" element={<Dolls />} />
        <Route path="/hoops" element={<Hoops />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

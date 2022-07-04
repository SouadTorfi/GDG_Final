import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import logo from "../images/DollsLogo.png";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DropDown from "./DropDown";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
export default function Header() {
  return (
    <div>
      <div className="top-header">
        <div className="start-p">
          <WhatsAppIcon /> +961 71 949 589
        </div>
        <div className="end-p">
          <div className="search">
            <SearchIcon />
            Search
          </div>
          <div className="account">
            <PersonIcon />
          </div>
          <div className="account-arrow">
            Account
            <ArrowDropDownIcon />
          </div>
          <div className="ShoppingCartIcon-responsive">
            <ShoppingCartOutlinedIcon />
            <DropDown />
          </div>
          {/* <DropDown /> */}
        </div>
      </div>
      <div className="logo-img">
        <div className="logo_hopes">
          <img src={logo} alt="hopes"></img>
        </div>
        <div className="ShoppingCartIcon">
          <ShoppingCartOutlinedIcon />
        </div>
      </div>

      <div className="menu">
        <ul>
          <li>
            <Link className="links" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="links" to="/story">
              Story
            </Link>
          </li>
          <li>
            <Link className="links" to="/dolls">
              Dolls
            </Link>
          </li>
          <li>
            <Link className="links" to="/hoops">
              Hoops
            </Link>
            {/* <Link className="links-hoops" to="/">
              Hoops<ArrowDropDownIcon></ArrowDropDownIcon>
            </Link> */}
          </li>
          <li>
            <Link className="links" to="/facts/PsychologicalFacts">
              Psychological Facts
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

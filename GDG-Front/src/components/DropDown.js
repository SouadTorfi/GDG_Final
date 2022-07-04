import React, { useState } from "react";
import { Link } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import "./Header.css";

function DropDown() {
  // const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  
  
  return (
    <>
      <div className="dropdown">
        <MoreHorizIcon
          className="dropbtn"
          sx={{ fontSize: 32 }}
          onClick={() => {
            setIsOpen(!isOpen); // toggle
          }}
        />
        {isOpen && (
          <div className="dropdown-content">
            {/* <div className="dropdown-image">
          <img src={logo} alt="hopes"></img>
        </div> */}
            <Link className="links" to="/home">
              Home
            </Link>
            <Link className="links" to="/story">
              Story
            </Link>
            <Link className="links" to="/dolls">
              Dolls
            </Link>
            <Link className="links" to="/hoops">
              Hoops
            </Link>
            <Link className="links" to="/psychological-facts">
              Psychological Facts
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default DropDown;
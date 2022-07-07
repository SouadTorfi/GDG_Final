import React from "react";
import "./Cards.css";
import { Link } from "react-router-dom";
import DollById from "../pages/DollById";

export default function Cards(props) {
  const { name, price, image, _id } = props.doll;
  // props.DeleteCategories(props.data.id)
  return (
    <div className="cards">
      <img src={image[0]} alt="" loading="lazy" />
      <div className="AddToCart">
        <div className="opacity">
          <Link to={`/product/${_id}`}>
            <button>View more</button>
          </Link>
        </div>
      </div>
      <label>
        <p>{name}</p>
        <p>{price}$</p>
      </label>
    </div>
  );
}

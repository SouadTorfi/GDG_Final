import React from "react";
import "./Cards.css";
import { Link } from "react-router-dom";
export default function Cards(props) {
  const { name, price, image } = props.doll;
  // props.DeleteCategories(props.data.id)
  return (
    <div className="cards">
      <img src={image[0]} alt="" loading="lazy" />
      <div className="AddToCart">
        <div className="opacity">
          <Link to="/Pagination">
            <button>Add to cart</button>
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
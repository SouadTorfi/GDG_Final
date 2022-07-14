import React, { useEffect, useState } from "react";
import "./DollById.css";
import Hoda from "../images/hoda1.jpg";
import axios from "axios";
import { useParams } from "react-router-dom";
export default function DollByID() {
  let { id } = useParams();
  const [doll, setDolls] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:2000/api/products/${id}`)
      .then((res) => {
        console.log("response ", res.data);
        setDolls(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div key="index" className="container-show-doll">
        <div className="one-show-doll-first-step">
          <h1 className="one-show-doll-dolls-title">
            {doll && doll.category ? doll.category.name : "Product"}{" "}
          </h1>
          {/* <div className="one-show-doll-sorting">
            <p id="one-sort-by">Sort by :</p>
            <FormControl sx={{ m: 1, minWidth: 190 }}>
              <Select
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Best Seller</MenuItem>
                <MenuItem value={20}>highest</MenuItem>
                <MenuItem value={30}>lowest</MenuItem>
              </Select>
            </FormControl>
          </div> */}
        </div>
        <div className="one-show-doll-res-content-under-img">
          <div className="one-show-doll-logo-imgs">
            <img src={doll.image} alt="hopes"></img>
            <div className="one-show-doll-photo-detail">
              <h1>{doll.name}</h1>
              <div className="one-show-doll-pap">
                <p id="one-show-doll-price">PRICE: {doll.price}</p>
                <p id="one-show-doll-dollar-num">$</p>
              </div>
              <div className="one-show-doll-content">
                <div className="one-show-doll-pac-size-cloth">
                  <div className="one-show-doll-package">
                    <h4>PACKAGE:</h4>
                    <ul className="one-show-doll-dashed">
                      <li>{doll.package}</li>
                    </ul>
                  </div>
                  <div className="one-show-doll-size">
                    <h4>SIZE:</h4>
                    <ul className="one-show-doll-dashed">
                      <li>{doll.size}</li>
                    </ul>
                  </div>
                  <div className="one-show-doll-clothes">
                    <h4>CLOTHES:</h4>
                    <ul className="one-show-doll-dashed-clothes">
                      <li>{doll.clothes}</li>
                    </ul>
                  </div>
                </div>
                <div className="one-show-doll-qunt-price">
                  <div className="one-show-doll-quantity">
                    <h4>QUANTITY</h4>
                    <div className="one-show-doll-count-quant">
                      <button className="one-show-doll-minus-button">-</button>
                      <div className="one-show-doll-numb">2</div>
                      <button className="one-show-doll-plus-button">+</button>
                    </div>
                    <button className="one-show-doll-add-to-cart-btn">
                      Add To cart
                    </button>
                  </div>
                  <div className="one-show-doll-price-sec">
                    <div>
                      <h4 id="one-show-doll-total-price">TOTAL PRICE</h4>
                      <p id="one-show-doll-tot-price">$</p>
                    </div>
                    <div>
                      <button className="one-show-doll-buy-now-btn">
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

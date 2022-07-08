import React, { useState, useEffect } from "react";
import "./Products.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Pagination from "../../components/Pagination";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../components/Loader";

export default function ProductsHoops(props) {
  toast.configure();
  let { id } = useParams();
  const [product, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [productOne, setProductOne] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getproductsByPagination();
  }, []);

  const getproductsByPagination = async (page_id) => {
    let res = await axios.get(
      `http://localhost:2000/api/products/some/${props.id}?page=${page_id}`
    );
    try {
      setProducts(res.data.data);
      setTotalPages(res.data.pages);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  async function getproductById(t_id) {
    axios
      .get(`http://localhost:2000/api/products/${t_id}`)
      .then((res) => {
        setProductOne(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function deleteproductById(t_id) {
    if (window.confirm("Are you sure you want to delete Product?")) {
      const response = await axios
        .delete(`http://localhost:2000/api/products/${t_id}`)
        .then((res) => {
          toast.success("Product Deleted Successfully");
          getproductsByPagination();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  if (loading) {
    return (
      <div className="loading_div">
        <Loading />
      </div>
    );
  }
  return (
    <>
      <div className="dashboardProducts">
        <div className="add-product-btn-div">
          <Link to="/dashboard/addProduct">
            <button className="add-product-dash-btn">Add Product</button>
          </Link>
        </div>

        <main className="main-area">
          <div className="centered">
            <section className="dashboardcards">
              {product &&
                product.map((doll, index) => {
                  return (
                    <div key={index}>
                      <article className="dashboardcard">
                        <picture className="thumbnail">
                          <img src={doll.image[0]} alt="" loading="lazy" />
                        </picture>

                        <div className="update">
                          <div className="opacity">
                            <Link to={"/dashboard/editproduct/" + doll._id}>
                              <button onClick={() => getproductById(doll._id)}>
                                Update
                              </button>
                            </Link>
                          </div>
                        </div>
                        <div className="delete">
                          <div className="opacity">
                            <button onClick={() => deleteproductById(doll._id)}>
                              Delete
                            </button>
                          </div>
                        </div>

                        <div className="dashboardcard-content">
                          <h2>{doll.name}</h2>
                          <p>{doll.price}$</p>
                        </div>
                      </article>
                    </div>
                  );
                })}
            </section>
          </div>
        </main>
        <div>
          <Pagination
            count={totalPages}
            getproductsByPagination={getproductsByPagination}
          />
        </div>
      </div>
    </>
  );
}

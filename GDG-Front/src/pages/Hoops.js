import React from "react";
import "./Dolls.css";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Cards from "../components/Cards";
import Pagination from "../components/Pagination";
import Whatsapp from "../components/Whatsapp";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../components/Loader";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Dolls(props) {
  const [product, setProducts] = useState([]);
  const [sortProduct, setSortProducts] = useState(product);
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isChecked, setIsChecked] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getproducts();
    getCollections();
  }, []);

  useEffect(() => {
    if (isChecked.length > 0) getCollectionsApi();
    else getproducts();
  }, [isChecked]);

  let { name } = useParams();
  const getproducts = async () => {
    let res = await axios.get(
      `http://localhost:2000/api/products/some/${props.id}`
    );
    try {
      setProducts(res.data.data);
      setTotalPages(res.data.pages);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

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

  const getCollections = async () => {
    let res = await axios.get(
      `http://localhost:2000/api/collections/some/${props.id}`
    );
    try {
      setCollection(res.data);
      setLoading(false);
    } catch (err) {
      console.log("err ", err);
    }
  };

  const getCollectionsApi = async () => {
    const body = { collection: isChecked };
    let res = await axios.post(
      `http://localhost:2000/api/products/ByCollecction`,
      body
    );
    try {
      setProducts(res.data.data);
      setTotalPages(res.data.pages);
      setLoading(false);
    } catch (err) {
      console.log("err ", err);
    }
  };

  // const handleOnChange = (event) => {
  const handleOnChange = (e, name) => {
    const value = e.target.checked;
    const collection_id = e.target.value;

    if (value === true) {
      setIsChecked([...isChecked, e.target.value]);
    } else {
      let new_Array = isChecked;
      new_Array = new_Array.filter((each) => each !== collection_id);
      setIsChecked(new_Array);
    }
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <Header />
      <div className="dolls">
        <div className="categories">
          <form className="AllCategories">
            <h1>Hoops</h1>
            <h2>All_Categories</h2>
            <div>
              <input
                type="text"
                placeholder="Search Categories.."
                name="search"
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          </form>
          <form className="Collection_form">
            <div className="collection">
              {collection
                .filter((val) => {
                  if (searchValue === "") {
                    return val;
                  } else if (
                    val.name.toLowerCase().includes(searchValue.toLowerCase())
                  )
                    return val;
                })
                .map((e, index) => {
                  return (
                    <div className="collection-form" key={index}>
                      <input
                        type="checkbox"
                        id={`collection ${index}`}
                        onChange={(event) => handleOnChange(event, e.name)}
                        name={"collection"}
                        value={e._id}

                        // onClick={() => filterResult("collection 1")}
                      />

                      <label htmlFor={`collection ${index}`}>{e.name}</label>
                    </div>
                  );
                })}
            </div>
          </form>
        </div>

        <div className="dools-items">
          <div className="filter">
            <div>
              <p>Sort By:</p>

              <div className="filter_By">
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    onChange={(e) => {
                      const selected = e.target.value;
                      setSortProducts(selected);
                    }}
                    value={10}
                    // onChange={}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value="10">
                      <em>Best Seller</em>
                    </MenuItem>
                    {/* <MenuItem value={10}>Best Seller</MenuItem> */}
                    <MenuItem value="2">highest</MenuItem>
                    <MenuItem value="1">lowest </MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>

          <div className="items">
            {product &&
              product
                .sort((a, b) => {
                  if (sortProduct === "1") {
                    return a.price - b.price;
                  }
                  if (sortProduct === "2") {
                    return b.price - a.price;
                  } else {
                    return product;
                  }
                })
                .map((doll, index) => {
                  return (
                    <div key={index}>
                      <Cards doll={doll} />
                    </div>
                  );
                })}
          </div>

          <div>
            <Pagination
              count={totalPages}
              getproductsByPagination={getproductsByPagination}
            />
            {/* )} */}
          </div>
        </div>
        <Whatsapp />
      </div>
      <Footer />
    </div>
  );
}

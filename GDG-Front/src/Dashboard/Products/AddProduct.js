import React, { useEffect, useState } from "react";
import "./AddProduct.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AddProducts(props) {
  toast.configure();

  const [category, setCategory] = useState([]);
  const [collection, SetCollection] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:2000/api/categories")
      .then((res) => {
        console.log(res.data);
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:2000/api/collection`)
      .then((res) => {
        console.log(res.data);
        SetCollection(res.data);   
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [state, setState] = useState({
    name: "",
    price: "",
    size: "",
    clothes: "",
    package: "",
    category: "",
    Collection: "",
  });
  const [image, setImages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const image_array = Object.values(image.image);
    const formData = new FormData();
    image_array.forEach((file) => {
      formData.append("image", file);
    });
    formData.append("name", state.name);
    formData.append("price", state.price);
    formData.append("size", state.size);
    formData.append("clothes", state.clothes);
    formData.append("package", state.package);
    formData.append("category", state.category);
    formData.append("Collection", state.Collection);

    axios
      .post(`http://localhost:2000/api/products`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("res ", res.data);
        toast.success("Product Added Successfulyy");
        setImages({
          image: "",
        });
        setState({
          name: "",
          price: "",
          size: "",
          clothes: "",
          package: "",
          category: "",
          Collection: "",
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error While Adding Product");
      });
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleImage = (e) => {
    console.log("handleImage ", e.target.files);
    setImages({ image: e.target.files });
  };

  return (
    <>
      <div className="AddProduct">
        <h2>Product</h2>

        <div className="AddProductcontainer">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="addProductrow">
              <div className="labelProduct">
                <label htmlFor="name">Name</label>
              </div>
              <div className="divProduct">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="name of product.."
                  onChange={handleChange}
                  value={state.name}
                  required
                />
              </div>
            </div>

            <div className="addProductrow">
              <div className="labelProduct">
                <label htmlFor="price">Price</label>
              </div>
              <div className="divProduct">
                <input
                  type="text"
                  id="price"
                  name="price"
                  placeholder="price of product.."
                  onChange={handleChange}
                  value={state.price}
                  required
                />
              </div>
            </div>
            <div className="addProductrow">
              <div className="labelProduct">
                <label htmlFor="size">Size</label>
              </div>
              <div className="divProduct">
                <input
                  type="text"
                  id="size"
                  name="size"
                  placeholder="size of product.."
                  onChange={handleChange}
                  value={state.size}
                  required
                />
              </div>
            </div>
            <div className="addProductrow">
              <div className="labelProduct">
                <label htmlFor="clothes">Clothes</label>
              </div>
              <div className="divProduct">
                <input
                  type="text"
                  id="clothes"
                  name="clothes"
                  placeholder="clothes of product.."
                  onChange={handleChange}
                  value={state.clothes}
                  required
                />
              </div>
            </div>
            <div className="addProductrow">
              <div className="labelProduct">
                <label htmlFor="package">Package</label>
              </div>
              <div className="divProduct">
                <input
                  type="text"
                  id="package"
                  name="package"
                  placeholder="package of product.."
                  onChange={handleChange}
                  value={state.package}
                  required
                />
              </div>
            </div>

            <div className="addProductrow">
              <div className="labelProduct">
                <label htmlFor="category">Category</label>
              </div>
              <div className="divProduct">
                <select
                  name="category"
                  onChange={handleChange}
                  value={state.category}
                  id="category"
                  required
                >
                  <option value="">Select Category</option>
                  {category &&
                    category.map((item, index) => {
                      return (
                        <option value={item._id} key={index}>
                          {item.name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div className="addProductrow">
              <div className="labelProduct">
                <label htmlFor="category">Collection</label>
              </div>
              <div className="divProduct">
                <select
                  name="Collection"
                  onChange={handleChange}
                  value={state.Collection}
                  id="Collection"
                  required
                >
                  <option value="">Select Collection</option>
                  {collection &&
                    collection.map((item, index) => {
                      return (
                        <option value={item._id} key={index}>
                          {item.name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div className="uploadButton">
              <input
                type="file"
                id="file"
                name="image"
                multiple
                onChange={handleImage}
                required
              />
            </div>

            <div className="addProductrow">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default AddProducts;

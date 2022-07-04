import React, { useEffect, useState } from "react";
import "./EditProduct.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

function EditProduct() {
  toast.configure();

  const [category, setCategory] = useState([]);
  const [dollscollection, setDollsCollection] = useState([]);
  const [hoopscollection, setHoopsCollection] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getproductById(id);
    }
  }, [id]);

  const getproductById = async (id) => {
    const response = await axios.get(
      `http://localhost:2000/api/products/${id}`
    );

    if (response.status === 200) {
      setState({ ...response.data });
    }
  };

  const getCategories = async () => {
    await axios
      .get("http://localhost:2000/api/categories")
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCollection = () => {
    category.map((each) => {
      each.name == "dolls"
        ? getCollectionById(each._id, "dolls")
        : getCollectionById(each._id, "hoops");
    });
  };
  const getCollectionById = async (id, name) => {
    await axios
      .get(`http://localhost:2000/api/collections/some/${id}`)
      .then((res) => {
        if (name == "dolls") {
          setDollsCollection({ id: id, value: res.data });
        } else {
          setHoopsCollection({ id: id, value: res.data });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getCollection();
  }, [category]);

  const [state, setState] = useState({
    name: "",
    price: "",
    size: "",
    clothes: "",
    package: "",
    category: "",
    Collection: "",
    zeinab: "",
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
    formData.append("zeinab", state.zeinab);

    axios
      .put(`http://localhost:2000/api/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        toast.success("Product Edited Successfulyy");

        setImages({
          image: "",
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
                  id="category"
                  onChange={handleChange}
                  value={state.category}
                  required
                  defaultValue={state.category}
                >
                  <option value="">Select Category</option>
                  {category &&
                    category.map((item, index) => {
                      return (
                        <option
                          key={index}
                          required
                          value={item._id}
                          label={item.name}
                        >
                          {item.name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div className="addProductrow">
              <div className="labelProduct">
                <label htmlFor="Collection">Collection</label>
              </div>

              <div className="divProduct">
                <select
                  name="Collection"
                  id="Collection"
                  onChange={handleChange}
                  value={state.Collection.name}
                  required
                >
                  {state &&
                  dollscollection &&
                  state.category == dollscollection.id
                    ? dollscollection.value.map((item, index) => {
                        return (
                          <option key={index} value={item._id} required>
                            {item.name}
                          </option>
                        );
                      })
                    : state &&
                      hoopscollection &&
                      state.category == hoopscollection.id
                    ? hoopscollection.value.map((item, index) => {
                        return (
                          <option key={index} value={item._id} required>
                            {item.name}
                          </option>
                        );
                      })
                    : ""}
                </select>
              </div>
            </div>
            {/* {state.image &&
              state.image.map((e, index) => {
                return (
                  <>
                    <div className="ProductEditImage" key={index}>
                      <img src={e.image} alt="" />
                    </div>
                  </>
                );
              })} */}
            <div className="ProductEditImageAll">
              {state.image &&
                state.image.map((singleImage) => {
                  return (
                    <div className="ProductEditImage">
                      <img src={singleImage} alt="I'm an image" />
                    </div>
                  );
                })}
            </div>
            <input
              type="file"
              id="file"
              name="image"
              multiple
              onChange={handleImage}
              required
            />

            <div className="addProductrow">
              <button type="submit">Edit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default EditProduct;

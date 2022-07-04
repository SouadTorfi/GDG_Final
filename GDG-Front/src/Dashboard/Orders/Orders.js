import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../components/Loader";

import "./Orders.css";

function Orders() {
  toast.configure();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getOrders();
  }, []);
  const getOrders = () => {
    axios
      .get(`http://localhost:2000/api/orders`)
      .then((res) => {
        //console.log(res.data)
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onDeleteOrder = (id) => {
    console.log(id);
    if (window.confirm("Are you sure you want to delete Order?")) {
      axios.delete(`http://localhost:2000/api/orders/${id}`).then((res) => {
        console.log(res);
        toast.success("Order Deleted Successfully");
        getOrders();
      });
    }
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <div className="orders_table">
        <table className="order-styled-table">
          <thead>
            <tr>
              <th style={{ textalign: "center" }}>Client</th>
              <th style={{ textalign: "center" }}>Currency</th>
              <th style={{ textalign: "center" }}>Product</th>
              <th style={{ textalign: "center" }}>Status</th>
              <th style={{ textalign: "center" }}>Payment_Type</th>
              <th style={{ textalign: "center" }}>Quantity</th>
              <th style={{ textalign: "center" }}>Total Price</th>
              <th style={{ textalign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.client_id.name}</td>
                    <td>{item.currency_id.rate}</td>
                    <td>{item.product_id[0] && item.product_id[0].name}</td>
                    <td>{item.status_id.type}</td>
                    <td>{item.payment_type}</td>
                    <td>{item.quantity}</td>
                    <td>{item.totalPrice}</td>
                    <td className="order-buttons">
                      <Link to={`/dashboard/vieworder/${item._id}`}>
                        <button className="view-order">View Order</button>
                      </Link>
                      <button
                        className="order-btn-delete"
                        onClick={() => onDeleteOrder(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Orders;

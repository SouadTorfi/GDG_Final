import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./ViewOrder.css"

function ViewOrder() {

    const [order, setOrders] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:2000/api/orders/${id}`)
            .then(res => {
                console.log(res.data)
                setOrders(res.data);
            })
            .catch(err =>{
                console.log(err)
            })
        }
    }, [id])

    return (
        <>
        
            <div  className="order-data">
                <h2 className='order-data-heading'>Order Details</h2>
                    {order.length !== 0 ?
                    <>
                    <div className='client-order-details'>
                        <p className='data'>Client Name : { order.client_id.name}</p>  
                        <p className='data'>Client Email : { order.client_id.email}</p>
                        <p className='data'>Client Phone : { order.client_id.phone}</p>
                        <p className='data'>Client Region : { order.client_id.address.region}</p>
                        <p className='data'>Client District : { order.client_id.address.district}</p>
                        <p className='data'>Client City : { order.client_id.address.city}</p>
                        <p className='data'>Client Street : { order.client_id.address.street}</p>
                        <p className='data'>Client Building : { order.client_id.address.building}</p>
                        <p className='data'>Client Floor : { order.client_id.address.floor}</p>
                        <p className='data'>Currency : { order.currency_id.rate}</p>
                        <p className='data'>Status : { order.status_id.type}</p>
                        <p className='data'>TotalPrice : { order.totalPrice}</p>
                    </div>
                        {order.product_id.map((each,key)=>{
                            return (
                                <>
                                <h2 className='product_title'>Product:{key+1} </h2>
                                <div className='product_details'>
                                
                                    <p className='data'>Product Name : {each.name}</p>
                                    <p className='data'>Product Category : {each.category}</p>
                                    <p className='data'>Product Clothes : {each.clothes}</p>
                                    <p className='data'>Product Package : {each.package}</p>
                                    <p className='data'>Product Price : {each.price}</p>
                                    <p className='data'>Product Size : {each.size}</p>
                                </div>
                                 <div className='product_details_images'>
                                    {/* {console.log(each.image)} */}
                                    {each.image.map(singleImage => {
                                    return (
                                            <img src='http://localhost:2000/images/be840856-67d2-4006-acdd-5463b0e1be14-hoda1.jpg' alt="product_images"/>
                                        )
                                    
                                    })}
                                </div>
                                </>
                                
                            )
                        })}
                    
                        </>
                : "Waiting For Order Details"}
                    
            </div>
        </>
    )
}

export default ViewOrder
import React, { useState, useEffect } from "react";
import AdminHeader from "./adminheader";

const ManageOrder = () => {
    const [order, updateOrder] = useState([]);

    const getOrder = () => {
        fetch("http://localhost:1234/orderlist")
            .then(response => response.json())
            .then(serverResponse => {
                if (serverResponse.length > 0) {
                    updateOrder(serverResponse.reverse());
                }
            })
    }

    useEffect(() => {
        getOrder();
    }, [1])
    return (
        <>
            <AdminHeader />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <h3> Recent Orders: {order.length} </h3>
                    </div>
                </div>
                {
                    order.map((orderData, index)=>{
                        return(
                            <div className="row mb-4 p-3 shadow rounded" key={index}>
                                <div className="col-lg-4">
                                        <p> {orderData.customername} </p>
                                        <p> {orderData.mobile} </p>
                                        <p> {orderData.email} </p>
                                        <p> {orderData.address} </p>
                                </div>
                                <div className="col-lg-8">
                                    <p className="text-center"> {orderData.myorder.length} - Ordered Item </p>
                                    <table className="table ">
                                        <thead>
                                            <tr>
                                                <th>Pid</th>
                                                <th>Name</th>
                                                <th>Price </th>
                                                <th>Photo</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                orderData.myorder.map((product, index2)=>{
                                                    return(
                                                        <tr key={index2}>
                                                            <td>{product.id}</td>
                                                            <td>{product.name}</td>
                                                            <td>{product.price}</td>
                                                            <td>
                                                                <img src={product.photo} height="50" width="70" />
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default ManageOrder;
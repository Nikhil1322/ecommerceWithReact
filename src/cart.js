import React, { useState, useEffect } from "react";
import PublicHeader from "./header";

const Cart = () => {
    const [product, updateProduct] = useState([]);

    const getCart = () => {
        fetch("http://localhost:1234/cart")
            .then(response => response.json())
            .then(allproduct => {
                if (allproduct.length > 0) {
                    updateProduct(allproduct);
                }
            })
    }

    useEffect(() => {
        getCart();
    }, [true]);


    const[msg, updateMessage] = useState("");
    const deleteCart = (pid) =>{
        const postData = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( {"id":pid} )
        };
        var url = "http://localhost:1234/cart/"+pid;
        fetch(url, postData)
        .then(response=> response.json())
        .then(serverResponse=>{
            updateMessage("Item Deleted From Cart");
            updateProduct( [] );
            getCart();
        })
    }
    let total=0;
    const[name, pickName] = useState("");
    const[mobile, pickMobile] = useState("");
    const[email, pickEmail] = useState("");
    const[address, pickAddress] = useState("");
    
    const save = () =>{
        var orderData = {
            "customername":name, 
            "mobile":mobile, 
            "email":email, 
            "address":address,
            "myorder":product
        };
        
        const postData = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        };
        var url = "http://localhost:1234/orderlist/";
        fetch(url, postData)
        .then(response=> response.json())
        .then(serverResponse=>{
            updateMessage("Your Order Placed Successfully !");
        })
    }

    return (
        <>
            <PublicHeader />
            <section className="bg-light p-5">
                <p className="text-center text-danger">{msg}</p>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="card border-none shadow">
                                <div className="card-header bg-primary text-white">
                                    Customer Details
                                </div>
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label> Customer Name </label>
                                        <input type="text" 
                                        className="form-control"
                                        onChange={obj=>pickName(obj.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label> Mobile No </label>
                                        <input type="number" 
                                        className="form-control"
                                        onChange={obj=>pickMobile(obj.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label> e-Mail Id </label>
                                        <input type="email" 
                                        className="form-control"
                                        onChange={obj=>pickEmail(obj.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label> Delivery Address </label>
                                        <textarea 
                                        className="form-control"
                                        onChange={obj=>pickAddress(obj.target.value)}></textarea>
                                    </div>
                                </div>
                                <div className="card-footer text-center">
                <button className="btn btn-danger" onClick={save}> Place Order </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <h3 className="text-center"> My Cart Items </h3>
                            <table className="table table-bordered shadow">
                                <thead>
                                    <tr>
                                        <th>Cart Id</th>
                                        <th>Item Name</th>
                                        <th>Price</th>
                                        <th>Photo</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        product.map((pinfo, index)=>{
                                            total = total + pinfo.price;
                                            return(
                                                <tr key={index}>
                                                    <td> {pinfo.id} </td>
                                                    <td> {pinfo.name} </td>
                                                    <td> {pinfo.price} </td>
                                                    <td> <img src={pinfo.photo} height="50" width="70"/> </td>
                                                    <td>
                                                        <button 
                                                        onClick={deleteCart.bind(this,pinfo.id)}
                                                        className="btn btn-danger btn-sm">
                                                            <i className="fa fa-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                    <tr>
                                        <td colSpan="3" className="text-end">
                                            {total} : Total Price
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Cart;